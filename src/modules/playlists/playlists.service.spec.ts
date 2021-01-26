import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyModule } from '../spotify';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsService', () => {
  let service: PlaylistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpotifyModule],
      providers: [PlaylistsService],
    }).compile();

    service = module.get<PlaylistsService>(PlaylistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
