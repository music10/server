import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { PlaylistsService } from '../src/modules/playlists/playlists.service';
import { PLAYLISTS_MOCK, PLAYLIST_MOCK } from './mocks';

describe('PlaylistsController (e2e)', () => {
  let app: INestApplication;
  const playlistsService = {
    getPlaylists: async () => PLAYLISTS_MOCK,
    getCherryPickPlaylists: async () => PLAYLISTS_MOCK,
    getPlaylist: async () => PLAYLIST_MOCK,
    searchPlaylists: async () => PLAYLISTS_MOCK,
    searchPlaylistsByArtist: async () => PLAYLISTS_MOCK,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PlaylistsService)
      .useValue(playlistsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/playlists (GET)', async () => {
    return request(app.getHttpServer())
      .get('/playlists')
      .expect(200, PLAYLISTS_MOCK);
  });

  it('/playlists?query=Eminem (GET)', async () => {
    return request(app.getHttpServer())
      .get('/playlists?query=Rap')
      .expect(200, PLAYLISTS_MOCK);
  });

  it('/playlists/artist?query=Eminem (GET)', async () => {
    return request(app.getHttpServer())
      .get('/playlists/artist?query=Eminem')
      .expect(200, PLAYLISTS_MOCK);
  });

  it('/playlists/cherry-pick (GET)', async () => {
    return request(app.getHttpServer())
      .get('/playlists/cherry-pick')
      .expect(200, PLAYLISTS_MOCK);
  });

  it('/playlists/{id} (GET)', async () => {
    return request(app.getHttpServer())
      .get('/playlists/123')
      .expect(200, PLAYLIST_MOCK);
  });

  afterAll(async () => {
    await app.close();
  });
});
