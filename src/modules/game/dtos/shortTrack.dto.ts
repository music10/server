import { PickType } from '@nestjs/swagger';
import { TrackDto } from '../../../dtos';

/**
 * DTO for short track info for game
 */
export class ShortTrackDto extends PickType(TrackDto, [
  'id',
  'artist',
  'name',
] as const) {}
