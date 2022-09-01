import { Test, TestingModule } from '@nestjs/testing';
import { YandexService } from './yandex.service';
import { YandexHttpModule } from './yandexHttpModule';

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

  it('should get playlists', async () => {
    expect(await service.getCherryPickPlaylists()).toMatchSnapshot();
  });

  it('should get featured playlists', async () => {
    expect((await service.getFeaturedPlaylists()).length).toBeGreaterThan(1);
  });

  it('should search playlists', async () => {
    expect(await service.searchPlaylists('русский')).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name: expect.any(String),
          cover: expect.any(String),
        },
      ]),
    );
  });

  it('should get tracks by artist', async () => {
    expect(await service.getTracksByArtist(158454)).toEqual(
      expect.arrayContaining([
        {
          album: expect.any(String),
          artist: expect.any(String),
          id: expect.any(String),
          mp3: expect.any(String),
          name: expect.any(String),
        },
      ]),
    );
  });

  it('should search artist', async () => {
    expect(await service.searchArtists('гуф')).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
          cover: expect.any(String),
        },
      ]),
    );
  });

  it('should get playlist by id', async () => {
    const result = await service.getPlaylistById(
      '901a037b-bfad-e30f-6325-6ebb49f412f3',
    );
    expect(result).toStrictEqual({
      cover:
        'https://avatars.yandex.net/get-music-user-playlist/70586/103372440.2102.42432/200x200?1558344142432',
      id: '901a037b-bfad-e30f-6325-6ebb49f412f3',
      name: 'Русский хип-хоп 2000-х',
    });
  });

  it('should get tracks by playlist id', async () => {
    const result = await service.getTracksByPlaylistId(
      '901a037b-bfad-e30f-6325-6ebb49f412f3',
    );
    expect(result.length).toBeGreaterThan(10);
    expect(result[0]).toStrictEqual({
      album: 'Громче воды, выше травы',
      artist: 'Каста',
      id: '597043',
      mp3: '',
      name: 'На порядок выше',
    });
  });

  it('should get track by id', async () => {
    const result = await service.getTrackById('597043');
    expect(result).toStrictEqual({
      artist: 'Каста',
      mp3: '',
      id: '597043',
      name: 'На порядок выше',
      album: 'Громче воды, выше травы',
    });
  });
});
