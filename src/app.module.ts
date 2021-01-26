import { Module } from '@nestjs/common';
import {
  GameModule,
  SpotifyModule,
  PlaylistsModule,
  ShareModule,
} from './modules';

@Module({
  imports: [GameModule, SpotifyModule, PlaylistsModule, ShareModule],
})
export class AppModule {}
