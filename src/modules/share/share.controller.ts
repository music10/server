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
   * @param playlist - playlist name
   * @param guess - number of guessed tracks
   * @param all - number of all tracks
   */
  @Get()
  async share(
    @Query('playlist') playlist: string,
    @Query('guess') guess: number,
    @Query('all') all = 10,
  ) {
    return await this.shareService.generatePng(playlist, guess, all);
  }
}
