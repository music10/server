import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { parseStringPromise } from 'xml2js';

import { PlaylistDto, TrackDto } from '../../dtos';
import { Type } from './yandex.types';

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
   * @param {string} text
   * @param {Type} type
   * @return {PlaylistDto[]} playlists
   */
  async searchPlaylists(text: string, type: Type): Promise<PlaylistDto[]> {
    return firstValueFrom(
      this.httpService.get(`/search`, {
        params: {
          text,
          type,
          page: 0,
          page_size: PAGE_SIZE,
          nocorrect: false,
        },
      }),
    ).then(({ data }) => {
      if (type === Type.playlist) {
        return data.result?.playlists?.results
          .filter(({ trackCount }) => trackCount > 40)
          .map((playlist) => ({
            id: playlist.playlistUuid,
            name: playlist.title,
            type: Type.playlist,
            cover: 'https://' + playlist?.cover?.uri?.replace('%%', '200x200'),
          }));
      }
      if (type === Type.artist) {
        return data.result?.artists?.results
          .filter(({ counts }) => counts.tracks > 40)
          .map((artist) => ({
            id: artist.id,
            name: artist.name,
            type: Type.artist,
            cover: 'https://' + artist?.cover?.uri?.replace('%%', '200x200'),
          }));
      }
      return [];
    });
  }

  /**
   * Search playlists by query-string
   * @return {PlaylistDto[]} playlists
   * @deprecated
   */
  async getFeaturedPlaylists(): Promise<PlaylistDto[]> {
    // TODO
    return [];
  }

  /**
   * Get playlist by id
   * @param {string} id - playlist id
   * @param type
   * @return {PlaylistDto} playlist
   */
  async getPlaylistById(
    id: string,
    type: Type = Type.playlist,
  ): Promise<PlaylistDto> {
    return firstValueFrom(
      this.httpService.get(
        `/${type}${type === Type.playlist ? '' : 's'}/${id}`,
        {
          params: {
            fields: 'tracks',
          },
        },
      ),
    ).then(async ({ data }) => {
      if (type === Type.playlist) {
        return {
          id: data.result?.playlistUuid,
          name: data.result?.title,
          cover: 'https://' + data.result?.cover?.uri?.replace('%%', '200x200'),
          type,
          tracks: YandexService.parseTracks(
            data.result?.tracks.map(({ track }) => track),
          ),
        };
      }
      if (type === Type.artist) {
        return {
          id: data.result.artist.id,
          name: data.result.artist.name,
          cover:
            'https://' +
            data.result.artist?.cover?.uri?.replace('%%', '200x200'),
          type,
          tracks: await this.getTracksByArtist(id),
        };
      }
      return {
        id: undefined,
        name: undefined,
        cover: undefined,
        type,
        tracks: [],
      };
    });
  }

  /**
   * Get track by id
   * @param {string} trackId
   * @return {TrackDto} track
   */
  async getTrackById(id: string): Promise<TrackDto> {
    return firstValueFrom(this.httpService.get(`/tracks/${id}`)).then(
      async ({ data }) => {
        return {
          id: data.result?.[0]?.id,
          name: data.result?.[0]?.title,
          album: data.result?.[0]?.albums.map(({ title }) => title).join(', '),
          artist: data.result?.[0]?.artists.map(({ name }) => name).join(', '),
          mp3: await this.getMp3ByTrackId(id),
        };
      },
    );
  }

  async getMp3ByTrackId(id: string): Promise<any> {
    return firstValueFrom(
      this.httpService.get(`/tracks/${id}/download-info`),
    ).then(({ data }) =>
      firstValueFrom(
        this.httpService.get(data.result?.[0].downloadInfoUrl, {
          responseType: 'text',
        }),
      ).then(async (data) => {
        const { host, s, ts, path } = (
          await parseStringPromise(data.data, {
            trim: true,
            explicitArray: false,
          })
        )?.['download-info'];
        return `https://${host}/get-mp3/${s}/${ts}${path}`;
      }),
    );
  }

  /**
   * Get tracks by artist id
   * @param artistId
   */
  private async getTracksByArtist(artistId: string): Promise<TrackDto[]> {
    return firstValueFrom(
      this.httpService.get(`/artists/${artistId}/tracks`, {
        params: {
          page: 0,
          page_size: 1000,
        },
      }),
    ).then(({ data }) => YandexService.parseTracks(data.result.tracks));
  }

  private static parseTracks(tracks?: any[]): TrackDto[] {
    return (
      tracks?.map(({ albums, artists, id, title }) => ({
        id,
        name: title,
        artist: artists?.map(({ name }) => name).join(', '),
        album: albums?.map(({ title }) => title).join(', '),
      })) ?? []
    );
  }
}
