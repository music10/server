import { Injectable } from '@nestjs/common';
import { SpotifyService } from '../spotify';

/**
 * Playlist service
 */
@Injectable()
export class PlaylistsService {
  /**
   * PlaylistsService constructor
   * @param apiService
   */
  constructor(private apiService: SpotifyService) {}

  /**
   * Get all playlists
   * @return {Playlist[]} playlists - playlists
   */
  getCherryPickPlaylists() {
    return this.apiService.getCherryPickPlaylists();
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
   * Search playlists by query-string
   * @param {string} query - query-string
   * @return {Playlist[]} playlists - playlists
   */
  searchPlaylistsByArtist(query) {
    return this.apiService.searchPlaylistsByArtist(query);
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
