import { PlaylistDto } from '../../src/dtos';
import { TRACKS_MOCK } from './tracks';

/**
 * Example of PlaylistDto
 */
export const PLAYLIST_MOCK: PlaylistDto = {
  id: '6536346784',
  name: 'Русский рэп',
  cover: 'https://i.scdn.co/image/ab67706c0000bebb9fe89caef5c9f3d66b0d988d',
  getTracks: async () => TRACKS_MOCK,
};
