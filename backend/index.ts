import express from "express";
import http from "http";
import { Server } from "socket.io";
import {
  APP_PORT,
  MOVIE_GENRE_MAPPING,
  SERVER_PORT,
  WHITELISTS,
} from "./data/Constants";
import { getMOVIENAME } from "./Calculations/getMOVIENAME";

const corsOptions = {
  origin: WHITELISTS,
};
const app = express();
const server = http.createServer(app);

let USER_ACTIONS: string[] = [];
let CONNECTED_SOCKETS: string[] = [];

const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  CONNECTED_SOCKETS.push(socket.id);
  socket.on("user-action", (message) => {
    USER_ACTIONS.push(message);
    io.emit("user-action-list", USER_ACTIONS);
  });
  socket.on("disconnect", () => {
    CONNECTED_SOCKETS = CONNECTED_SOCKETS.filter((e) => e !== socket.id);
    if (CONNECTED_SOCKETS.length === 0) USER_ACTIONS = [];
    console.log("User disconnected:", socket.id);
  });
});

app.get("/movie", require("cors")(corsOptions), (req, res) => {
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
app.get("/currentData", require("cors")(corsOptions), (req, res) => {
  console.log(req.method, req.url);
  res.send(USER_ACTIONS);
});
app.get("/cleanHouse", require("cors")(corsOptions), (req, res) => {
  console.log(req.method, req.url);
  USER_ACTIONS = [];
  res.send("SUCCESS");
});
app.get("/", (req, res) => {
  res.send("Welcome, Child!");
});

server.listen(SERVER_PORT, () => {
  console.warn(`After party started at port ${SERVER_PORT}`);
});
app.listen(APP_PORT, () => {
  console.warn(`Party started at port ${APP_PORT}`);
});
