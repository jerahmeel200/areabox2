const re = /\s#[\w]+(?=\s|$)/g;

function getTags(text) {
  const message = ' ' + text;
  const tags = message.match(re);
  const res = [];
  for (var i in tags) {
    res.push(tags[i].trim().substring(1));
  }
  return res;
}

function getTagsWithSymbAndSpace(text) {
  var message = ' ' + text;
  return message.match(re);
}

function getCommentTag(msg_key) {
  return '#' + toValidTag(msg_key + '_commenttag');
}
function toValidTag(s) {
  var r = s.replace(/\W+/g, '_');
  return r;
}

export { getTags, getTagsWithSymbAndSpace, getCommentTag };
