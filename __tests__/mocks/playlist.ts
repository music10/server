import { TRACKS_MOCK } from './tracks';
import { Playlist } from '../../src/interfaces';

/**
 * Example of Playlist
 */
export const PLAYLIST_MOCK: Playlist = {
  id: 6536346784,
  name: 'Русский рэп',
  getTracks: async () => TRACKS_MOCK,
};
