import { BadGatewayException } from '@nestjs/common';
import { PlaylistDto, TrackDto } from '../../../dtos';
import { randomSort } from '../../../utils';
import { ChooseAnswerDto, ResultDto, TracksForUserDto } from '../dtos';
import { HEADER_TEXT } from '../../share/variables';
import { Result } from './result.entity';

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
  displayedTracks: TrackDto[];

  /**
   * Correct track
   * @private
   */
  private correctTrack: TrackDto;

  /**
   * Current playlist
   * @private
   */
  private playlist: PlaylistDto;

  /**
   * Current playlist
   * @private
   */
  private getTracks: () => Promise<TrackDto[]>;

  /**
   * Get link to mp3 file
   * @private
   */
  private getMp3ByTrackId: (id: string) => Promise<string>;

  /**
   * Tracks array for this game session
   * @private
   */
  private tracks: TrackDto[] = [];

  /**
   * Set playlist for this game session
   * @param playlist playlist info
   * @param getTracks function for get all playlist tracks
   * @param getMp3ByTrackId http-link to mp3 file
   */
  setPlaylist(
    playlist: PlaylistDto,
    getTracks: () => Promise<TrackDto[]>,
    getMp3ByTrackId: (id: string) => Promise<string>,
  ): PlaylistDto {
    this.playlist = playlist;
    this.getTracks = getTracks;
    this.getMp3ByTrackId = getMp3ByTrackId;
    this.result = new Result();
    return playlist;
  }

  /**
   * Get next tracks for user
   */
  async next(): Promise<TracksForUserDto> {
    await this.fillTracks();
    await this.sortTracks();
    const correctTrack = this.tracks.shift();
    this.correctTrack = correctTrack;

    const wrongTracks = this.tracks.slice(0, 3);
    this.displayedTracks = randomSort([correctTrack, ...wrongTracks]);
    const mp3 = await this.getMp3ByTrackId(correctTrack.id);

    return {
      tracks: this.displayedTracks,
      mp3,
    };
  }

  /**
   * Accept user choose
   * @param chooseTrackId
   */
  choose(chooseTrackId: string): ChooseAnswerDto {
    this.result.updateProgress(chooseTrackId === this.correctTrack.id);
    return { correct: this.correctTrack.id };
  }

  /**
   * 50-50 hint
   * @param trackIds
   */
  hint50(trackIds: string[]): string[] {
    return randomSort(
      trackIds.filter((id) => id !== this.correctTrack.id),
    ).slice(0, 2);
  }

  /**
   * replay hint
   */
  async hintReplay(): Promise<string> {
    return this.getMp3ByTrackId(this.correctTrack.id);
  }

  /**
   * Get results
   */
  getResult(): ResultDto {
    const guessed = this.result.progress.filter((item) => item).length;
    return {
      guessed,
      playlist: this.playlist,
      text: HEADER_TEXT[guessed],
    };
  }

  /**
   * Fill track list if less than 4 tracks
   * @private
   */
  private async fillTracks(): Promise<void> {
    while (this.tracks.length < 4) {
      const tracks = await this.getTracks();
      if (tracks.length < 4) {
        throw new BadGatewayException(`Bad playlist ${this.playlist.id}`);
      }
      this.tracks = randomSort([...tracks]);
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
