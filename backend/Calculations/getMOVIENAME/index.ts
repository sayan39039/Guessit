import https from "https";
import querystring from "querystring";
import {
  AVAILABILITY,
  CONTENT_KIND,
  HOSTNAME,
  MINIMUM_IMDB,
  NOCACHE,
  PATH,
  REGION,
  SPIN_COUNT,
} from "../../data/Constants";

const params = {
  availability: AVAILABILITY,
  content_kind: CONTENT_KIND,
  minimum_imdb: MINIMUM_IMDB,
  nocache: NOCACHE,
  region: REGION,
  spin_count: SPIN_COUNT,
};
const queryString = querystring.stringify(params);
const options = {
  hostname: HOSTNAME,
  path: `${PATH}?${queryString}`,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getMOVIENAME = (callback: Function) => {
  let data = "";
  const request = https.request(options, (response) => {
    response.setEncoding("utf8");
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", () => {
      const res = JSON.parse(data);
      callback(res);
    });
  });
  request.on("error", (error) => {
    console.log("An error", error);
  });
  request.end();
};
