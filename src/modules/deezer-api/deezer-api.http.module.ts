import { HttpModule } from '@nestjs/common';

/**
 * Http module for Deezer API
 */
export const DeezerApiHttpModule = HttpModule.registerAsync({
  useFactory: () => ({
    timeout: 5000,
    maxRedirects: 5,
    baseURL: 'https://api.deezer.com',
    headers: {
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  }),
});
