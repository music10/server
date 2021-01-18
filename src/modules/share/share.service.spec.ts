import { Test, TestingModule } from '@nestjs/testing';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';

describe('ShareService', () => {
  let service: ShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareService],
      controllers: [ShareController],
    }).compile();

    service = module.get<ShareService>(ShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
