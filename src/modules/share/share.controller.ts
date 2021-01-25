import { Controller, Get, Query } from '@nestjs/common';
import { ShareService } from './share.service';

/**
 * Share Controller
 */
@Controller('share')
export class ShareController {
  /**
   *
   * @param shareService
   */
  constructor(private readonly shareService: ShareService) {}

  /**
   * Get png for share
   * @param playlist - playlist ID
   * @param guess - number of guessed tracks
   * @return base64 encoded png image
   */
  @Get()
  async share(
    @Query('playlistId') playlist: string,
    @Query('guess') guess: number,
  ): Promise<string> {
    return await this.shareService.generatePng(playlist, guess);
  }
}
