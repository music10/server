import { HttpService, Injectable } from '@nestjs/common';
import { Playlist, Track } from '../../interfaces';

const SPOTIFY_OWNER_ID = 'spotify';

/**
 * Service for Spotify Api
 */
@Injectable()
export class SpotifyService {
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
  async getCherryPickPlaylists(): Promise<Playlist[]> {
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
  async searchPlaylists(query): Promise<Playlist[]> {
    return this.httpService
      .get(`/search`, {
        params: {
          q: query,
          type: 'playlist',
        },
      })
      .toPromise()
      .then(({ data }) =>
        data.playlists.items
          .filter((playlist) => playlist.tracks.total > 40)
          .slice(0, 20)
          .map(({ id, name, images }) => ({
            id,
            name,
            cover: images[0].url,
          })),
      );
  }

  /**
   * Search playlists by artist via query-string
   * @param query
   * @return
   */
  async searchPlaylistsByArtist(query): Promise<Playlist[]> {
    return this.httpService
      .get(`/search`, {
        params: {
          q: `This is ${query}`,
          type: 'playlist',
        },
      })
      .toPromise()
      .then(({ data }) =>
        data.playlists.items
          .filter(
            ({ tracks, owner }) =>
              tracks.total > 40 && owner.id === SPOTIFY_OWNER_ID,
          )
          .slice(0, 20)
          .map(({ id, name, images }) => ({
            id,
            name,
            cover: images[0].url,
          })),
      );
  }

  /**
   * Get playlist by id
   * @param playlistId - playlist id
   * @return playlist
   */
  async getPlaylistById(playlistId): Promise<Playlist> {
    return this.httpService
      .get(`/playlists/${playlistId}`, {
        params: {
          fields: 'id,name,images,href',
        },
      })
      .toPromise()
      .then(({ data }) => ({
        name: data.name,
        id: data.id,
        cover: data.images[0].url,
        getTracks: () => this.getTracksByPlaylistId(playlistId),
      }));
  }

  /**
   * Get tracks by playlist id
   * @param playlistId - playlist id
   * @return tracks
   */ async getTracksByPlaylistId(playlistId): Promise<Track[]> {
    const tracks = [];
    return new Promise<Track[]>((resolve) => {
      const responseHandler = ({ data }) => {
        tracks.push(
          ...data.items
            .filter(({ track }) => track?.preview_url)
            .map(({ track }) => ({
              name: track.name,
              id: track.id,
              album: data.album.name,
              artist: track.artists.map((artist) => artist.name).join(', '),
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
            fields:
              'next,items(track(id,artists(name),name,preview_url,album(name))',
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
  async getTrackById(trackId): Promise<Track> {
    return this.httpService
      .get(`/tracks/${trackId}`, {
        params: {
          fields: 'id,name,artists(name),album(name),preview_url',
        },
      })
      .toPromise()
      .then(({ data }) => ({
        id: data.id,
        name: data.name,
        album: data.album.name,
        artist: data.artists.map((artist) => artist.name).join(', '),
        mp3: data.preview_url,
      }));
  }
}
