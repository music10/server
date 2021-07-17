import { TrackDto } from '../../../dtos';

/**
 * DTO for displayed tracks for user
 */
export class TracksForUserDto{
  /**
   * Tracks for display for user
   */
  tracks: Pick<TrackDto, 'id' | 'artist' | 'name'>[];

  /**
   * HTTP link to mp3 file
   */
  mp3: TrackDto['mp3'];
}
