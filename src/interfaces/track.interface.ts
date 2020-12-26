/**
 * Track interface
 */
export interface Track {
  /**
   * Track id
   */
  id: number;

  /**
   * Track name
   */
  name: string;

  /**
   * Track author
   */
  author: string;

  /**
   * HTTP link to mp3 file
   */
  mp3: string;
}
