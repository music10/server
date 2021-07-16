import { TrackDto } from './track.dto';

/**
 * Playlist DTO
 */
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
   * Get all tracks from this playlist
   */
  getTracks?(): Promise<TrackDto[]>;
}
