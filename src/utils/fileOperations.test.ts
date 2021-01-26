import { createFile, writeFile } from './fileOperations';
import fs from 'fs';

afterAll(() => {
  fs.readdir(`${__dirname}/../companyFiles`, (readDirectoryError, files) => {
    files.forEach((file) => {
      fs.unlink(`${__dirname}/../companyFiles/${file}`, (deleteFileError) => {
        if (deleteFileError) { throw deleteFileError; }
      });
    });
  });
});

test('Create a file', (done) => {
  createFile(`${__dirname}/../companyFiles/testCreateFile.json`, (error) => {
    expect(error).toBe(null);
    done();
  });
});

test('Create a file with a wrong path', (done) => {
  createFile(`${__dirname}/companyFiles/testCreateFile.json`, (error) => {
    expect(error).toBe('Failed to create file');
    done();
  });
});

test('Create a file which already exists', (done) => {
  createFile(`${__dirname}/../companyFiles/testCreateFile.json`, (error) => {
    expect(error).toBe('File already exists');
    done();
  });
});

test('Write in a file', (done) => {
  createFile(`${__dirname}/../companyFiles/testWriteFile.json`, (createFileError, fileDescriptor) => {
    writeFile(fileDescriptor, 'content', (writeFileError, content) => {
      expect(writeFileError).toBe(null);
      expect(content).toBe('content');
      done();
    });
  });
});

test('Write in a file with a wrong file descriptor', (done) => {
  writeFile(11111, 'content', (error) => {
    expect(error).toBe('Failed to edit file content');
    done();
  });
});
