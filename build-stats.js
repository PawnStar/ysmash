var seasons = require('./seasonConfig.json');
var parseCSV = require('./functions/parseCSV.js');
var makePost = require('./functions/makePost.js');
var fs = require('fs');
var path = require('path');

// This is black magic
var data = seasons.map(parseCSV);

// Save stats.json for site
fs.writeFileSync(path.join(__dirname, 'docs/stats.json'), JSON.stringify({seasons:data}));

// Make post.md for most recent seaon
var post = makePost(data[0]);
fs.writeFileSync(path.join(__dirname, 'docs/post.md'), post);
fs.writeFileSync(path.join(__dirname, 'docs/stats.csv'), data[0].ranks)
