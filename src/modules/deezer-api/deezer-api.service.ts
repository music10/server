import { HttpService, Injectable } from '@nestjs/common';
import { MusicApi, Playlist } from '../../interfaces';

/**
 * Service for Deezer
 * @implements MusicApi
 * @interface MusicApi
 */
@Injectable()
export class DeezerApiService implements MusicApi {
  /**
   * DeezerApiService constructor
   * @param httpService
   */
  constructor(private httpService: HttpService) {}

  /**
   * Get playlists
   */
  async getPlaylists() {
    return await this.httpService
      .get('/user/3098401824/playlists')
      .toPromise()
      .then((r) =>
        r.data.data
          .filter((playlist) => /^music10 ([-–]) /.test(playlist.title))
          .map((playlist) => ({
            id: playlist.id,
            name: playlist.title.replace(/^music10 ([-–]) /, ''),
          })),
      );
  }

  /**
   * Search playlists by query-string
   * @param query
   * @return
   */
  async searchPlaylists(query) {
    return (await this.getPlaylists()).filter((playlist) =>
      new RegExp(query, 'ig').test(playlist.name),
    );
  }

  /**
   * Get playlist by id
   * @param playlistId - playlist id
   * @return playlist
   */
  async getPlaylistById(playlistId) {
    return await this.httpService
      .get(`/playlist/${playlistId}`)
      .toPromise()
      .then((r) => ({
        id: r.data.id,
        name: r.data.title.replace(/^music10 ([-–]) /, ''),
        getTracks: () => this.getTracksByPlaylistId(playlistId),
      }));
  }

  /**
   * Get tracks by playlist id
   * @param playlistId - playlist id
   * @return tracks
   */ async getTracksByPlaylistId(playlistId) {
    return await this.httpService
      .get(`/playlist/${playlistId}`)
      .toPromise()
      .then((r) =>
        r.data.tracks.data
          .filter((t) => t.preview)
          .map((t) => ({
            id: t.id,
            name: t.title,
            author: t.artist.name,
            mp3: t.preview,
          })),
      );
  }

  /**
   * Get track by id
   * @param trackId
   * @return track
   */
  async getTrackById(trackId) {
    return await this.httpService
      .get(`/track/${trackId}`)
      .toPromise()
      .then((r) => ({
        id: r.data.id,
        name: r.data.title,
        author: r.data.artist.name,
        mp3: r.data.preview,
      }));
  }
}
