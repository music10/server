import { Track } from '../../../interfaces';

/**
 * DTO for displayed tracks for user
 */
export interface TracksForUser {
  /**
   * Tracks for display for user
   */
  tracks: Pick<Track, 'id' | 'author' | 'name'>[];

  /**
   * HTTP link to mp3 file
   */
  mp3: string;
}
