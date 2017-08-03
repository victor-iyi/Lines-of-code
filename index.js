const fs = require('fs');
const path = require('path');

const projectDir = "/Users/victor/Documents/Devcrib/DigiSchools/desktop/digischools-desktop";

function counter(dir) {
  const files = retrieveAllFiles(dir);
  console.log(files);
  // call a function to recursively retrieve ALL files in the project { fs.readdir(path, [callback,]) }
  // loop through all files and read the contents
    // concatenate the contents of the files into one BIG string
  // split the BIG string by "\n" and store in an array
  // return the no of items in the array
}

function retrieveAllFiles(dir) {
  const files = [];
  // recursively get the file
  function _retrieveFiles() {
    //
  }

  function _listFilesAndDirs() {
    // list files and dirs in a given path
  }

  function _filterFiles() {
    // return only files if there's dir, enter the dir and retrieve the files
  }

  return files;
}

counter(projectDir);