const { httpFetch } = Host.getFunctions();

function run() {
  // Get the JSON input from the Host
  const input = Host.inputString();

  try {
    // Parse the JSON input to extract the API key and zip code
    const { apikey, zipcode } = JSON.parse(input);

    // Construct the URL for the API request
    const apiUrl = `https://api.zipcodestack.com/v1/search?codes=${zipcode}&apikey=${apikey}`;

    // Define the request object
    const request = {
      method: "GET",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    };

    // Make the HTTP request using Http.request
    const response = Http.request(request);
    // const response = httpFetch(request);

    // Check if the response status is not 200
    if (response.status !== 200) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      Host.outputString(errorMessage);
      throw new Error(errorMessage);
    }

    // Parse response JSON
    const data = JSON.parse(response.body);

    // Extract relevant information from the API response
    const results = data.results[zipcode];

    // Prepare the result object
    const result = {
      "query": {
        "codes": [zipcode],
        "country": null
      },
      "results": results
    };

    // Convert the result object to a JSON string and output
    const resultString = JSON.stringify(result);
    Host.outputString(resultString);
  } catch (error) {
    Host.outputString(`Error: ${error.message}`);
    throw error;
  }
}

module.exports = { run };