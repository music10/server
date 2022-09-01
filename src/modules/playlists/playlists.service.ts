import { randomInt } from 'crypto';
import { Injectable } from '@nestjs/common';
import { YandexService } from '../yandex';
import { Type } from '../yandex/yandex.types';

/**
 * PlaylistDto service
 */
@Injectable()
export class PlaylistsService {
  /**
   * PlaylistsService constructor
   * @param apiService
   */
  constructor(private apiService: YandexService) {}

  /**
   * Get all playlists
   * @return {PlaylistDto[]} playlists - playlists
   */
  getCherryPickPlaylists() {
    return this.apiService.getCherryPickPlaylists();
  }

  /**
   * Get Random playlist from featured
   * @return {PlaylistDto} playlists - playlists
   */
  async getRandomPlaylist() {
    return [];
    const playlists = await this.apiService.getFeaturedPlaylists();
    const randomIndex = randomInt(playlists.length);
    return playlists[randomIndex];
  }

  /**
   * Search playlists by query-string
   * @param {string} query - query-string
   * @param {Type} type - type of playlist
   * @return {PlaylistDto[]} playlists - playlists
   */
  searchPlaylists(query: string, type: Type) {
    return this.apiService.searchPlaylists(query, type);
  }

  /**
   * Get playlist by ID
   * @param {number} playlistId - playlist id
   * @param {Type} type
   * @return {PlaylistDto} playlist - playlist
   */
  getPlaylist(playlistId: string, type: Type = Type.playlist) {
    return this.apiService.getPlaylistById(playlistId, type);
  }
}
