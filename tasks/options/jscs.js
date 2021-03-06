
var path = require('path');
var root = path.dirname(path.dirname(__dirname));

var files = [];
files.push.apply(files, require('./files').scripts);

// skip validation of some external code
files.push(['!**/google-tracking.js']);
files.push(['!**/piwik-tracking.js']);

module.exports = {
    options: {config: path.join(root, '.jscs.json')},
    all: {src: files},
    docs: {src: ['<%= appDir %>/docs/**/*.js']}
};
