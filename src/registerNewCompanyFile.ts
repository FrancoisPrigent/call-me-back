import { 
  callbackError,
  createFileCallback,
  createFile,
  writeFile,
  closeFile
} from './utils/fileOperations';
const moment = require('moment');

export interface CompanyBaseData {
  companyName: string,
  companyFileCreationDate: number,
  workers: string[]
};

function getCompanyFileBaseData(companyName: string): CompanyBaseData  {
  return {
    companyName,
    companyFileCreationDate: moment().unix(),
    workers: [],
  };
}

function saveCompanyBaseData(fileDescriptor: number, companyName: string, callback: companyFileCreationCallback) {
  const companyFileBaseData = getCompanyFileBaseData(companyName);
  writeFile(fileDescriptor, JSON.stringify(companyFileBaseData), (error: callbackError, fileContent: string): void => {
    if (error) {
      callback(error);
      return;
    }
    closeFile(fileDescriptor);
    callback(null, companyFileBaseData);
  });
}

function buildCompanyFilePath(companyName: string): string {
  return `${__dirname}/companyFiles/${companyName}.json`;
}

function createCompanyFile(companyName: string, callback: createFileCallback): void {
  const companyFilePath = buildCompanyFilePath(companyName);
  createFile(companyFilePath, callback);
}

export interface companyFileCreationCallback {
  (error: string|null, companyFileContent?: CompanyBaseData): void
}
function registerNewCompanyFile(companyName: string, callback: companyFileCreationCallback) {
  createCompanyFile(companyName, (error: callbackError, fileDescriptor: number): void => {
    if (error) {
      callback(error);
      return;
    }
    saveCompanyBaseData(fileDescriptor, companyName, callback);
  });
}

module.exports = registerNewCompanyFile;
