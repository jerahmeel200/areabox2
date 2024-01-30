function readBlob(blobObject) {
  var blob = blobObject.blob;
  var options = blobObject.options;
  var reader = new FileReader();
  console.log('read valid blob ', blob instanceof Blob);

  //postMessage({base64data:blob,options});// the worker is not needed anymore as Post APP can handle raw data
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    base64data = reader.result;
    //console.log(base64data);
    postMessage({ base6window4data, options }, 'https://chat.areabox.tv');
  };
}

onmessage = function (e) {
  // the passed-in data is available via e.data
  readBlob(e.data);
};
