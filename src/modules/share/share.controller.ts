import { Controller, Get, Query } from '@nestjs/common';
import { Type } from '../yandex/yandex.types';
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
   * @param playlistId
   * @param type
   * @param guess - number of guessed tracks
   * @return base64 encoded png image
   */
  @Get()
  async share(
    @Query('playlistId') playlistId: string,
    @Query('type') type: Type,
    @Query('guess') guess: number,
  ): Promise<string> {
    return await this.shareService.generatePng(playlistId, type, guess);
  }
}
