import { ShareService } from './share.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ShareController } from './share.controller';
import { MusicApiModule } from '../api';

describe('ShareService', () => {
  let service: ShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MusicApiModule],
      providers: [ShareService],
      controllers: [ShareController],
    }).compile();

    service = module.get<ShareService>(ShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate base64 png', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 4),
    ).toMatchSnapshot();
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 8),
    ).toMatchSnapshot();
  });
});
