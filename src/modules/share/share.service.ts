import { Injectable } from '@nestjs/common';

import { SpotifyService } from '../spotify';
import { Colors, HEADER_TEXT, LOGO_SVG, MAIN_TEXT, Sizes } from './variables';
import { fabric } from './utils';

/**
 * Share Service
 */
@Injectable()
export class ShareService {
  /**
   * ShareService constructor
   * @param apiService
   */
  constructor(private readonly apiService: SpotifyService) {}

  /**
   * Generate png for share
   * @param {string} playlistId - playlist ID
   * @param {number} guess - number of guessed tracks
   * @return {string} base64 encoded png image
   */
  async generatePng(playlistId: string, guess: number): Promise<string> {
    const { name, cover } = await this.apiService.getPlaylistById(playlistId);

    fabric.nodeCanvas.registerFont(
      __dirname + '/assets/Montserrat-SemiBold.ttf',
      {
        family: 'Montserrat',
        weight: 600,
        style: 'normal',
      },
    );
    fabric.nodeCanvas.registerFont(__dirname + '/assets/Montserrat-Bold.ttf', {
      family: 'Montserrat',
      weight: 700,
      style: 'normal',
    });

    const canvas = new fabric.StaticCanvas(null, {
      backgroundColor: Colors.bg,
      width: Sizes.width,
      height: Sizes.height,
    });

    // Big green text
    const header = new fabric.Textbox(HEADER_TEXT[guess], {
      left: Sizes.marginLeft, // Same margin
      top: 150, // Absolute top
      width: 955,
      fill: Colors.accent,
      fontFamily: 'Montserrat',
      fontSize: 140,
      lineHeight: 0.95,
      fontStyle: 'normal',
      fontWeight: 700,
    });
    canvas.add(header);

    // Little white text
    const text = new fabric.Textbox(MAIN_TEXT[guess], {
      width: 600,
      fill: Colors.main,
      fontFamily: 'Montserrat',
      fontSize: 54,
      fontWeight: 600,
    });
    canvas.add(text);

    // PlaylistDto is just green text so we are just cloning
    const playlistText = fabric.util.object.clone(text).set({
      text: name,
      top: 150,
      fill: Colors.accent,
      breakWords: true,
    });

    // Right bottom logo
    const logo = await new Promise((resolve) => {
      fabric.loadSVGFromString(LOGO_SVG, (objects, options) => {
        const logo = fabric.util.groupSVGElements(objects, options);
        logo.top = canvas.height - logo.height - 50;
        logo.left = canvas.width - logo.width - 75;
        resolve(logo);
      });
    });
    canvas.add(logo);

    // Forming text group staying right from the cover
    const textGroup = new fabric.Group([text, playlistText], {
      left: 330,
    });

    // Cover image, text and playlist grouped
    const coverImg = await new Promise((resolve) => {
      fabric.Image.fromURL(
        cover,
        (img) => {
          img.scaleToWidth(Sizes.cover);
          img.scaleToHeight(Sizes.cover);
          const cover = img.set({
            shadow: {
              color: 'rgba(250, 250, 250, 0.1)',
              blur: 100,
              offsetX: 0,
              offsetY: 50,
            },
            // Rounding
            clipPath: new fabric.Rect({
              width: Sizes.cover,
              height: Sizes.cover,
              top: Sizes.groupTop,
              left: Sizes.marginLeft,
              rx: 15, // Actually border-radius
              ry: 15, // That too
              absolutePositioned: true, // Absolute position is a workaround for scaling
            }),
          });
          resolve(cover);
        },
        { crossOrigin: 'anonymous' },
      );
    });
    // Grouping cover and texts

    canvas.add(
      new fabric.Group([coverImg, textGroup], {
        top: Sizes.groupTop,
        left: Sizes.marginLeft,
      }),
    );
    canvas.renderAll();

    return canvas.toDataURL('png');
  }
}
