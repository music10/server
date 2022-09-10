import { Test, TestingModule } from '@nestjs/testing';
import { YandexModule } from '../yandex';
import { Type } from '../yandex/yandex.types';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

describe('ShareController', () => {
  let controller: ShareController;
  let service: ShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YandexModule],
      providers: [ShareService],
      controllers: [ShareController],
    }).compile();

    controller = module.get<ShareController>(ShareController);
    service = module.get<ShareService>(ShareService);

    jest
      .spyOn(service, 'generatePng')
      .mockImplementation(async () => 'data:image/png;base64,SOME_BASE64');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate base64 png', () => {
    controller.share('27f5HDjqkWIOxX7xA3T95p', Type.playlist, 3);
    expect(service.generatePng).toBeCalledTimes(1);
    expect(service.generatePng).toBeCalledWith(
      '27f5HDjqkWIOxX7xA3T95p',
      Type.playlist,
      3,
    );
  });
});
