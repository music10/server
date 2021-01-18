import { Test, TestingModule } from '@nestjs/testing';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

describe('ShareController', () => {
  let controller: ShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareService],
      controllers: [ShareController],
    }).compile();

    controller = module.get<ShareController>(ShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
