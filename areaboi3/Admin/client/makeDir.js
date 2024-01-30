const makeDir = require('make-dir');

(async () => {
  const path = await makeDir('../../dist/build');

  console.log(path);
})();
