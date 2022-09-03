import { Test, TestingModule } from '@nestjs/testing';

import { YandexModule, YandexService } from '../yandex';
import { PLAYLIST_MOCK } from '../../../__tests__/mocks';
import { Type } from '../yandex/yandex.types';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsService', () => {
  let service: PlaylistsService;
  let apiService: YandexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YandexModule],
      providers: [PlaylistsService],
    }).compile();

    service = module.get<PlaylistsService>(PlaylistsService);
    apiService = module.get<YandexService>(YandexService);

    jest.spyOn(apiService, 'getCherryPickPlaylists');
    jest
      .spyOn(apiService, 'getFeaturedPlaylists')
      .mockImplementation(async () => [
        PLAYLIST_MOCK,
        PLAYLIST_MOCK,
        PLAYLIST_MOCK,
        PLAYLIST_MOCK,
      ]);
    jest
      .spyOn(apiService, 'getPlaylistById')
      .mockImplementation(async () => PLAYLIST_MOCK);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get cherry pick playlists', async () => {
    await service.getCherryPickPlaylists();
    expect(apiService.getCherryPickPlaylists).toHaveBeenCalledTimes(1);
    expect(apiService.getCherryPickPlaylists).toHaveBeenCalledWith();
  });

  it.skip('should get random playlist', async () => {
    const randomPlaylist = await service.getRandomPlaylist();
    expect(apiService.getFeaturedPlaylists).toHaveBeenCalledTimes(1);
    expect(randomPlaylist).toMatchObject(PLAYLIST_MOCK);
  });

  it('should get playlist by id', async () => {
    await service.getPlaylist('playlistId1');
    expect(apiService.getPlaylistById).toHaveBeenCalledTimes(1);
    expect(apiService.getPlaylistById).toHaveBeenCalledWith(
      'playlistId1',
      Type.playlist,
    );
  });
});
