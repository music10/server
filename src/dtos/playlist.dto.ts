/**
 * Playlist DTO
 */
import { Type } from '../modules/yandex/yandex.types';
import { TrackDto } from './track.dto';

export class PlaylistDto {
  /**
   * Playlist id
   */
  id: string;

  /**
   * Playlist name
   */
  name: string;

  /**
   * URL of cover image
   */
  cover: string;

  /**
   * Type of playlist
   */
  type: Type;

  /**
   * Tracks list
   */
  tracks: TrackDto[];
}
