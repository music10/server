import { PlaylistDto } from '../../../dtos';

/**
 * DTO for results of get result
 */
export class ResultDto {
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
