import { Module } from '@nestjs/common';
import {
  GameModule,
  YandexModule,
  PlaylistsModule,
  ShareModule,
} from './modules';

@Module({
  imports: [GameModule, YandexModule, PlaylistsModule, ShareModule],
})
export class AppModule {}
