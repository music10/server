import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { PlaylistsModule } from '../playlists';
import { DeezerApiModule } from '../deezer-api';
import { Game } from './entities/game.entity';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlaylistsModule, DeezerApiModule],
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add client', () => {
    service.addClient('123');
    service.addClient('123');
    service.addClient('234');
    expect(service['clients']).toStrictEqual({
      '123': expect.any(Game),
      '234': expect.any(Game),
    });
  });

  it('should remove client', () => {
    service.addClient('123');
    service.addClient('234');
    service.removeClient('123');
    service.removeClient('123');
    expect(service['clients']).toStrictEqual({
      '234': expect.any(Game),
    });
  });

  it('should get client', () => {
    service.addClient('123');
    expect(service.getClient('123')).toStrictEqual(expect.any(Game));
    expect(service.getClient('234')).not.toBeDefined();
  });
});
