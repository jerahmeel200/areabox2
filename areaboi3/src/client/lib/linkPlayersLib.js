import { getUrlBits } from './linksLib';

function linkPlayer(post, opts) {
  if (!post.link) return null;
  let link = post.link;

  if (!opts) opts = {};
  if (
    link.indexOf('.mp4') > 0 ||
    link.indexOf('.ogv') > 0 ||
    link.indexOf('.webm') > 0 ||
    link.indexOf('.3gp') > 0 ||
    link.indexOf('.flv') > 0
  ) {
    return (
      <video className="weblink markup-media" controls>
        <source src={link} />
      </video>
    );
  } else if (
    link.indexOf('.mp3') > 0 ||
    link.indexOf('.ogg') > 0 ||
    link.indexOf('.wav') > 0 ||
    link.indexOf('.mpga') > 0
  ) {
    return (
      <audio className="weblink" controls>
        <source src={link} />
      </audio>
    );
  } else if (link.indexOf('youtu.be') >= 0) {
    // only youtube video shares
    var videoId = getYoutubeId(link);
    return (
      <iframe
        width="100%"
        height={opts.fullScreen ? '100%' : '350pt'}
        src={`//www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen></iframe>
    );
  } else if (!(post.tit || post.title)) {
    let title = getUrlBits(link);
    return (
      <a className="weblink" href={link}>
        {title}
      </a>
    );
  } else return null;
}

function getYoutubeId(url) {
  var regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return 'error';
  }
}

function getFavIcon(post) {
  if (!post.link) return null;
  let enc = encodeURIComponent(post.link);
  return (
    <img
      className="favicon"
      src={`//www.google.com/s2/favicons?domain=${enc}`}
    />
  );
}

export { linkPlayer, getFavIcon };
