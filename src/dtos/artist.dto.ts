import { ApiExtraModels } from '@nestjs/swagger';

/**
 * Artist DTO
 */
@ApiExtraModels
export class ArtistDto {
  /**
   * Playlist id
   */
  id: number | string;

  /**
   * Playlist name
   */
  name: string;
}
