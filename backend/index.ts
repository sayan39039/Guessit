import express from "express";
import { MOVIE_GENRE_MAPPING, PORT, WHITELISTS } from "./data/Constants";
import { getMOVIENAME } from "./Calculations/getMOVIENAME";

const app = express();

const corsOpts = {
  origin: WHITELISTS,
};

app.get("/movie", require("cors")(corsOpts), (req, res) => {
  console.log(req.method, req.url);
  const Resp = (R: any) => {
    const genre_numbers = R.genres;
    const genre_list = genre_numbers
      .map((e: number | string) => MOVIE_GENRE_MAPPING[e.toString()])
      .filter((e: string) => e !== null || e !== undefined);
    res.send({ ...R, genres: [...genre_list] });
  };
  getMOVIENAME(Resp);
});

app.get("/", (req, res) => {
  res.send("Welcome, Child!");
});

app.listen(PORT, () => {
  console.log(`Party started at port ${PORT}`);
});
