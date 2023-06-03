const { Router } = require("express");
const {
  getAllVideogames,
  getIdVideogame,
  createVideogame,
} = require("../handlers/getVideogames");

const routerGames = Router();

//route que nos traera todos los videojuegos de API y BD.
routerGames.get("/", getAllVideogames);

//route que va a buscar un juego especifico por id de Api o BD.
routerGames.get("/:id", getIdVideogame);

//route para Crear un videojuego y pasarselo a la BD.
//Toda la información debe ser recibida por body
routerGames.post("/", createVideogame);


module.exports = routerGames;
