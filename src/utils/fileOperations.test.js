const { createFile, writeFile } = require('./fileOperations');

test('Create a file', done => {
    createFile(`${__dirname}/../companyFiles/testCreateFile.json`, (err, fileDescriptior) => {
        expect(err).toBe(null);
        done();
    })
});

test('Create a file with a wrong path', done => {
    createFile(`${__dirname}/companyFiles/testCreateFile.json`, (err, fileDescriptior) => {
        expect(err).toBe('Failed to create file');
        done();
    });
});

test('Create a file which already exists', done => {
    createFile(`${__dirname}/../companyFiles/testCreateFile.json`, (err, fileDescriptior) => {
        expect(err).toBe('File already exists');
        done();
    })
});

test('Write in a file', done => {
    createFile(`${__dirname}/../companyFiles/testWriteFile.json`, (err, fileDescriptor) => {
        writeFile(fileDescriptor, 'content', function(err, content) {
            expect(err).toBe(null);
            expect(content).toBe('content');
            done();
        });
    })
});

test('Write in a file with a wrong file descriptor', done => {
    writeFile(11111, 'content', function(err, content) {
        expect(err).toBe('Failed to edit file content');
        done();
    });
});