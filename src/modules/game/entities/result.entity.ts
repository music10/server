/**
 * Tracks per game const
 */
const TRACKS_PER_GAME = 10;

/**
 * Entity for result of game session
 */
export class Result {
  /**
   * Array with game session progress
   * true - guess
   * false - wrong
   */
  progress: boolean[] = [];

  /**
   * If end game session flag
   */
  isEnd = false;

  /**
   * Push new progress item to progress
   * @param isGuess - if true then guess else wrong
   */
  updateProgress(isGuess: boolean): void {
    this.progress.push(isGuess);
    if (this.progress.length >= TRACKS_PER_GAME) {
      this.isEnd = true;
    }
  }
}
