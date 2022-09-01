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
   * @deprecated
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
          cover: 'https://' + playlist?.cover?.uri?.replace('%%', '200x200'),
        })),
    );
  }

  /**
   * Search playlists by query-string
   * @return {PlaylistDto[]} playlists
   * @deprecated
   */
  async getFeaturedPlaylists(): Promise<PlaylistDto[]> {
    return [];
    // TODO
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
      data.result.tracks.map(({ albums, artists, id, title }) => ({
        id,
        name: title,
        artist: artists.map(({ name }) => name).join(', '),
        album: albums.map(({ title }) => title).join(', '),
        mp3: '',
      })),
    );
  }

  /**
   * Get playlist by id
   * @param {string} playlistId - playlist id
   * @return {PlaylistDto} playlist
   */
  async getPlaylistById(playlistId: string): Promise<PlaylistDto> {
    return firstValueFrom(this.httpService.get(`/playlist/${playlistId}`)).then(
      ({ data }) => ({
        id: data.result.playlistUuid,
        name: data.result.title,
        cover: 'https://' + data.result?.cover?.uri?.replace('%%', '200x200'),
      }),
    );
  }

  /**
   * Get artist by id
   * @param {string} artistId - playlist id
   * @return {ArtistDto} artist
   */
  async getArtistById(artistId: string): Promise<ArtistDto> {
    return firstValueFrom(
      this.httpService.get(`/artists/${artistId}`, {
        params: {},
      }),
    ).then(({ data }) => ({
      id: data.result.artist.id,
      name: data.result.artist.name,
      cover: 'https://' + data.result.artist?.uri?.replace('%%', '200x200'),
    }));
  }

  /**
   * Get tracks by playlist id
   * @param {string} playlistId - playlist id
   * @return {TrackDto[]} tracks
   */
  async getTracksByPlaylistId(playlistId: string): Promise<TrackDto[]> {
    return firstValueFrom(this.httpService.get(`/playlist/${playlistId}`)).then(
      ({ data }) =>
        data.result.tracks.map(({ track: { albums, artists, id, title } }) => ({
          id,
          name: title,
          artist: artists.map(({ name }) => name).join(', '),
          album: albums.map(({ title }) => title).join(', '),
          mp3: '',
        })),
    );
  }

  /**
   * Get track by id
   * @param {string} trackId
   * @return {TrackDto} track
   */
  async getTrackById(trackId: string): Promise<TrackDto> {
    return firstValueFrom(this.httpService.get(`/tracks/${trackId}`)).then(
      ({ data }) => ({
        id: data.result?.[0]?.id,
        name: data.result?.[0]?.title,
        album: data.result?.[0]?.albums.map(({ title }) => title).join(', '),
        artist: data.result?.[0]?.artists.map(({ name }) => name).join(', '),
        mp3: '',
      }),
    );
  }
}
