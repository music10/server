import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsModule } from '../playlists';
import { SpotifyModule } from '../spotify';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlaylistsModule, SpotifyModule],
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add client', () => {
    service.addClient('clientId123');
    service.addClient('clientId123');
    service.addClient('clientId234');
    expect(service['clients']).toStrictEqual({
      clientId123: expect.any(Game),
      clientId234: expect.any(Game),
    });
  });

  it('should remove client', () => {
    service.addClient('clientId123');
    service.addClient('clientId234');
    service.removeClient('clientId123');
    service.removeClient('clientId123');
    expect(service['clients']).toStrictEqual({
      clientId234: expect.any(Game),
    });
  });

  it('should get client', () => {
    service.addClient('clientId123');
    expect(service.getClient('clientId123')).toStrictEqual(expect.any(Game));
    expect(service.getClient('clientId234')).not.toBeDefined();
  });
});
