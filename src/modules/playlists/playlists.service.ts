import { BadRequestException, Injectable } from '@nestjs/common';
import { SpotifyService } from '../spotify';

/**
 * PlaylistDto service
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
   * @return {PlaylistDto[]} playlists - playlists
   */
  getCherryPickPlaylists() {
    return this.apiService.getCherryPickPlaylists();
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
    const artists = await this.apiService.searchArtists(query);
    const uniqueIds = new Set();
    const playlists = [];
    const ret = (
      await Promise.all(
        artists.map(({ name }) => {
          return this.apiService.searchPlaylistsByArtist(name);
        }),
      )
    ).flat();

    ret.forEach((playlist) => {
      if (!uniqueIds.has(playlist.id)) {
        uniqueIds.add(playlist.id);
        playlists.push(playlist);
      }
    });

    return playlists;
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
    const tracks = await this.apiService.getTracksByPlaylistId(playlistId);
    if(tracks.length < 4) {
      throw new BadRequestException()
    }
    return tracks;
    
  }
}
