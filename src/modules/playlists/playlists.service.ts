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
   * @param query - query-string
   * @return {Playlist[]} playlists - playlists
   */
  searchPlaylists(query: string) {
    return this.apiService.searchPlaylists(query);
  }

  /**
   * Get artist by ID
   * @param {number} artistId - artist id
   * @return {Artist} artist
   */
  getArtist(artistId) {
    return this.apiService.getArtistById(artistId);
  }

  /**
   * Search playlists by query-string
   * @param {string} query - query-string
   * @return {Playlist[]} playlists - playlists
   */
  async searchPlaylistsByArtist(query: string) {
    const artists = await this.apiService.searchArtists(query);
    return (
      await Promise.all(
        artists.map(({ name }) =>
          this.apiService.searchPlaylistsByArtist(name),
        ),
      )
    ).flat();
  }

  /**
   * Get playlist by ID
   * @param {number} playlistId - playlist id
   * @return {Playlist} playlist - playlist
   */
  getPlaylist(playlistId) {
    return this.apiService.getPlaylistById(playlistId);
  }

  /**
   * Get all or search playlists
   * @param {string} playlistId - playlist id
   * @return {Track[]} tracks - array of tracks
   */
  getTracksByPlaylistId(playlistId) {
    return this.apiService.getTracksByPlaylistId(playlistId);
  }
}
