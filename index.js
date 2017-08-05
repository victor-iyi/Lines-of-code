const path = require('path'),
  fs = require('fs');

const ignored_files = ['package-lock.json', 'font-awesome.min.js', 'font-awesome.css',
    'bootstrap-grid.min.css', 'bootstrap.css', 'bootstrap.min.css', 'dropzone.css',
    'owl.carousel.min.js', 'jquery.min.js', 'jquery-1.10.2.js', 'owl.carousel.min.css',
    'owl.theme.default.min.css', 'owl.video.play.png', 'pretty.min.css',
    'jquery_upload.min.js', 'datatables.min.js', 'dataTables', 'datatables.min.css',
    'bootstrap.min.js', 'dropzone.js', 'tether.min.js', 'wow.min.js', 'font-awesome.min.css',
  ],
  ignored_folders = [
    'node_modules', 'uploads', 'fonts', 'dataTables'
  ],
  ignored_extensions = [
    'pdf', 'txt', 'md', 'ini', 'gif', 'jpg', 'png', 'jpeg', 'ttf'
  ],
  allowed_extensions = [
    'html', 'css', 'js', 'php', 'scss',
  ];

let linesOfCode = 0;
const directories = [],
  files = []
let listedFilesDir = [];

/**
 * Gets the extension of a file
 * @param {string} file 
 */
function extension(file) {
  return path.extname(file).substr(1)
}

/**
 * Adds file to files or directories as appropriate.
 * @param {path} file 
 */
function addFile(file) {

  fs.stat(file, function (err, stat) {
    if (err) return console.error(err.message);
    if (stat.isFile()) {
      if (files.filter(f => f === file).length === 0) // if file not in files
        files.push(file);
    } else
      directories.push(file);
  });
  
}

/**
 * Counts how many lines of code are there.
 * And adds it to the linesOfCode variable.
 * @param {path} file 
 */
function countLines(file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) return console.error('Error: ', err);
    linesOfCode += data.split('\n').length;
  });
}

function getFiles(dir) {
  fs.readdir(dir, function (err, files) {
    if (err) return console.log('ERROR geting files', err);
    files = files.filter(f => {
      if (f[0] !== '.') return f
    });
    for (let file in files) {
      addFile(files[file]);
    }
  });
}

getFiles('./');