import { PlaylistDto } from '../../../dtos';

/**
 * DTO for results of get result
 */
export interface ResultResult {
  /**
   * Current playlist
   */
  playlist: PlaylistDto;

  /**
   * Number of guessed tracks
   */
  guessed: number;

  /**
   * Result description
   */
  text: string;
}
