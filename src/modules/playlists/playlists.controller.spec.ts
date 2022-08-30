import { Test, TestingModule } from '@nestjs/testing';
import { YandexModule } from '../yandex';
import {
  PLAYLIST_MOCK,
  PLAYLISTS_MOCK,
  TRACKS_MOCK,
} from '../../../__tests__/mocks';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsController', () => {
  let controller: PlaylistsController;
  let service: PlaylistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YandexModule],
      providers: [PlaylistsService],
      controllers: [PlaylistsController],
    }).compile();

    controller = module.get<PlaylistsController>(PlaylistsController);
    service = module.get<PlaylistsService>(PlaylistsService);

    jest
      .spyOn(service, 'getCherryPickPlaylists')
      .mockImplementation(async () => PLAYLISTS_MOCK);
    jest
      .spyOn(service, 'getRandomPlaylist')
      .mockImplementation(async () => PLAYLIST_MOCK);
    jest
      .spyOn(service, 'searchPlaylists')
      .mockImplementation(async () => PLAYLISTS_MOCK);
    jest
      .spyOn(service, 'searchPlaylistsByArtist')
      .mockImplementation(async () => PLAYLISTS_MOCK);
    jest
      .spyOn(service, 'getTracksByPlaylistId')
      .mockImplementation(async () => TRACKS_MOCK);
    jest
      .spyOn(service, 'getPlaylist')
      .mockImplementation(async () => PLAYLIST_MOCK);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get cherry pick playlists', async () => {
    await controller.getCherryPickPlaylists();
    expect(service.getCherryPickPlaylists).toHaveBeenCalledTimes(1);
    expect(service.getCherryPickPlaylists).toHaveBeenCalledWith();
  });

  it('should get random playlist', async () => {
    await controller.getRandomPlaylist();
    expect(service.getRandomPlaylist).toHaveBeenCalledTimes(1);
    expect(service.getRandomPlaylist).toHaveBeenCalledWith();
  });

  it('should get playlists with query', async () => {
    await controller.getPlaylists('рус');
    expect(service.searchPlaylists).toHaveBeenCalledTimes(1);
    expect(service.searchPlaylists).toHaveBeenCalledWith('рус');
  });

  it('should get playlists by artists', async () => {
    await controller.getPlaylistsByArtist('eminem');
    expect(service.searchPlaylistsByArtist).toHaveBeenCalledTimes(1);
    expect(service.searchPlaylistsByArtist).toHaveBeenCalledWith('eminem');
  });

  it('should get playlist', async () => {
    await controller.getPlaylist('playlistId1');
    expect(service.getPlaylist).toHaveBeenCalledTimes(1);
    expect(service.getPlaylist).toHaveBeenCalledWith('playlistId1');
  });

  it('should find tracks by playlist id', async () => {
    await controller.findTracksByPlaylistId('playlistId1');
    expect(service.getTracksByPlaylistId).toHaveBeenCalledTimes(1);
    expect(service.getTracksByPlaylistId).toHaveBeenCalledWith('playlistId1');
  });
});
