import { Injectable } from '@nestjs/common';
import { DeezerApiService } from '../deezer-api';

/**
 * Playlist service
 */
@Injectable()
export class PlaylistsService {
  /**
   * PlaylistsService constructor
   * @param apiService
   */
  constructor(private apiService: DeezerApiService) {}

  /**
   * Get all playlists
   * @return {Playlist[]} playlists - playlists
   */
  getPlaylists() {
    return this.apiService.getPlaylists();
  }

  /**
   * Search playlists by query-string
   * @param {string} query - query-string
   * @return {Playlist[]} playlists - playlists
   */
  searchPlaylists(query) {
    return this.apiService.searchPlaylists(query);
  }

  /**
   * Get playlist by ID
   * @param {number} playlistId - playlist id
   * @return {Playlist} playlist - playlist
   */
  getPlaylist(playlistId) {
    return this.apiService.getPlaylistById(playlistId);
  }
}
