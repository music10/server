/**
 * DTO for results of user choose
 */
import { TrackDto } from '../../../dtos';

export class ChooseAnswerDto {
  /**
   * Correct track id
   */
  correct: TrackDto['id'];
}
