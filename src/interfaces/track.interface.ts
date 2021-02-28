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
   * Track artist
   */
  artist: string;

  /**
   * Track album
   */
  album: string;

  /**
   * HTTP link to mp3 file
   */
  mp3: string;
}
