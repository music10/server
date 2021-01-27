import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyService, SpotifyModule } from '../spotify';
import { PLAYLIST_MOCK } from '../../../__tests__/mocks';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';

describe('ShareService', () => {
  let service: ShareService;
  let apiService: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpotifyModule],
      providers: [ShareService],
      controllers: [ShareController],
    }).compile();

    service = module.get<ShareService>(ShareService);
    apiService = module.get<SpotifyService>(SpotifyService);

    jest
      .spyOn(apiService, 'getPlaylistById')
      .mockImplementation(async () => PLAYLIST_MOCK);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate base64 png with 0', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 0),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 1', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 1),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 2', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 2),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 3', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 3),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 4', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 4),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 5', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 5),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 6', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 6),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 7', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 7),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 8', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 8),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 9', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 9),
    ).toMatchSnapshot();
  });

  it('should generate base64 png with 10', async () => {
    expect(
      await service.generatePng('27f5HDjqkWIOxX7xA3T95p', 10),
    ).toMatchSnapshot();
  });
});
