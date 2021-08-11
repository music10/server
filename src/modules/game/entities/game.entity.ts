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
   * Correct track id
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
   * Tracks array for this game session
   * @private
   */
  private tracks: TrackDto[] = [];

  /**
   * Set playlist for this game session
   * @param {PlaylistDto} playlist
   * @param {Promise<TrackDto[]>} getTracks
   */
  setPlaylist(
    playlist: PlaylistDto,
    getTracks: () => Promise<TrackDto[]>,
  ): PlaylistDto {
    this.playlist = playlist;
    this.getTracks = getTracks;
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
    return {
      tracks: this.displayedTracks.map(({ mp3, ...track }) => track),
      mp3: this.correctTrack.mp3,
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
   * Fill track list if less then 4 tracks
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
