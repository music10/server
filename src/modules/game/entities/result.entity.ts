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
   * Push new progress item to progress
   * @param isGuess - if true then guess else wrong
   */
  updateProgress(isGuess: boolean): void {
    this.progress.push(isGuess);
  }
}
