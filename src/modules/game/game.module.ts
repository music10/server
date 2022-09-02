import { Module } from '@nestjs/common';
import { PlaylistsModule } from '../playlists';
import { YandexModule } from '../yandex';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';

@Module({
  imports: [PlaylistsModule, YandexModule],
  providers: [GameGateway, GameService],
})
export class GameModule {}
