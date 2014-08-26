var ignoreDirectories;
var workingDirectory; 


function isIgnoredDirectory(file) {
  return ignoreDirectories.indexOf(file) !== -1;
}

function isConfig(file) {
  return file.indexOf('.') === 0;
}

module.exports.setIgnoredDirectories = function(directories) {
  ignoreDirectories = directories;
};

module.exports.setWorkingDirectory = function(workingDir) {
  workingDirectory = workingDir;
};

module.exports.createFolderGlobs = function(fileTypePatterns) {
  fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
  var fs = require('fs');
  return fs.readdirSync(workingDirectory)
          .map(function(file){
            if (isIgnoredDirectory(file) || isConfig(file) || !fs.lstatSync(file).isDirectory()) {
              return null;
            } else {
              return fileTypePatterns.map(function(pattern) {
                return file + '/**/' + pattern;
              });
            }
          })
          .filter(function(patterns){
            return patterns;
          })
          .concat(fileTypePatterns);
};

