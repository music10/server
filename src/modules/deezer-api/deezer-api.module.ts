import { Module } from '@nestjs/common';
import { DeezerApiService } from './deezer-api.service';
import { DeezerApiHttpModule } from './deezer-api.http.module';

@Module({
  imports: [DeezerApiHttpModule],
  providers: [DeezerApiService],
  exports: [DeezerApiService],
})
export class DeezerApiModule {}
