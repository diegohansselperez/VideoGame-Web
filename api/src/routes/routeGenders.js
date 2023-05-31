const { Router } = require("express");
const { getGenres } = require("../handlers/getGenres");

const routeGenres = Router();

routeGenres.get("/", getGenres);


module.exports = routeGenres;
