import { Module } from '@nestjs/common';
import { SpotifyModule } from '../spotify';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';

@Module({
  imports: [SpotifyModule],
  providers: [ShareService],
  controllers: [ShareController],
})
export class ShareModule {}
