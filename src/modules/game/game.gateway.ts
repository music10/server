import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { PlaylistsService } from '../playlists/playlists.service';
import { YandexService } from '../yandex';
import { Type } from '../yandex/yandex.types';
import { GameService } from './game.service';

/**
 * WebSocket Game gateway
 * @implements OnGatewayConnection
 * @implements OnGatewayDisconnect
 */
@WebSocketGateway(3001, {
  namespace: 'game',
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /**
   * GameGateway constructor
   * @param gameService
   * @param playlistsService
   * @param yandexService
   */
  constructor(
    private readonly gameService: GameService,
    private readonly playlistsService: PlaylistsService,
    private readonly yandexService: YandexService,
  ) {}

  /**
   * WebSocket server instance
   * @private
   */
  @WebSocketServer()
  private server: Server;

  /**
   * Connection handler
   * @param socket
   */
  public handleConnection(socket: Socket) {
    this.gameService.addClient(socket.id, this.yandexService);
  }

  /**
   * Disconnection handler
   * @param socket
   */
  public handleDisconnect(socket: Socket) {
    this.gameService.removeClient(socket.id);
  }

  /**
   * Set playlist
   * @param socket - client socket instance
   * @param id
   * @param type
   */
  @SubscribeMessage('setPlaylist')
  async setPlaylist(
    @ConnectedSocket() socket: Socket,
    @MessageBody() [id, type]: [string, Type],
  ) {
    const playlist = await this.playlistsService.getPlaylist(id, type);
    socket.emit(
      'playlist',
      this.gameService
        .getClient(socket.id)
        .setPlaylist(
          playlist,
          async () =>
            (await this.playlistsService.getPlaylist(id, type)).tracks,
        ),
    );
  }

  /**
   * Get next tracks for user
   * @param socket - client socket instance
   */
  @SubscribeMessage('next')
  async getNextTracks(@ConnectedSocket() socket: Socket) {
    socket.emit(
      'nextTracks',
      await this.gameService.getClient(socket.id).next(),
    );
  }

  /**
   * Accept user choose
   * @param socket - client socket instance
   * @param trackId
   */
  @SubscribeMessage('choose')
  async chooseTrack(
    @ConnectedSocket() socket: Socket,
    @MessageBody() trackId: string,
  ) {
    socket.emit(
      'chooseResult',
      await this.gameService.getClient(socket.id).choose(trackId),
    );
  }

  /**
   * Get results
   * @param socket - client socket instance
   */
  @SubscribeMessage('getResult')
  async getResult(@ConnectedSocket() socket: Socket) {
    socket.emit(
      'result',
      await this.gameService.getClient(socket.id).getResult(),
    );
  }
}
