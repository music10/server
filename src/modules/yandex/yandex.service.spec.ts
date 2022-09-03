import { Test, TestingModule } from '@nestjs/testing';
import { YandexService } from './yandex.service';
import { YandexHttpModule } from './yandexHttpModule';
import { Type } from './yandex.types';

describe('YandexApiService', () => {
  let service: YandexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YandexHttpModule],
      providers: [YandexService],
    }).compile();

    service = module.get<YandexService>(YandexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should get cherry pick playlists', async () => {
    expect(await service.getCherryPickPlaylists()).toMatchSnapshot();
  });

  it.skip('should get featured playlists', async () => {
    expect((await service.getFeaturedPlaylists()).length).toBeGreaterThan(1);
  });

  it('should search playlists', async () => {
    expect(await service.searchPlaylists('русский', Type.playlist)).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name: expect.any(String),
          cover: expect.any(String),
          type: Type.playlist,
          url: expect.any(String),
        },
      ]),
    );
  });

  it('should search artist', async () => {
    expect(await service.searchPlaylists('гуф', Type.artist)).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
          cover: expect.any(String),
          type: Type.artist,
          url: expect.any(String),
        },
      ]),
    );
  });

  it('should get playlist by id', async () => {
    const result = await service.getPlaylistById(
      '901a037b-bfad-e30f-6325-6ebb49f412f3',
    );
    expect(result).toEqual({
      cover:
        'https://avatars.yandex.net/get-music-user-playlist/70586/103372440.2102.42432/200x200?1558344142432',
      id: '901a037b-bfad-e30f-6325-6ebb49f412f3',
      name: 'Русский хип-хоп 2000-х',
      type: 'playlist',
      url: expect.any(String),
      tracks: expect.any(Array),
    });
  });

  it('should get track by id', async () => {
    const result = await service.getTrackById('597043');
    console.log(result);
    expect(result).toStrictEqual({
      artist: 'Каста',
      id: '597043',
      name: 'На порядок выше',
      album: 'Громче воды, выше травы',
      mp3: expect.any(String),
    });
  });

  it('should get mp3 track by id', async () => {
    const result = await service.getMp3ByTrackId('597043');
    expect(result).toBeDefined();
  });
});
