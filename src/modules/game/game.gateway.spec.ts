import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { PlaylistsModule } from '../playlists/playlists.module';
import { DeezerApiModule } from '../deezer-api';
import { Socket } from 'socket.io';
import { Game } from './entities/game.entity';
import { PlaylistsService } from '../playlists/playlists.service';
import { PLAYLIST_MOCK } from '../../../__tests__/mocks/playlist';

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
      imports: [PlaylistsModule, DeezerApiModule],
      providers: [GameGateway, GameService],
    }).compile();

    gateway = module.get<GameGateway>(GameGateway);
    service = module.get<GameService>(GameService);
    const playlistService = module.get<PlaylistsService>(PlaylistsService);

    spyOn(service, 'addClient');
    spyOn(service, 'removeClient');
    spyOn(service, 'getClient').and.returnValue(game);
    spyOn(playlistService, 'getPlaylist').and.returnValue(PLAYLIST_MOCK);
    spyOn(game, 'setPlaylist');
    spyOn(game, 'next');
    spyOn(game, 'choose');
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
      id: 6536346784,
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
});
