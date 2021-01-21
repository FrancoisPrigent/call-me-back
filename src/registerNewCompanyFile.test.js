const registerNewCompanyFile = require('./registerNewCompanyFile');
const fs = require('fs');

afterAll(() => {
    fs.opendir(`${__dirname}/companyFiles`, async (error, dir) => {
        for await (dirent of dir) {
            fs.unlink(`${__dirname}/companyFiles/${dirent.name}`, (error) => {
                if (error) { throw error; }
            });
        };
    });
});

test('Register a new company file without error', done => {
    function callback(err, companyFileContent) {
        expect(err).toBe(null);
        done();
    };

    registerNewCompanyFile('Pixar', callback);
});

test('Register a new company file with good content', done => {
    function callback(err, companyFileContent) {
        const companyFileContentJSON = JSON.parse(companyFileContent);
        expect(companyFileContentJSON).toHaveProperty('companyName', 'NeXT');
        expect(companyFileContentJSON).toHaveProperty('companyFileCreationDate');
        expect(companyFileContentJSON).toHaveProperty('workers', []);
        done();
    }

    registerNewCompanyFile('NeXT', callback);
});
