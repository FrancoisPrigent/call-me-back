const fs = require('fs');

export type callbackError = null|string;

function isFileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export interface createFileCallback {
  (error: callbackError, fileDescriptor: number): void;
}
export function createFile(filePath: string, callback: createFileCallback): void {
  if (isFileExists(filePath)) {
    callback('File already exists', 0);
    return;
  }

  // add ts definition file for lib like fs wich doesn't use ts.
  fs.open(filePath, 'w', (error: callbackError, fileDescriptor: number): any => {
    if (error) {
      callback('Failed to create file', fileDescriptor);
      return;
    }
    callback(null, fileDescriptor);
  });
}

export interface writeFileCallback {
  (error: callbackError, fileContent: string): void
}
export function writeFile(fileDescriptor: number, content: string, callback: writeFileCallback) {
  fs.write(fileDescriptor, content, (error: callbackError) => {
    if (error) {
      callback('Failed to edit file content', '');
      return;
    }
    callback(null, content);
  });
}

export function closeFile(fileDescriptor: number) {
  fs.close(fileDescriptor, (error: callbackError): void => {
    if (error) {
      console.log(`Failed to close the file: ${error}`);
    }
  });
}
