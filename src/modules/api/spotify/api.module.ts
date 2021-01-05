import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiHttpModule } from './api.http.module';

@Module({
  imports: [ApiHttpModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
