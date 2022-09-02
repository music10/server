import { Injectable } from '@nestjs/common';
import { YandexService } from '../yandex';
import { Game } from './entities/game.entity';

/**
 * Service for Game session
 */
@Injectable()
export class GameService {
  /**
   * Clients pool
   * @private
   */
  private clients: Record<string, Game> = {};

  /**
   * Add new client to pool
   * @param clientId
   * @param yandexService
   */
  public addClient(clientId: string, yandexService: YandexService): void {
    this.clients[clientId] = new Game(yandexService);
  }

  /**
   * Remove client from pool
   * @param clientId
   */
  public removeClient(clientId: string): void {
    delete this.clients[clientId];
  }

  /**
   * Get client from pool by id
   * @param clientId
   */
  public getClient(clientId: string): Game {
    return this.clients[clientId];
  }
}
