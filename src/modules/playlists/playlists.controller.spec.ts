import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsController } from './playlists.controller';
import { DeezerApiModule } from '../deezer-api';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsController', () => {
  let controller: PlaylistsController;
  let service: PlaylistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DeezerApiModule],
      providers: [PlaylistsService],
      controllers: [PlaylistsController],
    }).compile();

    controller = module.get<PlaylistsController>(PlaylistsController);
    service = module.get<PlaylistsService>(PlaylistsService);

    jest.spyOn(service, 'getPlaylists');
    jest.spyOn(service, 'searchPlaylists');
    jest.spyOn(service, 'getPlaylist');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get playlists', async () => {
    await controller.getPlaylists(undefined);
    expect(service.getPlaylists).toHaveBeenCalledTimes(1);
    expect(service.getPlaylists).toHaveBeenCalledWith();
  });

  it('should get playlists with query', async () => {
    await controller.getPlaylists('рус');
    expect(service.searchPlaylists).toHaveBeenCalledTimes(1);
    expect(service.searchPlaylists).toHaveBeenCalledWith('рус');
  });

  it('should get playlist', async () => {
    await controller.getPlaylist('123');
    expect(service.getPlaylist).toHaveBeenCalledTimes(1);
    expect(service.getPlaylist).toHaveBeenCalledWith('123');
  });
});
