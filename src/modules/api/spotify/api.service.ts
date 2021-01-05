import { HttpService, Injectable } from '@nestjs/common';
import { MusicApi, Track } from '../../../interfaces';

/**
 * Service for Spotify
 * @implements MusicApi
 * @interface MusicApi
 */
@Injectable()
export class ApiService implements MusicApi {
  /**
   * Token for Spotify API
   * Random value by default
   * @private
   */
  private headers = {
    Authorization:
      'Bearer BQAOGPdvZEAULEm9VsQdtHaxyzHn1i2niRQNJG5Uw2-txmlpOTsM6PfSbDjrKRBFiQbS7UciS_Ajhm7CZUs',
  };

  /**
   * SpotifyApiService constructor
   */
  constructor(private httpService: HttpService) {
    this.httpService.axiosRef.interceptors.request.use((config) => ({
      ...config,
      headers: { ...this.headers, ...config.headers },
    }));

    this.httpService.axiosRef.interceptors.response.use(
      (value) => value,
      async (error) => {
        if (
          error.response?.data?.error?.message === 'The access token expired'
        ) {
          return await this.httpService
            .post(
              'https://accounts.spotify.com/api/token',
              'grant_type=client_credentials',
              {
                headers: {
                  Authorization: `Basic ${process.env.SPOTIFY_AUTH_TOKEN}`,
                },
              },
            )
            .toPromise()
            .then(({ data }) => {
              const newToken = `Bearer ${data['access_token']}`;
              this.headers.Authorization = newToken;
              const newConfig = error.config;
              newConfig.headers.Authorization = newToken;
              return this.httpService.axiosRef.request(newConfig);
            });
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * Get playlists
   */
  async getPlaylists() {
    return this.httpService
      .get('https://music.dergunov.net/allowed-playlists.json')
      .toPromise()
      .then(({ data }) => data);
  }
  /**
   * Search playlists by query-string
   * @param query
   * @return
   */
  async searchPlaylists(query) {
    return (await this.getPlaylists()).filter((playlist) =>
      new RegExp(query, 'ig').test(playlist.name),
    );
  }

  /**
   * Get playlist by id
   * @param playlistId - playlist id
   * @return playlist
   */
  async getPlaylistById(playlistId) {
    return this.httpService
      .get(`/playlists/${playlistId}`, {
        params: {
          fields: 'id,name',
        },
      })
      .toPromise()
      .then(({ data }) => ({
        name: data.name,
        id: data.id,
        getTracks: () => this.getTracksByPlaylistId(playlistId),
      }));
  }

  /**
   * Get tracks by playlist id
   * @param playlistId - playlist id
   * @return tracks
   */ async getTracksByPlaylistId(playlistId) {
    const tracks = [];
    return new Promise<Track[]>((resolve) => {
      const responseHandler = ({ data }) => {
        tracks.push(
          ...data.items.map(({ track }) => ({
            name: track.name,
            id: track.id,
            author: track.artists.map((artist) => artist.name).join(', '),
            mp3: track.preview_url,
          })),
        );

        if (data.next) {
          this.httpService.get(data.next).toPromise().then(responseHandler);
        } else {
          resolve(tracks);
        }
      };

      this.httpService
        .get(`/playlists/${playlistId}/tracks`, {
          params: {
            fields: 'next,items(track(id,artists(name),name,preview_url))',
          },
        })
        .toPromise()
        .then(responseHandler);
    });
  }

  /**
   * Get track by id
   * @param trackId
   * @return track
   */
  async getTrackById(trackId) {
    return this.httpService
      .get(`/tracks/${trackId}`, {
        params: {
          fields: 'id,name,artists(name),preview_url',
        },
      })
      .toPromise()
      .then(({ data }) => ({
        author: data.artists.map((artist) => artist.name).join(', '),
        mp3: data.preview_url,
        name: data.name,
        id: data.id,
      }));
  }
}
