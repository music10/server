import { Test, TestingModule } from '@nestjs/testing';
import { YandexService } from './yandex.service';
import { YandexHttpModule } from './yandexHttpModule';

describe('SpotifyApiService', () => {
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
    const result = await service.getPlaylistById('37i9dQZF1DXathzFlVFFpY');
    expect(result).toStrictEqual({
      cover: 'https://i.scdn.co/image/ab67706f000000034647a679d5cc388b5c58fa13',
      id: '37i9dQZF1DXathzFlVFFpY',
      name: 'Хиты русского рэпа',
    });
  });

  it('should get tracks by playlist id', async () => {
    const result = await service.getTracksByPlaylistId(
      '37i9dQZF1DXathzFlVFFpY',
    );
    expect(result.length).toBeGreaterThan(10);
    expect(result[0]).toStrictEqual({
      album: 'Быль в глаза',
      artist: 'Каста',
      id: '5NqhAFTgPTsxhm7kDhfVCw',
      mp3: 'https://p.scdn.co/mp3-preview/8c6dca701a459b178b661aa655a488f200d4b18d?cid=6e32a60ae68b408596f337136300880c',
      name: 'Вокруг Шум',
    });
  });

  it('should get track by id', async () => {
    const result = await service.getTrackById('1xIDRR91yrYa3LvYWkOxxz');
    expect(result).toStrictEqual({
      artist: 'Баста',
      mp3: 'https://p.scdn.co/mp3-preview/0539e24facf10a93655f79ab48fe24a9370f56dc?cid=6e32a60ae68b408596f337136300880c',
      id: '1xIDRR91yrYa3LvYWkOxxz',
      name: 'Моя игра',
      album: 'Баста 1',
    });
  });
});
