var seasons = require('./seasonConfig.json');
var parseCSV = require('./functions/parseCSV.js');
var fs = require('fs');
var path = require('path');

var data = seasons.map(parseCSV);

fs.writeFileSync(path.join(__dirname, 'docs/stats.json'), JSON.stringify({seasons:data}));
