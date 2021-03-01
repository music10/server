import { Playlist } from '../../../interfaces';

/**
 * DTO for results of get result
 */
export interface ResultResult {
  /**
   * Current playlist
   */
  playlist: Playlist;

  /**
   * Number of guessed tracks
   */
  guessed: number;

  /**
   * Result description
   */
  text: string;
}
