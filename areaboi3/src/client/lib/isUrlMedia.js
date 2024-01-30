// ref: https://stackoverflow.com/questions/19395458/check-if-a-link-is-an-image
const isUriImage = (uri) => {
  //make sure we remove any nasty GET params
  uri = uri.split('?')[0];
  //moving on, split the uri into parts that had dots before them
  const parts = uri.split('.');
  //get extension
  const extension = parts[parts.length - 1];
  const imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'bmp', 'webp', 'svg'];
  //check if the extension matches anything in the list.
  if (imageTypes.indexOf(extension) !== -1) {
    return true;
  }
  return false;
};

const isUriGif = (uri) => {
  uri = uri.split('?')[0];
  const parts = uri.split('.');
  const extension = parts[parts.length - 1];
  const imageTypes = ['gif'];
  if (imageTypes.indexOf(extension) !== -1) {
    return true;
  }
  return false;
};

const isUriVideo = (uri) => {
  uri = uri.split('?')[0];
  const parts = uri.split('.');
  const extension = parts[parts.length - 1];
  const videoTypes = ['mp4', 'ogv', 'webm', '3gp', 'flv'];
  if (videoTypes.indexOf(extension) !== -1) {
    return true;
  }
  return false;
};

const isUriAudio = (uri) => {
  uri = uri.split('?')[0];
  const parts = uri.split('.');
  const extension = parts[parts.length - 1];
  const audioTypes = ['mp3', 'ogg', 'wav', 'mpga'];
  if (audioTypes.indexOf(extension) !== -1) {
    return true;
  }
  return false;
};

const isUriPdf = (uri) => {
  uri = uri.split('?')[0];
  const parts = uri.split('.');
  const extension = parts[parts.length - 1];
  const mediaType = ['pdf'];
  if (mediaType.indexOf(extension) !== -1) {
    return true;
  }
  return false;
};

export { isUriImage, isUriGif, isUriVideo, isUriAudio, isUriPdf };
