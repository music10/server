import { Playlist } from './playlist.interface';
import { Track } from './track.interface';

/**
 * Interface for MusicApi service
 */
export interface MusicApi {
  /**
   * Get playlists
   */
  getPlaylists(): Promise<Playlist[]>;

  /**
   * Search playlists by query-string
   * @param query
   */
  searchPlaylists(query: string): Promise<Playlist[]>;

  /**
   * Get playlist by id
   * @param playlistId
   */
  getPlaylistById(playlistId: string | number): Promise<Playlist>;

  /**
   * Get tracks by playlist id
   * @param playlistId
   */
  getTracksByPlaylistId(playlistId: string | number): Promise<Track[]>;

  /**
   * Get track by id
   * @param trackId
   */
  getTrackById(trackId: string | number): Promise<Track>;
}
