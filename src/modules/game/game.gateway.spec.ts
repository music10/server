import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';

import { PlaylistsModule } from '../playlists';
import { YandexModule } from '../yandex';
import { PlaylistsService } from '../playlists/playlists.service';
import { PLAYLIST_MOCK } from '../../../__tests__/mocks';
import { Type } from '../yandex/yandex.types';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';

const MOCK_SOCKET: Socket = {
  id: '123456',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      imports: [PlaylistsModule, YandexModule],
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
    jest.spyOn(game, 'next').mockImplementation(() => void 0);
    jest.spyOn(game, 'getResult');
    jest.spyOn(game, 'choose').mockImplementation(() => void 0);
    jest.spyOn(game, 'hint50').mockImplementation(() => void 0);
    jest.spyOn(game, 'hintReplay').mockImplementation(() => void 0);
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
    await gateway.setPlaylist(MOCK_SOCKET, ['6536346784', Type.playlist]);
    expect(game.setPlaylist).toHaveBeenCalledTimes(1);
    expect(game.setPlaylist).toHaveBeenCalledWith(
      {
        id: '6536346784',
        cover:
          'https://i.scdn.co/image/ab67706c0000bebb9fe89caef5c9f3d66b0d988d',
        name: 'Русский рэп',
        tracks: expect.any(Array),
        type: Type.playlist,
      },
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('should getNextTracks', async () => {
    await gateway.setPlaylist(MOCK_SOCKET, ['6536346784', Type.playlist]);
    await gateway.getNextTracks(MOCK_SOCKET);
    expect(game.next).toHaveBeenCalledTimes(1);
    expect(game.next).toHaveBeenCalledWith();
  });

  it('should choose', async () => {
    await gateway.setPlaylist(MOCK_SOCKET, ['6536346784', Type.playlist]);
    await gateway.getNextTracks(MOCK_SOCKET);
    await gateway.chooseTrack(MOCK_SOCKET, 'trackId1');
    expect(game.choose).toHaveBeenCalledTimes(1);
    expect(game.choose).toHaveBeenCalledWith('trackId1');
  });

  it('should hint 50-50', async () => {
    await gateway.setPlaylist(MOCK_SOCKET, ['6536346784', Type.playlist]);
    await gateway.getNextTracks(MOCK_SOCKET);
    await gateway.hint50(MOCK_SOCKET, ['111', '222', '333', '444']);
    expect(game.hint50).toHaveBeenCalledTimes(1);
    expect(game.hint50).toHaveBeenCalledWith(['111', '222', '333', '444']);
  });

  it('should hint replay', async () => {
    await gateway.setPlaylist(MOCK_SOCKET, ['6536346784', Type.playlist]);
    await gateway.getNextTracks(MOCK_SOCKET);
    await gateway.hintReplay(MOCK_SOCKET);
    expect(game.hintReplay).toHaveBeenCalledTimes(1);
  });

  it('should get result', async () => {
    await gateway.getResult(MOCK_SOCKET);
    expect(game.getResult).toHaveBeenCalledTimes(1);
    expect(game.getResult).toHaveBeenCalledWith();
  });
});
