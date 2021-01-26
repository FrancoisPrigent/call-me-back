import fs from 'fs';

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

  fs.open(filePath, 'w', (error, fileDescriptor) => {
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
  fs.write(fileDescriptor, content, (error) => {
    if (error) {
      callback('Failed to edit file content', '');
      return;
    }
    callback(null, content);
  });
}

export function closeFile(fileDescriptor: number) {
  fs.close(fileDescriptor, (error) => {
    if (error) {
      console.log(`Failed to close the file: ${error}`);
    }
  });
}
