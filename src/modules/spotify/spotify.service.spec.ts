import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyService } from './spotify.service';
import { SpotifyHttpModule } from './spotifyHttpModule';

describe('SpotifyApiService', () => {
  let service: SpotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpotifyHttpModule],
      providers: [SpotifyService],
    }).compile();

    service = module.get<SpotifyService>(SpotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get playlists', async () => {
    expect(await service.getCherryPickPlaylists()).toStrictEqual([
      {
        id: '27f5HDjqkWIOxX7xA3T95p',
        name: 'Русский рэп',
      },
      {
        id: '48GDjdetYhdwfWQExsS2nS',
        name: 'Дискотека 90-х',
      },
      {
        id: '5I4WLaJYpw1pPcRXwUQ9XV',
        name: 'Топ 100',
      },
      {
        id: '0wZkV8pmLGp8TtfRZSjG10',
        name: 'TikTok Топ Россия',
      },
      {
        id: '4IFSlc0bbc2BtoIzYxpRlG',
        name: 'Хиты FM 2021',
      },
      {
        id: '3CjOptqIHEVcfNEP9GAuMz',
        name: 'Русский Рок',
      },
    ]);
  });

  it('should search playlists', async () => {
    expect(await service.searchPlaylists('русский')).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name: expect.any(String),
        },
      ]),
    );
  });

  it('should search playlists by artist', async () => {
    expect(await service.searchPlaylistsByArtist('Ice Cube')).toHaveLength(1);
  });

  it('should get playlist by id', async () => {
    const result = await service.getPlaylistById('27f5HDjqkWIOxX7xA3T95p');
    expect(result).toStrictEqual({
      cover: 'https://i.scdn.co/image/ab67706c0000bebbf88690ba7de2ca86e09281ac',
      id: '27f5HDjqkWIOxX7xA3T95p',
      name: 'Русский Рэп: Лучшее',
      getTracks: expect.any(Function),
    });
    expect((await result.getTracks()).length).toBeGreaterThan(10);
  });

  it('should get tracks by playlist id', async () => {
    const result = await service.getTracksByPlaylistId(
      '27f5HDjqkWIOxX7xA3T95p',
    );
    expect(result.length).toBeGreaterThan(10);
    expect(result[0]).toStrictEqual({
      artist: 'Баста',
      mp3:
        'https://p.scdn.co/mp3-preview/82baf3251c6681495a3cb5b2c9b476b4e51f2070?cid=6e32a60ae68b408596f337136300880c',
      id: '1xIDRR91yrYa3LvYWkOxxz',
      name: 'Моя игра',
      album: 'Баста 1',
    });
  });

  it('should get track by id', async () => {
    const result = await service.getTrackById('1xIDRR91yrYa3LvYWkOxxz');
    expect(result).toStrictEqual({
      artist: 'Баста',
      mp3:
        'https://p.scdn.co/mp3-preview/82baf3251c6681495a3cb5b2c9b476b4e51f2070?cid=6e32a60ae68b408596f337136300880c',
      id: '1xIDRR91yrYa3LvYWkOxxz',
      name: 'Моя игра',
      album: 'Баста 1',
    });
  });
});
