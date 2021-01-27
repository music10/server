import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { PlaylistsService } from '../src/modules/playlists/playlists.service';
import { PLAYLISTS_MOCK, PLAYLIST_MOCK } from './mocks';

describe('PlaylistsController (e2e)', () => {
  let app: INestApplication;
  const apiService = {
    getPlaylists: () => PLAYLISTS_MOCK,
    getPlaylist: () => PLAYLIST_MOCK,
    searchPlaylists: (_) => PLAYLISTS_MOCK,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PlaylistsService)
      .useValue(apiService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/playlists (GET)', async () => {
    return request(app.getHttpServer())
      .get('/playlists')
      .expect(200)
      .expect(PLAYLISTS_MOCK);
  });

  afterAll(async () => {
    await app.close();
  });
});
