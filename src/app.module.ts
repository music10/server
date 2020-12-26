import { Module } from '@nestjs/common';
import { DeezerApiModule, PlaylistsModule, GameModule } from './modules';

@Module({
  imports: [PlaylistsModule, DeezerApiModule, GameModule],
})
export class AppModule {}
