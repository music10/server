import { Module } from '@nestjs/common';
import { PlaylistsModule } from '../playlists';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';

@Module({
  imports: [PlaylistsModule],
  providers: [GameGateway, GameService],
})
export class GameModule {}
