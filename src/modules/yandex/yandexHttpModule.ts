import { HttpModule } from '@nestjs/axios';

/**
 * Http module for Yandex.Music API
 */
export const YandexHttpModule = HttpModule.registerAsync({
  useFactory: () => ({
    timeout: 5000,
    maxRedirects: 5,
    baseURL: 'https://api.music.yandex.net/',
    headers: {
      'Accept-Language': 'ru',
      'User-Agent': 'Musiq',
    },
  }),
});
