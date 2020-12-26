import { Test, TestingModule } from '@nestjs/testing';
import { DeezerApiService } from './deezer-api.service';
import { DeezerApiHttpModule } from './deezer-api.http.module';

describe('DeezerApiService', () => {
  let service: DeezerApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DeezerApiHttpModule],
      providers: [DeezerApiService],
    }).compile();

    service = module.get<DeezerApiService>(DeezerApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get playlists', async () => {
    expect(await service.getPlaylists()).toStrictEqual([
      { id: 6536346784, name: 'Русский рэп' },
      { id: 6536456504, name: 'Русское' },
      { id: 6538130744, name: 'Рок Легенды' },
      { id: 6538212324, name: 'Party 2000  (Eng)' },
      { id: 6538286664, name: 'Электронная музыка' },
      { id: 6538301104, name: 'Хиты 2019' },
      { id: 6538306484, name: 'top100' },
      { id: 6538316964, name: 'Тем кому за 20' },
      { id: 7143520404, name: 'Егор Крид' },
      { id: 7143574264, name: 'Моргенштерн' },
      { id: 7143612724, name: 'Макс Корж' },
      { id: 7145047804, name: 'Billie Eilish' },
      { id: 7196330084, name: 'Скриптонит' },
      { id: 7196352584, name: 'Imagine Dragons' },
      { id: 7196355904, name: 'Linkin Park' },
      { id: 7196528424, name: 'GONE.Fludd' },
      { id: 7223020864, name: 'Oxxxymiron' },
    ]);
  });

  it('should search playlists', async () => {
    expect(await service.searchPlaylists('рус')).toStrictEqual([
      { id: 6536346784, name: 'Русский рэп' },
      { id: 6536456504, name: 'Русское' },
    ]);
  });

  it('should get playlist by id', async () => {
    const result = await service.getPlaylistById('6536346784');
    expect(result).toStrictEqual({
      id: 6536346784,
      name: 'Русский рэп',
      getTracks: expect.any(Function),
    });
    expect((await result.getTracks()).length).toBeGreaterThan(10);
  });

  it('should get tracks by playlist id', async () => {
    const result = await service.getTracksByPlaylistId('6536346784');
    expect(result.length).toBeGreaterThan(10);
    expect(result[0]).toStrictEqual({
      author: 'Каста',
      mp3:
        'https://cdns-preview-3.dzcdn.net/stream/c-3cb5a745355abfc72dcf1e78cee1868b-3.mp3',
      id: 92007768,
      name: 'Вокруг шум',
    });
  });

  it('should get track by id', async () => {
    const result = await service.getTrackById('92007768');
    expect(result).toStrictEqual({
      author: 'Каста',
      mp3:
        'https://cdns-preview-3.dzcdn.net/stream/c-3cb5a745355abfc72dcf1e78cee1868b-3.mp3',
      id: 92007768,
      name: 'Вокруг шум',
    });
  });
});
