const { Router } = require("express");
const { getPlatforms } = require("../handlers/getPlatforms");

const routePlatforms = Router();

routePlatforms.get("/", getPlatforms);


module.exports = routePlatforms;