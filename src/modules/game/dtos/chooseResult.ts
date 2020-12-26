import { Result } from '../entities/result.entity';

/**
 * DTO for results of user choose
 */
export interface ChooseResult {
  /**
   * Correct track id
   */
  correct: number;

  /**
   * Current Result object
   */
  result: Pick<Result, 'isEnd' | 'progress'>;
}
