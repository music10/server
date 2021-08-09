import { ApiExtraModels } from '@nestjs/swagger';
import { TrackDto } from '../../../dtos';
import { ShortTrackDto } from './shortTrack.dto';

/**
 * DTO for displayed tracks for user
 */
@ApiExtraModels()
export class TracksForUserDto {
  /**
   * Tracks for display for user
   */
  tracks: ShortTrackDto[];

  /**
   * HTTP link to mp3 file
   */
  mp3: TrackDto['mp3'];
}
