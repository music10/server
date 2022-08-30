import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ArtistDto, PlaylistDto, TrackDto } from '../../dtos';

const PAGE_SIZE = 20;

/**
 * Service for Yandex.Music Api
 */
@Injectable()
export class YandexService {
  /**
   * SpotifyApiService constructor
   */
  constructor(private httpService: HttpService) {}

  /**
   * Get playlists
   */
  async getCherryPickPlaylists(): Promise<PlaylistDto[]> {
    return firstValueFrom(
      this.httpService.get('https://msq.app/cherry-pick.json'),
    ).then(({ data }) => data);
  }

  /**
   * Search playlists by query-string
   * @param {string} query
   * @return {PlaylistDto[]} playlists
   */
  async searchPlaylists(query: string): Promise<PlaylistDto[]> {
    return firstValueFrom(
      this.httpService.get(`/search`, {
        params: {
          text: query,
          type: 'playlist',
          page: 0,
          page_size: PAGE_SIZE,
          nocorrect: false,
        },
      }),
    ).then(({ data }) =>
      data.result.playlists.results
        .filter(({ trackCount }) => trackCount > 40)
        .map((playlist) => ({
          id: playlist.playlistUuid,
          name: playlist.title,
          cover: 'https://' + playlist.cover.uri.replace('%%', '200x200'),
        })),
    );
  }

  /**
   * Search playlists by query-string
   * @return {PlaylistDto[]} playlists
   * @deprecated
   */
  async getFeaturedPlaylists(): Promise<PlaylistDto[]> {
    return firstValueFrom(
      this.httpService.get(`/browse/featured-playlists`, {
        params: {
          limit: 20,
          type: 'playlist',
        },
      }),
    ).then(
      async ({ data }) =>
        await Promise.all(
          data.playlists.items
            .filter(({ tracks }) => tracks.total > 40)
            .map(async (playlist) => ({
              ...playlist,
              active:
                (await this.getTracksByPlaylistId(playlist.id)).length >= 40,
            })),
        ).then((playlists) =>
          playlists
            .filter(({ active }) => active)
            .map(({ id, name, images }) => ({
              id,
              name,
              cover: images[0].url,
            })),
        ),
    );
  }

  /**
   * Search artists by query-string
   * @param {string} query
   * @return {ArtistDto[]} artists
   */
  async searchArtists(query: string): Promise<ArtistDto[]> {
    return firstValueFrom(
      this.httpService.get(`/search`, {
        params: {
          text: query,
          type: 'artist',
          page: 0,
          page_size: PAGE_SIZE,
          nocorrect: false,
        },
      }),
    ).then(({ data }) =>
      data.result.artists.results
        .filter(({ counts }) => counts.tracks > 40)
        .map((artist) => ({
          id: artist.id,
          name: artist.name,
          cover: 'https://' + artist.cover.uri.replace('%%', '200x200'),
        })),
    );
  }

  /**
   * Get tracks by artist id
   * @param artistId
   */
  async getTracksByArtist(artistId: number): Promise<TrackDto[]> {
    return firstValueFrom(
      this.httpService.get(`/artists/${artistId}/tracks`, {
        params: {
          page: 0,
          page_size: 1000,
        },
      }),
    ).then(({ data }) =>
      data.result.tracks.map((track) => ({
        id: track.id,
        name: track.title,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.albums.map((album) => album.title).join(', '),
        mp3: '',
      })),
    );
  }

  /**
   * Search playlists by artist via query-string
   * @param {string} query
   * @return {PlaylistDto[]} playlists
   * @deprecated
   */
  async searchPlaylistsByArtist(query: string): Promise<PlaylistDto[]> {
    return firstValueFrom(
      this.httpService.get(`/search`, {
        params: {
          q: `This is ${query}`,
          type: 'playlist',
        },
      }),
    ).then(
      async ({ data }) =>
        await Promise.all(
          data.playlists.items
            // .filter(
            //   ({ tracks, owner }) =>
            //     tracks.total > 40 && owner.id === SPOTIFY_OWNER_ID,
            // )
            .map(async (playlist) => ({
              ...playlist,
              active:
                (await this.getTracksByPlaylistId(playlist.id)).length >= 40,
            })),
        ).then((playlists) =>
          playlists
            .filter(({ active }) => active)
            .slice(0, 20)
            .map(({ id, name, images }) => ({
              id,
              name,
              cover: images[0].url,
            })),
        ),
    );
  }

  /**
   * Get playlist by id
   * @param {string} playlistId - playlist id
   * @return {PlaylistDto} playlist
   * @deprecated
   */
  async getPlaylistById(playlistId: string): Promise<PlaylistDto> {
    return firstValueFrom(
      this.httpService.get(`/playlists/${playlistId}`, {
        params: {
          fields: 'id,name,images,href',
        },
      }),
    ).then(({ data }) => ({
      id: data.id,
      name: data.name,
      cover: data.images[0].url,
    }));
  }

  /**
   * Get artist by id
   * @param {string} artistId - playlist id
   * @return {ArtistDto} artist
   * @deprecated
   */
  async getArtistById(artistId: string): Promise<ArtistDto> {
    return firstValueFrom(
      this.httpService.get(`/artists/${artistId}`, {
        headers: {
          'accept-language': 'en',
        },
        params: {
          fields: 'id,name',
        },
      }),
    ).then(({ data }) => ({
      name: data.name,
      id: data.id,
      cover: '',
    }));
  }

  /**
   * Get tracks by playlist id
   * @param {string} playlistId - playlist id
   * @return {TrackDto[]} tracks
   * @deprecated
   */
  async getTracksByPlaylistId(playlistId: string): Promise<TrackDto[]> {
    const tracks = [];
    return new Promise<TrackDto[]>((resolve) => {
      const responseHandler = ({ data }) => {
        tracks.push(
          ...data.items
            .filter(({ track }) => track?.preview_url)
            .map(({ track }) => ({
              name: track.name,
              id: track.id,
              album: track.album.name,
              artist: track.artists.map((artist) => artist.name).join(', '),
              mp3: track.preview_url,
            })),
        );

        if (data.next) {
          firstValueFrom(this.httpService.get(data.next))
            .then(responseHandler)
            .catch(console.error);
        } else {
          resolve(tracks);
        }
      };

      firstValueFrom(
        this.httpService.get(`/playlists/${playlistId}/tracks`, {
          params: {
            fields:
              'next,items(track(id,artists(name),name,preview_url,album(name)))',
          },
        }),
      )
        .then(responseHandler)
        .catch(console.error);
    });
  }

  /**
   * @deprecated
   * @param playlistId
   */
  async parsePlaylist(playlistId: string): Promise<any> {
    const tracks = [];
    return new Promise<any>((resolve) => {
      const responseHandler = ({ data }) => {
        tracks.push(
          ...data.items
            .filter(({ track }) => track?.preview_url)
            .map(({ track }) => ({
              name: track.name,
              id: track.id,
              album: track.album.name,
              artist: track.artists.map((artist) => artist.name).join(', '),
              mp3: track.preview_url,
            })),
        );

        if (data.next) {
          firstValueFrom(this.httpService.get(data.next))
            .then(responseHandler)
            .catch(console.error);
        } else {
          resolve({ total: data.total, tracks: tracks.length });
        }
      };

      firstValueFrom(
        this.httpService.get(`/playlists/${playlistId}/tracks`, {
          params: {
            fields:
              'next,items(track(id,artists(name),name,preview_url,album(name))),total',
          },
        }),
      )
        .then(responseHandler)
        .catch(console.error);
    });
  }

  /**
   * Get track by id
   * @param {string} trackId
   * @return {TrackDto} track
   * @deprecated
   */
  async getTrackById(trackId: string): Promise<TrackDto> {
    return firstValueFrom(
      this.httpService.get(`/tracks/${trackId}`, {
        params: {
          fields: 'id,name,artists(name),album(name),preview_url',
        },
      }),
    ).then(({ data }) => ({
      id: data.id,
      name: data.name,
      album: data.album.name,
      artist: data.artists.map((artist) => artist.name).join(', '),
      mp3: data.preview_url,
    }));
  }
}
