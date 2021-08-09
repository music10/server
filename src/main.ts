import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  ChooseAnswerDto,
  ResultDto,
  TracksForUserDto,
} from './modules/game/dtos';

/**
 * Application entrypoint
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Musiq')
    .setDescription('API for Musiq')
    .setVersion('1.3')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ChooseAnswerDto, ResultDto, TracksForUserDto],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
