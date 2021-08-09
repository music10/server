import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

/**
 * Playlists REST-controller
 */
@Controller('playlists')
export class PlaylistsController {
  constructor(private service: PlaylistsService) {}

  /**
   * Get all or search playlists
   * @param {string} query - query string for search playlists
   * @return {PlaylistDto[]} playlists - array of playlists
   */
  @Get()
  async getPlaylists(@Query('query') query: string) {
    console.time('by name');
    const r = await this.service.searchPlaylists(query);
    console.timeEnd('by name');
    return r;
  }

  /**
   * Get cherry-pick playlists
   * @return {PlaylistDto[]} playlists - array of playlists
   */
  @Get('/cherry-pick')
  getCherryPickPlaylists() {
    return this.service.getCherryPickPlaylists();
  }

  /**
   * Get cherry-pick playlists
   * @param {string} query - query string for search playlists
   * @return {PlaylistDto[]} playlists - array of playlists
   */
  @Get('/artist')
  async getPlaylistsByArtist(@Query('query') query: string) {
    console.time('by artist');
    const r = await this.service.searchPlaylistsByArtist(query);
    console.timeEnd('by artist');
    return r;
  }

  /**
   * Get playlist by ID
   * @param {string} playlistId
   * @return {PlaylistDto[]} playlist
   */
  @Get('/:id')
  getPlaylist(@Param('id') playlistId: string) {
    return this.service.getPlaylist(playlistId);
  }

  /**
   * Get all or search playlists
   * @param {string} playlistId - playlist id
   * @return {PlaylistDto[]} playlists - array of playlists
   */
  @Get('/:id/tracks')
  findTracksByPlaylistId(@Query('playlistId') playlistId: string) {
    return this.service.getTracksByPlaylistId(playlistId);
  }
}
