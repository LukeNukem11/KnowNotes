// Import required modules
const fs = require('fs');
const util = require('util');

// Promisify fs.readFile for promise-based file reading
const readFileAsync = util.promisify(fs.readFile);

// Function to write content to a file
const writeFileAsync = (filePath, content) => {
  // Convert JSON into a string with indentation of 2 spaces
  fs.writeFile(filePath, JSON.stringify(content, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File written successfully!');
    }
  });
};

// Function to read a file, parse the data, add content, and write it back to the file
const readAndAddData = (content, filePath) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Parse the data into a valid JSON object
      const parsedData = JSON.parse(data);

      parsedData.push(content);

      // Write the updated object back to the file
      writeFileAsync(filePath, parsedData);
    }
  });
};

// Export the functions
module.exports = { readFileAsync, writeFileAsync, readAndAddData };

