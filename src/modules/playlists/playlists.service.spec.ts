import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsService } from './playlists.service';
import { DeezerApiModule } from '../deezer-api';

describe('PlaylistsService', () => {
  let service: PlaylistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DeezerApiModule],
      providers: [PlaylistsService],
    }).compile();

    service = module.get<PlaylistsService>(PlaylistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
