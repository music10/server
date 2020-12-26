import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { PlaylistsModule } from '../playlists/playlists.module';

@Module({
  imports: [PlaylistsModule],
  providers: [GameGateway, GameService],
})
export class GameModule {}
