import { Module } from '@nestjs/common';
import { SpotifyHttpModule } from './spotifyHttpModule';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [SpotifyHttpModule],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
