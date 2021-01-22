const fs = require('fs');
const registerNewCompanyFile = require('./registerNewCompanyFile');

afterAll(() => {
  fs.readdir(`${__dirname}/companyFiles`, (error, files) => {
    files.forEach((file) => {
      fs.unlink(`${__dirname}/companyFiles/${file}`, (err) => {
        if (err) { throw err; }
      });
    });
  });
});

test('Register a new company file without error', (done) => {
  function callback(err) {
    expect(err).toBe(null);
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
