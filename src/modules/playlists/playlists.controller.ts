import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { Playlist } from '../../interfaces';

/**
 * Playlists REST-controller
 */
@Controller('playlists')
export class PlaylistsController {
  constructor(private service: PlaylistsService) {}

  /**
   * Get all or search playlists
   * @param query - query string for search playlists
   * @return playlists - array of playlists
   */
  @Get()
  getPlaylists(@Query('query') query: string) {
    return query
      ? this.service.searchPlaylists(query)
      : this.service.getPlaylists();
  }

  /**
   * Get playlist by ID
   * @param playlistId
   * @return playlist
   */
  @Get('/:id')
  getPlaylist(@Param('id') playlistId: string) {
    return this.service.getPlaylist(playlistId);
  }
}
