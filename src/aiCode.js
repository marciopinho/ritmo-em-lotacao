import https from 'https';
import fs from 'fs';


// Define the function
function makeGetRequest() {
  // Set the URL to send the GET request to
  const url = 'https://temporeal.pbh.gov.br?param=D';

  // Make the GET request to the specified URL
  https.get(url, (res) => {
    let data = ''; // Create an empty string to store the response

    // As the response comes in, append it to the 'data' string
    res.on('data', (chunk) => {
      data += chunk;
    });

    // When the response is complete, write it to a file
    res.on('end', () => {
      fs.writeFile('response.txt', data, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Response saved to response.txt');
        }
      });
    });
  });
}

// Call the function every 30 seconds
setInterval(makeGetRequest, 30000);
// This function makes a GET request to the specified URL, appends the response to a string, and then writes the string to a file named response.txt. It then calls itself again every 30 seconds using the setInterval() method.

// Note that this function uses the https module, which is part of the Node.js core. To use this function in your code, you will need to have Node.js installed. You can learn more about how to install Node.js and use it to run JavaScript code on the official Node.js website.



