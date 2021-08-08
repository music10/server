/**
 * DTO for results of user choose
 */
import { TrackDto } from '../../../dtos';

@ApiExtraModels
export class ChooseAnswerDto {
  /**
   * Correct track id
   */
  correct: TrackDto['id'];
}
