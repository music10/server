import { PLAYLIST_MOCK } from '../../../../__tests__/mocks';
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
    gameInstance.setPlaylist(PLAYLIST_MOCK);
    expect(gameInstance.result).toBeDefined();
  });

  it('Should get next', async () => {
    gameInstance.setPlaylist(PLAYLIST_MOCK);
    const nextTracks = await gameInstance.next();

    expect(gameInstance.displayedTracks).toBeDefined();
    expect(gameInstance.displayedTracks).toHaveLength(4);
    expect(nextTracks.mp3).toEqual(expect.any(String));
    expect(nextTracks.tracks).toHaveLength(4);
    expect(nextTracks.tracks[0]).toStrictEqual({
      id: expect.any(Number),
      name: expect.any(String),
      artist: expect.any(String),
      album: expect.any(String),
    });
  });

  it('Should choose', async () => {
    gameInstance.setPlaylist(PLAYLIST_MOCK);
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
});
