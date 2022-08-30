import { Module } from '@nestjs/common';
import { YandexHttpModule } from './yandexHttpModule';
import { YandexService } from './yandex.service';

@Module({
  imports: [YandexHttpModule],
  providers: [YandexService],
  exports: [YandexService],
})
export class YandexModule {}
