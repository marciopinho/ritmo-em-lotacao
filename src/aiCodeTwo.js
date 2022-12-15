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

    // When the response is complete, transform the array of objects
    // and save the desired properties to a file
    res.on('end', () => {
      // Parse the JSON string into an array of objects
      const responseData = JSON.parse(data);

      // Use the 'Array.map()' method to transform the array of objects
      // into an array of objects that only contain the desired properties
      const filteredData = responseData.map((item) => {
        // Return a new object with only the desired properties
        return {
          HR: item.HR,
          NL: item.NL,
          LG: item.LG,
          LT: item.LT,
        };
      });

      // Write the filtered data to a file
      fs.writeFile('response.txt', JSON.stringify(filteredData), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Response saved to response.txt');
        }
      });
    });
  });
}

// setInterval(makeGetRequest, 30000);
makeGetRequest();