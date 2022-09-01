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
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  }),
});
