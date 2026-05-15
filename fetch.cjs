const fs = require('fs');
fetch('https://themesflat.co/html/ecomus/index.html')
  .then(r => r.text())
  .then(t => {
    fs.writeFileSync('ecomus.html', t);
    console.log('done');
  });
