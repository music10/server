import { randomInt } from 'crypto';
import { Injectable } from '@nestjs/common';
import { YandexService } from '../yandex';

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
   * @param query - query-string
   * @return {PlaylistDto[]} playlists - playlists
   */
  searchPlaylists(query: string) {
    return this.apiService.searchPlaylists(query);
  }

  /**
   * Get artist by ID
   * @param {number} artistId - artist id
   * @return {ArtistDto} artist
   */
  getArtist(artistId: string) {
    return this.apiService.getArtistById(artistId);
  }

  /**
   * Search playlists by query-string
   * @param {string} query - query-string
   * @return {PlaylistDto[]} playlists - playlists
   */
  async searchPlaylistsByArtist(query: string) {
    return await this.apiService.searchArtists(query);
  }

  /**
   * Get playlist by ID
   * @param {number} playlistId - playlist id
   * @return {PlaylistDto} playlist - playlist
   */
  getPlaylist(playlistId: string) {
    return this.apiService.getPlaylistById(playlistId);
  }

  /**
   * Get all or search playlists
   * @param {string} playlistId - playlist id
   * @return {TrackDto[]} tracks - array of tracks
   */
  async getTracksByPlaylistId(playlistId: string) {
    return await this.apiService.getTracksByPlaylistId(playlistId);
  }

  /**
   * Get all or search playlists
   * @param {number} artistId - artist id
   * @return {TrackDto[]} tracks - array of tracks
   */
  async getTracksByArtistId(artistId: number) {
    return await this.apiService.getTracksByArtist(artistId);
  }
}
