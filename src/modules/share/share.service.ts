import { Injectable } from '@nestjs/common';

/**
 * Convertor to convert svg to png/jpeg images for Node
 * @link https://github.com/fuzhenn/node-svg2img
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const svg2img = require('svg2img');

/**
 * Share Service
 */
@Injectable()
export class ShareService {
  /**
   * Generate png for share
   * @param playlist - name of playlist
   * @param guess - number of guessed tracks
   * @param all - number of all tracks
   * @return base64 encoded png image
   */
  generatePng(playlist: string, guess: number, all: number): Promise<string> {
    const CHART_OUTER_WIDTH = 1080;
    const STROKE_WIDTH = 30;
    const CHART_INNER_WIDTH = CHART_OUTER_WIDTH - 2 * STROKE_WIDTH;
    const CIRCUMFERENCE = CHART_INNER_WIDTH * 0.8 * Math.PI;
    const circumferenceProgress = (guess / all) * CIRCUMFERENCE;

    enum Colors {
      accent = '#94FF28',
      bg = '#141414',
      main = '#FCFCFC',
    }

    const svg = `<svg
      viewBox="0 0 1080 1920"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1920"
      width="1080"
    >
      <defs>
        <style type="text/css">
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500");
          text {
            font-family: Montserrat, sans-serif;
            font-weight: 500;
            font-stretch: normal;
            letter-spacing: normal;
            font-style: normal;
          }
        </style>
      </defs>
      <rect height="1920" width="1080" fill="${Colors.bg}"></rect>
      <text
        x="540"
        y="300"
        font-size="60"
        fill="${Colors.main}"
        text-anchor="middle"
      >
        Сможешь набрать больше?
      </text>
      <text
        x="540"
        y="500"
        font-size="60"
        fill="${Colors.main}"
        text-anchor="middle"
      >
        В жанре
      </text>
      <text
        x="540"
        y="600"
        font-size="100"
        fill="${Colors.main}"
        text-anchor="middle"
      >
        ${playlist}
      </text>
      
      <circle
        transform="rotate(-90)"
        r="${CHART_INNER_WIDTH * 0.4}"
        cx="${-CHART_OUTER_WIDTH / 2 - 700}"
        cy="${CHART_OUTER_WIDTH / 2}"
        stroke="${Colors.main}"
        opacity="0.2"
        stroke-width="${STROKE_WIDTH}"
      />
      <circle
        transform="rotate(-90)"
        stroke-dasharray="${circumferenceProgress}px ${CIRCUMFERENCE}px"
        stroke-width="${STROKE_WIDTH}"
        stroke="${Colors.accent}"
        r="${CHART_INNER_WIDTH * 0.4}"
        cx="${-CHART_OUTER_WIDTH / 2 - 700}"
        cy="${CHART_OUTER_WIDTH / 2}"
      />
      <line
        opacity="0.5"
        x1="385"
        y1="1448"
        x2="790"
        y2="1043"
        stroke="${Colors.main}"
        stroke-width="7"
      />
      <text
        x="428"
        y="1200"
        font-size="256"
        fill="${Colors.main}"
        text-anchor="middle"       
      >
        ${guess}
      </text>
      <text
        x="604"
        y="1408"
        font-size="160"
        fill="${Colors.main}"        
      >
        ${all}
      </text>
    </svg>`;

    return new Promise((resolve, reject) => {
      svg2img(svg, (error, buffer) => {
        if (error) {
          reject(error);
        }
        resolve(`data:image/png;base64,${buffer.toString('base64')}`);
      });
    });
  }
}
