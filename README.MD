# ZipCodeStack API Integration

## Overview
This code snippet demonstrates how to integrate the ZipCodeStack API into your  application to retrieve location information based on a provided ZIP code. The ZipCodeStack API provides accurate and up-to-date data for 210+ locations worldwide.
This generates a WASM plugin using [exitism] (https://github.com/extism/extism).

## Prerequisites
Before running this code, you'll need to obtain an API key from ZipCodeStack. You can register for a free API key [here](https://app.zipcodestack.com/register). The free plan includes 10,000 requests per month.

## Parameters
``` json
 { "apikey": "myapikey", "zipcode": "33162" }
 ```

or use with optional country
``` json
 { "apikey": "myapikey", "zipcode": "33162", "country": "us" }
 ```

## BUILD
``` javascipt
extism-js plugin.js -i  -o plugin.wasm
```

## Test with CLI
``` javascript
extism call plugin.wasm run --input '{ "apikey": "myapikey", "zipcode": "33162" }' --wasi --allow-host '*'

```