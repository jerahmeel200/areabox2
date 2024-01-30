// get text from a posted link
function getUrlBits(url) {
  var s0 = url.indexOf('//');
  if (s0 < 0) s0 = 0;
  var bits = url.substring(s0);
  var q0 = bits.indexOf('?');
  if (q0 > 0) bits = bits.substring(0, q0);
  bits = bits.replace(/\%20/gim, ' ');
  bits = bits.replace(/www\./gim, '');
  bits = bits.replace(/\.com/gim, '');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/[^a-z0-9\/]+/gim, ' ');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/\/\//gim, ' ');
  bits = bits.replace(/\//gim, ' / ');
  return bits;
}

//http://stackoverflow.com/questions/5454235/javascript-shorten-string-without-cutting-words
function wordTrim(value, length, overflowSuffix) {
  if (value.length <= length) return value;
  var strAry = value.split(' ');
  var retLen = strAry[0].length;
  for (var i = 1; i < strAry.length; i++) {
    if (retLen == length || retLen + strAry[i].length + 1 > length) break;
    retLen += strAry[i].length + 1;
  }
  return strAry.slice(0, i).join(' ') + (overflowSuffix || '');
}

export { getUrlBits, wordTrim };
