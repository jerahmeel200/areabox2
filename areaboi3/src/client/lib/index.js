import { getFavIcon, linkPlayer } from './linkPlayersLib';
import formatTime from './formatTime';
import {
  isUriImage,
  isUriGif,
  isUriAudio,
  isUriVideo,
  isUriPdf
} from './isUrlMedia';
import { validateUser } from './userLib';
import { getUrlBits, wordTrim } from './linksLib';
import { getCommentTag, getTags, getTagsWithSymbAndSpace } from './tagsLib';

export {
  getFavIcon,
  linkPlayer,
  formatTime,
  isUriImage,
  isUriGif,
  isUriAudio,
  isUriVideo,
  isUriPdf,
  getCommentTag,
  getTags,
  getTagsWithSymbAndSpace,
  validateUser,
  getUrlBits,
  wordTrim
};
