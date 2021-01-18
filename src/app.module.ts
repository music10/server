import { Module } from '@nestjs/common';
import {
  GameModule,
  MusicApiModule,
  PlaylistsModule,
  ShareModule,
} from './modules';

@Module({
  imports: [GameModule, MusicApiModule, PlaylistsModule, ShareModule],
})
export class AppModule {}
