const moment = require('moment');
const fileOperations = require('./utils/fileOperations');

function getCompanyFileBaseData(companyName) {
  return JSON.stringify({
    companyName,
    companyFileCreationDate: moment().unix(),
    workers: [],
  });
}

function saveCompanyBaseData(fileDescriptor, companyName, callback) {
  const companyFileBaseData = getCompanyFileBaseData(companyName);
  fileOperations.writeFile(fileDescriptor, companyFileBaseData, (error, fileContent) => {
    if (error) {
      callback(error);
      return;
    }
    fileOperations.closeFile(fileDescriptor);
    callback(null, fileContent);
  });
}

function buildCompanyFilePath(companyName) {
  return `${__dirname}/companyFiles/${companyName}.json`;
}

function createCompanyFile(companyName, callback) {
  const companyFilePath = buildCompanyFilePath(companyName);
  fileOperations.createFile(companyFilePath, callback);
}

function registerNewCompanyFile(companyName, responseCallback) {
  createCompanyFile(companyName, (error, fileDescriptor) => {
    if (error) {
      responseCallback(error);
      return;
    }
    saveCompanyBaseData(fileDescriptor, companyName, responseCallback);
  });
}

module.exports = registerNewCompanyFile;
