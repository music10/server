import { Test, TestingModule } from '@nestjs/testing';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';

import { SHARE_PNG_MOCK } from '../../../__tests__/mocks/sharePng';

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

  it('should generate base64 png', async () => {
    expect(await service.generatePng('Русский рэп', 8, 10)).toBe(
      SHARE_PNG_MOCK,
    );
  });
});
