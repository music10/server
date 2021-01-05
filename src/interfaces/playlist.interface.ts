import { Track } from './track.interface';

/**
 * Playlist interface
 */
export interface Playlist {
  /**
   * Playlist id
   */
  id: number | string;

  /**
   * Playlist name
   */
  name: string;

  /**
   * Get all tracks from this playlist
   */
  getTracks?(): Promise<Track[]>;
}
