const { httpFetch } = Host.getFunctions();

function run() {
  // Get the JSON input from the Host
  const input = Host.inputString();

  try {

    // Parse the JSON input
    const inputData = JSON.parse(input);

    // Check if required properties are present
    if (!inputData.hasOwnProperty('apikey') || !inputData.hasOwnProperty('zipcode')) {
      Host.outputString("API key and zip code are required.");
      throw new Error("API key and zip code are required.");
    }

    // Extract the API key, zip code, and optional country
    const { apikey, zipcode, country } = inputData;

    // Validate apikey and zipcode
    if (!apikey || !zipcode) {
      Host.outputString("API key and zip code are required.");
      throw new Error("API key and zip code are required.");
      
    }

    // Validate zipcode is a number
    if (isNaN(zipcode)) {
      Host.outputString('Error: Zip code must be a number.');
      throw new Error("Zip code must be a number.");
     
    }

      // Validate country format if provided
      if (country && (typeof country !== 'string' || country.length !== 2)) {
        Host.outputString('Error: Country code must be a string with exactly two characters.');
        throw new Error("Country code must be a string with exactly two characters.");

      }

    // Construct the URL for the API request
    let apiUrl = `https://api.zipcodestack.com/v1/search?codes=${zipcode}&apikey=${apikey}`;

   

    // Add country to the URL if provided
    if (country) {
      apiUrl += `&country=${country}`;
    }

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

    // Check if the response status is not 200
    if (response.status !== 200) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      Host.outputString(errorMessage);
      throw new Error(errorMessage);
    }


    

    // Parse response JSON
    const data = JSON.parse(response.body);

    // Check if the response contains an error
    if (data && data.error) {
      const errorMessage = data.error;
      Host.outputString(errorMessage);
      throw new Error(errorMessage);
    }

    // Check if the response contains unexpected data
    if (!data || !data.results || !data.results[zipcode]) {
      const errorMessage = "Unexpected response from the API.";
       Host.outputString(errorMessage);
      throw new Error(errorMessage);
    }

    // Extract relevant information from the API response
    const results = data.results[zipcode];

    // Prepare the result object
    const result = {
      "query": {
        "codes": [zipcode],
        "country": country || null // Set country to null if not provided
      },
      "results": results
    };

    // Convert the result object to a JSON string and output
    const resultString = JSON.stringify(result);
    Host.outputString(resultString);
  } catch (error) {
    if(error.message === "API key and zip code are required.") {
      Host.outputString(error.message);
    }
    if(error.message === "Zip code must be a number.") {
      Host.outputString(error.message);
    }
    if(error.message === "Country code must be a string with exactly two characters.") {
      Host.outputString(error.message);
    }
    if(error.message === "Unexpected response from the API.") {
      Host.outputString(error.message);
    }

    // if(error.message === "Error: cannot read property 'undefined' of undefined") {
      Host.outputString("Error: Invalid Input. Please check your input and try again.");
    // }
   
    // Host.outputString(`Error: ${error.message}`);
    // throw error;
  }
}

module.exports = { run };