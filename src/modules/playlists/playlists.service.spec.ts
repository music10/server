import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyModule, SpotifyService } from '../spotify';
import { PLAYLIST_MOCK } from '../../../__tests__/mocks';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsService', () => {
  let service: PlaylistsService;
  let apiService: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpotifyModule],
      providers: [PlaylistsService],
    }).compile();

    service = module.get<PlaylistsService>(PlaylistsService);
    apiService = module.get<SpotifyService>(SpotifyService);

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
      .spyOn(apiService, 'getArtistById')
      .mockImplementation(async () => ({ id: 'artistId1', name: 'Eminem' }));
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

  it('should get random playlist', async () => {
    const randomPlaylist = await service.getRandomPlaylist();
    expect(apiService.getFeaturedPlaylists).toHaveBeenCalledTimes(1);
    expect(randomPlaylist).toMatchObject(PLAYLIST_MOCK);
  });

  it('should artist by id', async () => {
    await service.getArtist('artistId1');
    expect(apiService.getArtistById).toHaveBeenCalledTimes(1);
    expect(apiService.getArtistById).toHaveBeenCalledWith('artistId1');
  });

  it('should playlist by id', async () => {
    await service.getPlaylist('playlistId1');
    expect(apiService.getPlaylistById).toHaveBeenCalledTimes(1);
    expect(apiService.getPlaylistById).toHaveBeenCalledWith('playlistId1');
  });
});
