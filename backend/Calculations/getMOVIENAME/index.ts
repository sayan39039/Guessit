import https from "https";
import querystring from "querystring";
import {
  AVAILABILITY,
  CONTENT_KIND,
  HOSTNAME,
  MINIMUM_IMDB,
  MINIMUM_SCORE,
  NOCACHE,
  PATH,
  REGION,
  SPIN_COUNT,
} from "../../data/Constants";

// Define the parameters for the query
const params = {
  availability: AVAILABILITY,
  content_kind: CONTENT_KIND,
  minimum_imdb: MINIMUM_IMDB,
  nocache: NOCACHE,
  region: REGION,
  spin_count: SPIN_COUNT,
  minimum_rg: MINIMUM_SCORE,
};

// Convert the parameters to a query string
const queryString = querystring.stringify(params);

// Define the options for the HTTPS request
const options = {
  hostname: HOSTNAME,
  path: `${PATH}?${queryString}`,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// Function to get the movie name
export const getMOVIENAME = (callback: Function) => {
  let data = "";
  // Make the HTTPS request
  const request = https.request(options, (response) => {
    response.setEncoding("utf8");
    // Collect the data chunks
    response.on("data", (chunk) => {
      data += chunk;
    });
    // Parse and handle the response when it ends
    response.on("end", () => {
      const res = JSON.parse(data);
      console.table(params);
      callback(res);
    });
  });
  request.on("error", (error) => {
    console.log("An error", error);
  });
  request.end();
};
