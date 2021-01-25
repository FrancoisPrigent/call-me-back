import { callbackError } from './src/utils/fileOperations';
import { CompanyBaseData } from './src/registerNewCompanyFile';

const registerNewCompanyFile = require('./src/registerNewCompanyFile');

registerNewCompanyFile(process.argv[2], (error: callbackError, companyFileContent?: CompanyBaseData): void => {
  if (error) {
    console.log(`Error: ${error}`);
    return;
  }
  console.log(`Success: ${companyFileContent}`);
});