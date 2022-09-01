/**
 * Track DTO
 */
export class TrackDto {
  /**
   * Track id
   */
  id: string;

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
  mp3?: string;
}
