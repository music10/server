import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';

import { PlaylistsModule } from '../playlists';
import { SpotifyModule } from '../spotify';
import { PlaylistsService } from '../playlists/playlists.service';
import { PLAYLIST_MOCK } from '../../../__tests__/mocks';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';

const MOCK_SOCKET: Socket = {
  id: '123456',
  emit(event: string | symbol, ...args: any[]): boolean {
    return true;
  },
} as Socket;

describe('GameGateway', () => {
  let gateway: GameGateway;
  let service: GameService;
  const game = new Game();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlaylistsModule, SpotifyModule],
      providers: [GameGateway, GameService],
    }).compile();

    gateway = module.get<GameGateway>(GameGateway);
    service = module.get<GameService>(GameService);
    const playlistService = module.get<PlaylistsService>(PlaylistsService);

    jest.spyOn(service, 'addClient');
    jest.spyOn(service, 'removeClient');
    jest.spyOn(service, 'getClient').mockReturnValue(game);
    jest
      .spyOn(playlistService, 'getPlaylist')
      .mockReturnValue(new Promise((resolve) => resolve(PLAYLIST_MOCK)));
    jest.spyOn(game, 'setPlaylist');
    jest.spyOn(game, 'next');
    jest.spyOn(game, 'getResult');
    jest.spyOn(game, 'choose');
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be client connect', () => {
    gateway.handleConnection(MOCK_SOCKET);
    expect(service.addClient).toHaveBeenCalledTimes(1);
    expect(service.addClient).toHaveBeenCalledWith('123456');
  });

  it('should be client disconnect', () => {
    gateway.handleDisconnect(MOCK_SOCKET);
    expect(service.removeClient).toHaveBeenCalledTimes(1);
    expect(service.removeClient).toHaveBeenCalledWith('123456');
  });

  it('should setPlaylist', async () => {
    await gateway.setPlaylist(MOCK_SOCKET, '6536346784');
    expect(game.setPlaylist).toHaveBeenCalledTimes(1);
    expect(game.setPlaylist).toHaveBeenCalledWith({
      id: '6536346784',
      cover: 'https://i.scdn.co/image/ab67706c0000bebb9fe89caef5c9f3d66b0d988d',
      name: 'Русский рэп',
      getTracks: expect.any(Function),
    });
  });

  it('should getNextTracks', async () => {
    await gateway.getNextTracks(MOCK_SOCKET);
    expect(game.next).toHaveBeenCalledTimes(1);
    expect(game.next).toHaveBeenCalledWith();
  });

  it('should choose', async () => {
    await gateway.chooseTrack(MOCK_SOCKET, 2);
    expect(game.choose).toHaveBeenCalledTimes(1);
    expect(game.choose).toHaveBeenCalledWith(2);
  });

  it('should get result', async () => {
    await gateway.getResult(MOCK_SOCKET);
    expect(game.getResult).toHaveBeenCalledTimes(1);
    expect(game.getResult).toHaveBeenCalledWith();
  });
});
