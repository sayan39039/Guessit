"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOVIE_GENRE_MAPPING = exports.PATH = exports.HOSTNAME = exports.SPIN_COUNT = exports.REGION = exports.NOCACHE = exports.MINIMUM_IMDB = exports.CONTENT_KIND = exports.AVAILABILITY = exports.WHITELISTS = exports.PORT = void 0;
exports.PORT = 6090;
exports.WHITELISTS = [
    "http://localhost:9000",
    "https://sayan39039.github.io",
];
exports.AVAILABILITY = "onAnySource";
exports.CONTENT_KIND = "movie";
exports.MINIMUM_IMDB = "7";
exports.NOCACHE = "true";
exports.REGION = "us";
exports.SPIN_COUNT = "4";
exports.HOSTNAME = "api.reelgood.com";
exports.PATH = "/v3.0/content/random";
exports.MOVIE_GENRE_MAPPING = {
    "3": "Drama",
    "4": "Romance",
    "5": "Action & Adventure",
    "6": "Animation",
    "7": "Biography",
    "8": "Children",
    "9": "Comedy",
    "10": "Crime",
    "11": "Documentary",
    "12": "Family",
    "13": "Fantasy",
    "15": "Food",
    "16": "Game Show",
    "17": "History",
    "18": "Home & Garden",
    "19": "Horror",
    "22": "Musical",
    "25": "Reality",
    "26": "Science-Fiction",
    "29": "Sport",
    "32": "Thriller",
    "33": "Travel",
    "36": "Western",
    "37": "LGBTQ",
    "39": "Anime",
    "41": "Cult",
    "45": "Stand-up & Talk",
};
