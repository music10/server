import { Module } from '@nestjs/common';
import { ApiModule } from './spotify';

@Module({
  imports: [ApiModule],
  exports: [ApiModule],
})
export class MusicApiModule {}
export { ApiService } from './spotify';
