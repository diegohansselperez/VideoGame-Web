require("dotenv").config();

const { Videogame } = require("../db");

const { getGamesApi } = require("../controllers/getGamesApi");
const { getGameById } = require("../controllers/getGameById");
const { getVideogameByName } = require("../controllers/getVidegameByName");

//***********Funcion para obtener todo los videojuegos de la API y la BD.**********************************
const getAllVideogames = async (req, res) => {
  const { name } = req.query;
  try {
    //*************** Verificamos si existe la popiedad name, significa que estamos haciendo una peticion desde query *************
    if (name) {
      const resultGameName = await getVideogameByName(name);
      res.status(200).json(resultGameName);
    } else {
      //*********** Caso contrario es que estamos mandando llamar a TODOS los juegos ****************** */
      const gamesDb = await Videogame.findAll();

      const apiGames = await getGamesApi();

      const newResult = [...gamesDb, ...apiGames];
      res.status(200).json(newResult);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//***********Funcion para obtener un solo juego por id, ya sea la API o BD.********************************
const getIdVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"; //verifico si es un dato numerico o un string

    const gameByBd = await getGameById(id, source);

    res.status(200).json(gameByBd);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//***********Creamos un videojuego que se guardara en la BD y se enlasa en la tabla intermadia.*************
const createVideogame = async (req, res) => {
  const {
    nombre,
    descripcion,
    plataformas,
    imagen,
    fecha_de_lanzamiento,
    genero,
    rating,
  } = req.body;

  try {
    let newGameCreated = await Videogame.findOrCreate({
      where: {
        nombre: nombre,
      },
      defaults: {
        descripcion,
        plataformas,
        imagen,
        fecha_de_lanzamiento,
        rating,
        genero,
      },
    });

    res.status(200).send(newGameCreated);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(404).send("A game with this name already exists");
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};


module.exports = {
  getAllVideogames,
  getIdVideogame,
  createVideogame,

};
