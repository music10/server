import { Module } from '@nestjs/common';
import { MusicApiModule, PlaylistsModule, GameModule } from './modules';

@Module({
  imports: [PlaylistsModule, MusicApiModule, GameModule],
})
export class AppModule {}
