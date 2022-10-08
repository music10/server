import { Module } from '@nestjs/common';
import { YandexModule } from '../yandex';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';

@Module({
  imports: [YandexModule],
  providers: [ShareService],
  controllers: [ShareController],
})
export class ShareModule {}
