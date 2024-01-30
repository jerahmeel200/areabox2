// get words from a post including links and hypertex
function getWordBits(msg) {
  var txt = msg.text;
  if (msg.html && msg.html.indexOf) txt = msg.html;

  if (typeof txt != 'string') {
    doPrint = true;
    console.log('problem with msg ', msg.text, txt);
    txt = msg.text;
    if (typeof txt != 'string')
      // tipicaly is a areabus array result
      txt = JSON.stringify(txt);
  }

  var bits = txt;
  bits = bits.replace(/google.com/gi, ' ');
  bits = bits.replace(/youtube.com\/watch/gi, ' ');
  bits = bits.replace(/youtube.com\/embed/gi, ' ');
  bits = bits.replace(/giphy.com\/embed/gi, ' ');
  bits = bits.replace(/[a-zA-Z]+=+"[a-zA-Z0-9:;\.\s\(\)\-\,]+"/gi, ' ');
  bits = bits.replace(/[a-zA-Z]+=+'[a-zA-Z0-9:;\.\s\(\)\-\,]+'/gi, ' ');
  bits = bits.replace(/iframe/gi, ' ');
  bits = bits.replace(/allowFullScreen/gi, ' ');
  bits = bits.replace(/onclick/gi, ' ');
  bits = bits.replace(/quot/gi, ' ');
  bits = bits.replace(/jpg/gi, ' ');
  bits = bits.replace(/png/gi, ' ');
  bits = bits.replace(/tagResults/gi, ' ');
  bits = bits.replace(/https/gi, ' ');
  bits = bits.replace(/amp/gi, ' ');
  bits = bits.replace(/html/gi, ' ');
  bits = bits.replace(/\<br\>/gi, ' ');
  bits = bits.replace(/http/gi, ' ');
  bits = bits.replace(/href/gi, ' ');
  bits = bits.replace(/img/gi, ' ');
  bits = bits.replace(/src/gi, ' ');
  bits = bits.replace(/favicons\?domain/gi, ' ');
  bits = bits.replace(/span/gi, ' ');
  bits = bits.replace(/div/gi, ' ');
  bits = bits.replace(/[a-zA-Z_]+=[a-zA-Z_0-9\%]+/gi, ' ');
  bits = bits.replace(/[a-zA-Z_]+="[a-zA-Z_0-9\%]+"/gi, ' ');

  bits = bits.replace(/\%20/gim, ' ');
  bits = bits.replace(/\%2F/gim, ' ');
  bits = bits.replace(/www\./gim, '');
  bits = bits.replace(/\.com/gim, '');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/[^a-z0-9\/]+/gim, ' ');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/\/\//gim, ' ');
  bits = bits.replace(/\//gim, ' ');
  bits = bits.replace(/\s+/gim, ' ');

  //https://stackoverflow.com/questions/41588708/regex-match-any-word-with-numbers
  bits = bits.replace(/\S*\d+\S*/gi, ' ');

  return bits;
}

export { getWordBits };
