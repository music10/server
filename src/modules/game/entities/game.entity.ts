import { Result } from './result.entity';
import { Playlist, Track } from '../../../interfaces';
import { randomSort } from '../../../utils';
import { TracksForUser } from '../dtos/tracksForUser';
import { ChooseResult } from '../dtos/chooseResult';

/**
 * Class for game session
 */
export class Game {
  /**
   * Result object
   */
  result: Result;

  /**
   * Current displayed tracks for user
   */
  displayedTracks: Track[];

  /**
   * Correct track id
   * @private
   */
  private correctTrack: Track;

  /**
   * Current playlist
   * @private
   */
  private playlist: Playlist;

  /**
   * Tracks array for this game session
   * @private
   */
  private tracks: Track[] = [];

  /**
   * Set playlist for this game session
   * @param playlist
   */
  setPlaylist(playlist: Playlist): Playlist {
    this.playlist = playlist;
    this.result = new Result();
    return playlist;
  }

  /**
   * Get next tracks for user
   */
  async next(): Promise<TracksForUser> {
    await this.fillTracks();
    await this.sortTracks();
    const correctTrack = this.tracks.shift();
    this.correctTrack = correctTrack;

    const wrongTracks = this.tracks.slice(0, 3);
    this.displayedTracks = randomSort([correctTrack, ...wrongTracks]);
    return {
      tracks: this.displayedTracks.map(({ mp3, ...track }) => track),
      mp3: this.correctTrack.mp3,
    };
  }

  /**
   * Accept user choose
   * @param chooseTrackId
   */
  choose(chooseTrackId: number): ChooseResult {
    this.result.updateProgress(chooseTrackId === this.correctTrack.id);
    return { correct: this.correctTrack.id, result: this.result };
  }

  /**
   * Fill track list if less then 4 tracks
   * @private
   */
  private async fillTracks(): Promise<void> {
    while (this.tracks.length < 4) {
      this.tracks = randomSort([...(await this.playlist.getTracks())]);
    }
  }

  /**
   * Sort tracks using random sort
   * @private
   */
  private async sortTracks(): Promise<void> {
    this.tracks = randomSort(this.tracks);
  }
}
