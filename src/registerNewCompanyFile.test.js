const fs = require('fs');
const registerNewCompanyFile = require('../built/registerNewCompanyFile');

afterAll(() => {
  fs.readdir(`${process.env.FILEBASE_PATH}/companyFiles`, (readDirectoryError, files) => {
    files.forEach((file) => {
      fs.unlink(`${process.env.FILEBASE_PATH}/companyFiles/${file}`, (deleteFileError) => {
        if (deleteFileError) { throw deleteFileError; }
      });
    });
  });
});

test('Register a new company file without error', (done) => {
  function callback(error) {
    expect(error).toBe(null);
    done();
  }

  registerNewCompanyFile('Pixar', callback);
});

test('Register a new company file with good content', (done) => {
  function callback(err, companyFileContent) {
    const companyFileContentJSON = JSON.parse(companyFileContent);
    expect(companyFileContentJSON).toHaveProperty('companyName', 'NeXT');
    expect(companyFileContentJSON).toHaveProperty('companyFileCreationDate');
    expect(companyFileContentJSON).toHaveProperty('workers', []);
    done();
  }

  registerNewCompanyFile('NeXT', callback);
});

test('Register a company which already exists', (done) => {
  function callback(error) {
    expect(error).toBe('File already exists');
    done();
  }

  registerNewCompanyFile('NeXT', callback);
});
