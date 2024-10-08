"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMOVIENAME = void 0;
const https_1 = __importDefault(require("https"));
const querystring_1 = __importDefault(require("querystring"));
const Constants_1 = require("../../data/Constants");
const params = {
    availability: Constants_1.AVAILABILITY,
    content_kind: Constants_1.CONTENT_KIND,
    minimum_imdb: Constants_1.MINIMUM_IMDB,
    nocache: Constants_1.NOCACHE,
    region: Constants_1.REGION,
    spin_count: Constants_1.SPIN_COUNT,
};
const queryString = querystring_1.default.stringify(params);
const options = {
    hostname: Constants_1.HOSTNAME,
    path: `${Constants_1.PATH}?${queryString}`,
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};
const getMOVIENAME = (callback) => {
    let data = "";
    const request = https_1.default.request(options, (response) => {
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const body = JSON.parse(data);
            callback(body);
        });
    });
    request.on("error", (error) => {
        console.log("An error", error);
    });
    request.end();
};
exports.getMOVIENAME = getMOVIENAME;
