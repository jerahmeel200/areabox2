function tagResults(tag) {
  console.log('tagResults', tag);
  window.top.location = '?tag=' + tag;
}

function getComments(msg_key) {
  var tag = getCommentTag(msg_key);
  tagResults(tag);
}

function getCommentTag(msg_key) {
  return toValidTag(msg_key + '_commenttag');
}
function toValidTag(s) {
  var r = s.replace(/\W+/g, '_');
  return r;
}
