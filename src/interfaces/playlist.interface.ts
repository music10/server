import { Track } from './track.interface';

/**
 * Playlist interface
 */
export interface Playlist {
  /**
   * Playlist id
   */
  id: number;

  /**
   * Playlist name
   */
  name: string;

  /**
   * Get all tracks from this playlist
   */
  getTracks(): Promise<Track[]>;
}
