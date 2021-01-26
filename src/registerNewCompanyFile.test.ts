import fs from 'fs';
import registerNewCompanyFile, { CompanyBaseData } from './registerNewCompanyFile';

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
  registerNewCompanyFile('Pixar', (error, companyFileContent) => {
    expect(error).toBe(null);
    done();
  });
});

test('Register a new company file with good content', (done) => {
  registerNewCompanyFile('NeXT', (error, companyFileContent) => {
    expect(companyFileContent).toHaveProperty('companyName', 'NeXT');
    expect(companyFileContent).toHaveProperty('companyFileCreationDate');
    expect(companyFileContent).toHaveProperty('workers', []);
    done();
  });
});

test('Register a company which already exists', (done) => {
  registerNewCompanyFile('NeXT', (error, companyFileContent) => {
    expect(error).toBe('File already exists');
    done();
  });
});
