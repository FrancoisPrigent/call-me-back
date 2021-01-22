const fs = require('fs');

function isFileExists(filePath) {
  return fs.existsSync(filePath);
}

function createFile(filePath, callback) {
  if (isFileExists(filePath)) {
    callback('File already exists');
    return;
  }

  fs.open(filePath, 'w', (error, fileDescriptor) => {
    if (error) {
      callback('Failed to create file');
      return;
    }
    callback(null, fileDescriptor);
  });
}

function writeFile(fileDescriptor, content, callback) {
  fs.write(fileDescriptor, content, (error) => {
    if (error) {
      callback('Failed to edit file content');
      return;
    }
    callback(null, content);
  });
}

function closeFile(fileDescriptor) {
  fs.close(fileDescriptor, (error) => {
    if (error) {
      console.log(`Failed to close the file: ${error}`);
    }
  });
}

module.exports = { createFile, writeFile, closeFile };
