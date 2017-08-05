const path = require('path'),
  fs = require('fs');

const projectDir = '/Users/victor/Documents/Devcrib/DigiSchools/desktop/digischools-desktop';
const ignored_files = ['package-lock.json',
    'font-awesome.min.js', 'font-awesome.css', 'font-awesome.min.css', 'fontawesome.min.css',
    'bootstrap-grid.min.css', 'bootstrap.css', 'bootstrap.min.css', 'bootstrap.min.js',
    'owl.carousel.min.js', 'owl.carousel.min.css', 'owl.theme.default.min.css',
    'jquery.min.js', 'jquery-1.10.2.js', 'jquery_upload.min.js',
    'datatables.min.js', 'dataTables', 'datatables.min.css', 'dropzone.js', 'dropzone.css',
    'pretty.min.css', 'wow.min.js', 'tether.min.js', 'normalize.css',
  ],
  ignored_folders = [
    'node_modules', 'uploads', 'fonts', 'dataTables', 'ext'
  ],
  ignored_extensions = [
    'pdf', 'txt', 'md', 'gif', 'jpg', 'png', 'jpeg', 'ttf'
  ];

const projectFiles = [], // Contains every files in the project.
  projectDirs = []; // Contains every directories in the project.

let linesOfCode = 0,
  prevCount = 0,
  currentCount = 0;

/**
 * Counts how many lines of code are there.
 * And adds it to the linesOfCode variable.
 * @param {path} file 
 */
function countLines() {
  projectFiles.forEach(function (file) {
    const data = fs.readFileSync(file, 'utf8');
    linesOfCode += data.split('\n').length;
  });
}

/**
 * Gets the extension of a file
 * @param {string} file 
 */
function extension(file) {
  return path.extname(file).substr(1)
}

/**
 * Checks if an item is not in an array
 * @param {*} item 
 * @param {array} arr 
 */
function notInArr(item, arr) {
  return arr.filter(a => a === item).length === 0;
}

/**
 * Determines if a path is a file or directory
 * @param {string} path 
 */
function isDir(path) {
  return fs.existsSync(path) ? fs.statSync(path).isDirectory() : false;
}

/**
 * Adds file to files or projectDirs as appropriate.
 * @param {path} file 
 */
function addFile(file) {
  if (isDir(file)) {
    if (notInArr(file, projectDirs))
      projectDirs.push(file);
  } else
  if (notInArr(file, projectFiles)) // if file not in files
    projectFiles.push(file);
}

/**
 * Get the list of files in a directory except . files (e.g .git, .gitignore, etc)
 * @param {string} dir 
 */
function getFiles(dir) {
  prevCount = currentCount;
  files = fs.readdirSync(dir);
  filtered_list = files.filter(f => {
    if (notInArr(extension(f), ignored_extensions) &&
      notInArr(f, ignored_folders) && notInArr(f, ignored_files) &&
      f[0] !== '.' /* Not a dot file*/ ) return f;
  });
  // loop through the filtered list and add files
  filtered_list.forEach(function (element) {
    addFile(path.join(dir, element));
  });
  currentCount = projectDirs.length; // set current dir count to projectDirs.length
}

/**
 * Starting point.
 * @param {string} projectDir 
 */
function start(projectDir) {
  do {
    getFiles(projectDir);
    projectDirs.forEach(dir => {
      getFiles(dir);
    });
  } while (prevCount !== currentCount || currentCount === 0);

  countLines(); // counts the lines of codes after retriving all files
  /**
   * Log results
   */
  console.log('====================================');
  console.log('Project Files:\t\t\t\t\t', projectFiles.length);
  console.log('Project Directories:\t\t', projectDirs.length);
  console.log('Project Lines of codes:\t', linesOfCode);
  console.log('====================================');
}

start(projectDir);

// console.log('====================================');
// console.log(projectDirs);
// console.log('====================================');