const fs = require('fs');
const registerNewCompanyFile = require('./registerNewCompanyFile');

afterAll(() => {
  fs.readdir(`${__dirname}/companyFiles`, (readDirectoryError, files) => {
    files.forEach((file) => {
      fs.unlink(`${__dirname}/companyFiles/${file}`, (deleteFileError) => {
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
