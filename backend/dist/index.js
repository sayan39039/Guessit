"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Constants_1 = require("./data/Constants");
const getMOVIENAME_1 = require("./Calculations/getMOVIENAME");
const app = (0, express_1.default)();
const corsOpts = {
    origin: Constants_1.WHITELISTS,
};
app.get("/movie", require("cors")(corsOpts), (req, res) => {
    console.log(req.method, req.url);
    const Resp = (R) => {
        const genre_numbers = R.genres;
        const genre_list = genre_numbers
            .map((e) => Constants_1.MOVIE_GENRE_MAPPING[e.toString()])
            .filter((e) => e !== null || e !== undefined);
        res.send(Object.assign(Object.assign({}, R), { genres: [...genre_list] }));
    };
    (0, getMOVIENAME_1.getMOVIENAME)(Resp);
});
app.get("/", (req, res) => {
    res.send("Welcome, Child!");
});
app.listen(Constants_1.PORT, () => {
    console.log(`Party started at port ${Constants_1.PORT}`);
});
