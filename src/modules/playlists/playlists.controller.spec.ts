import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsController } from './playlists.controller';
import { MusicApiModule } from '../api';
import { PlaylistsService } from './playlists.service';
import { PLAYLIST_MOCK, PLAYLISTS_MOCK } from '../../../__tests__/mocks';

describe('PlaylistsController', () => {
  let controller: PlaylistsController;
  let service: PlaylistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MusicApiModule],
      providers: [PlaylistsService],
      controllers: [PlaylistsController],
    }).compile();

    controller = module.get<PlaylistsController>(PlaylistsController);
    service = module.get<PlaylistsService>(PlaylistsService);

    jest
      .spyOn(service, 'getPlaylists')
      .mockImplementation(async () => PLAYLISTS_MOCK);
    jest.spyOn(service, 'searchPlaylists');
    jest
      .spyOn(service, 'getPlaylist')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .mockImplementation(async () => PLAYLIST_MOCK);
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
