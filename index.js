const registerNewCompanyFile = require('./src/registerNewCompanyFile');

registerNewCompanyFile(process.argv[2], (error, companyFileContent) => {
    if  (error) {
        console.log(`Error: ${error}`)
        return;
    }
    console.log(`Success: ${companyFileContent}`);
});
