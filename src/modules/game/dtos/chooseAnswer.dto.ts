import { ApiExtraModels } from '@nestjs/swagger';
import { TrackDto } from '../../../dtos';

/**
 * DTO for results of user choose
 */
@ApiExtraModels()
export class ChooseAnswerDto {
  /**
   * Correct track id
   */
  correct: TrackDto['id'];
}
