import { HttpModule } from '@nestjs/axios';

/**
 * Http module for Spotify API
 */
export const SpotifyHttpModule = HttpModule.registerAsync({
  useFactory: () => ({
    timeout: 5000,
    maxRedirects: 5,
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  }),
});
