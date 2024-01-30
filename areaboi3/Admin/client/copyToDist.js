const ncp = require('ncp').ncp;

ncp.limit = 16;

const srcPath = './build';
const destPath = '../../dist/build';

console.log('Copying files...');
ncp(srcPath, destPath, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Copying files complete.');
});
