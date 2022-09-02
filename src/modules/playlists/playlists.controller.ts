import { Controller, Get, Param, Query } from '@nestjs/common';
import { Type } from '../yandex/yandex.types';
import { PlaylistsService } from './playlists.service';

/**
 * Playlists REST-controller
 */
@Controller('playlists')
export class PlaylistsController {
  constructor(private service: PlaylistsService) {}

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
   * @return {PlaylistDto} playlists - array of playlists
   */
  @Get('/random')
  getRandomPlaylist() {
    return this.service.getRandomPlaylist();
  }

  /**
   * Get all or search playlists
   * @param {string} query - query string for search playlists
   * @param {Type} type - type of playlist
   * @return {PlaylistDto[]} playlists - array of playlists
   */
  @Get(':type')
  async getPlaylists(@Query('query') query: string, @Param('type') type: Type) {
    console.log(query, type);
    return this.service.searchPlaylists(query, type);
  }

  /**
   * Get playlist by ID
   * @param {string} type
   * @param {Type} id
   * @return {PlaylistDto[]} playlist
   */
  @Get(':type/:id')
  getPlaylist(@Param('type') type: Type, @Param('id') id: string) {
    return this.service.getPlaylist(id, type);
  }
}
