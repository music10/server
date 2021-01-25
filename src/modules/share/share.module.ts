import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { MusicApiModule } from '../api';

@Module({
  imports: [MusicApiModule],
  providers: [ShareService],
  controllers: [ShareController],
})
export class ShareModule {}
