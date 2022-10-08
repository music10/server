import { PlaylistDto } from '../../src/dtos';
import { Type } from '../../src/modules/yandex/yandex.types';

/**
 * Example of PlaylistDto
 */
export const PLAYLIST_MOCK: PlaylistDto = {
  id: '6536346784',
  name: 'Русский рэп',
  tracks: [],
  type: Type.playlist,
  cover: 'https://i.scdn.co/image/ab67706c0000bebb9fe89caef5c9f3d66b0d988d',
};
