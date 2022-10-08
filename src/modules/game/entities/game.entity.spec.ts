import { PLAYLIST_MOCK, TRACKS_MOCK } from '../../../../__tests__/mocks';
import { Game } from './game.entity';

describe('Game', () => {
  let gameInstance: Game;

  beforeEach(() => {
    gameInstance = new Game();
  });

  it('Should be defined correctly', () => {
    expect(gameInstance.result).not.toBeDefined();
    expect(gameInstance.displayedTracks).not.toBeDefined();
  });

  it('Should set playlist', () => {
    gameInstance.setPlaylist(
      PLAYLIST_MOCK,
      async () => TRACKS_MOCK,
      async () => 'https://example.com/file.mp3',
    );
    expect(gameInstance.result).toBeDefined();
  });

  it('Should get next', async () => {
    gameInstance.setPlaylist(
      PLAYLIST_MOCK,
      async () => TRACKS_MOCK,
      async () => 'https://example.com/file.mp3',
    );
    const nextTracks = await gameInstance.next();

    expect(gameInstance.displayedTracks).toBeDefined();
    expect(gameInstance.displayedTracks).toHaveLength(4);
    expect(nextTracks.mp3).toEqual(expect.any(String));
    expect(nextTracks.tracks).toHaveLength(4);
    expect(nextTracks.tracks[0]).toStrictEqual({
      id: expect.any(String),
      name: expect.any(String),
      artist: expect.any(String),
      album: expect.any(String),
      mp3: expect.any(String),
    });
  });

  it('Should choose', async () => {
    gameInstance.setPlaylist(
      PLAYLIST_MOCK,
      async () => TRACKS_MOCK,
      async () => 'https://example.com/file.mp3',
    );
    await gameInstance.next();
    const result = gameInstance.choose('trackId3');
    expect(gameInstance.result.progress).toHaveLength(1);
    expect(gameInstance.result.progress[0]).toBe(
      gameInstance['correctTrack'].id === 'trackId3',
    );
    expect(result).toEqual({
      correct: gameInstance['correctTrack'].id,
    });
  });

  it('Should 50-50 hint', async () => {
    gameInstance.setPlaylist(
      PLAYLIST_MOCK,
      async () => TRACKS_MOCK,
      async () => 'https://example.com/file.mp3',
    );
    const tracks = await gameInstance.next();
    const trackIds = tracks.tracks.map(({ id }) => id);
    const result = gameInstance.hint50(trackIds);
    expect(result).toHaveLength(2);
    expect(trackIds).toEqual(expect.arrayContaining(result));
  });

  it('Should replay hint', async () => {
    gameInstance.setPlaylist(
      PLAYLIST_MOCK,
      async () => TRACKS_MOCK,
      async () => 'https://example.com/file.mp3',
    );
    const tracks = await gameInstance.next();
    const result = await gameInstance.hintReplay();
    expect(result).toBe(tracks.mp3);
  });
});
