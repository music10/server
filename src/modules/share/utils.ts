// import { fabric } from 'fabric';
//
// const _wrapLine = function (_line, lineIndex, desiredWidth, reservedSpace) {
//   const splitByGrapheme = this.splitByGrapheme;
//   const graphemeLines = [];
//   const infix = splitByGrapheme ? '' : ' ';
//   const additionalSpace = splitByGrapheme ? 0 : this._getWidthOfCharSpacing();
//   const words = splitByGrapheme
//     ? fabric.util.string.graphemeSplit(_line)
//     : _line.split(this._wordJoiners);
//   let line = [];
//   let word: string | string[] = '';
//   let lineWidth = 0;
//   let offset = 0;
//   let wordWidth = 0;
//   let infixWidth = 0;
//   let largestWordWidth = 0;
//   let lineJustStarted = true;
//   let i;
//
//   reservedSpace = reservedSpace || 0;
//   desiredWidth -= reservedSpace;
//
//   for (i = 0; i < words.length; i++) {
//     // i would avoid resplitting the graphemes
//     word = fabric.util.string.graphemeSplit(words[i]);
//     wordWidth = this._measureWord(word, lineIndex, offset);
//     offset += word.length;
//
//     // Break the line if a word is wider than the set width
//     if (this.breakWords && wordWidth >= desiredWidth) {
//       if (!lineJustStarted) {
//         line.push(infix);
//         lineJustStarted = true;
//       }
//
//       // Loop through each character in word
//       for (let w = 0; w < word.length; w++) {
//         const letter = word[w];
//         const letterWidth =
//           (this.getMeasuringContext().measureText(letter).width *
//             this.fontSize) /
//           this.CACHE_FONT_SIZE;
//         if (lineWidth + letterWidth > desiredWidth) {
//           graphemeLines.push(line);
//           line = [];
//           lineWidth = 0;
//         } else {
//           line.push(letter);
//           lineWidth += letterWidth;
//         }
//       }
//       word = [];
//     } else {
//       lineWidth += infixWidth + wordWidth - additionalSpace;
//     }
//
//     if (lineWidth >= desiredWidth && !lineJustStarted) {
//       graphemeLines.push(line);
//       line = [];
//       lineWidth = wordWidth;
//       lineJustStarted = true;
//     } else {
//       lineWidth += additionalSpace;
//     }
//
//     if (!lineJustStarted) {
//       line.push(infix);
//     }
//     line = line.concat(word);
//
//     infixWidth = this._measureWord([infix], lineIndex, offset);
//     offset++;
//     lineJustStarted = false;
//     // keep track of largest word
//     if (wordWidth > largestWordWidth && !this.breakWords) {
//       largestWordWidth = wordWidth;
//     }
//   }
//   i && graphemeLines.push(line);
//
//   if (largestWordWidth + reservedSpace > this.dynamicMinWidth) {
//     this.dynamicMinWidth = largestWordWidth - additionalSpace + reservedSpace;
//   }
//
//   return graphemeLines.slice(0, 3);
// };
//
// fabric.util.object.extend(fabric.Textbox.prototype, {
//   _wrapLine: _wrapLine,
// });
//
// export { fabric };
