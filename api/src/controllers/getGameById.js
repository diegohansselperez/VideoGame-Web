const { Genre, Videogame } = require("../db");
const { URL_GAMES, API_KEY } = process.env;
const axios = require("axios");
const { getGenresByGameId } = require("./getGenresById");

const getGameById = async (id, source) => {
  if (source === "api") {
    const { data } = await axios.get(`${URL_GAMES}/${id}?key=${API_KEY}`);

    const genres = await getGenresByGameId(id);

    const newGame = {
      id: data.id,
      nombre: data.name,
      descripcion: data.description,
      imagen: data.background_image,
      plataformas: data.platforms.map((obj) => obj.platform.name),
      fecha_de_lanzamiento: data.released,
      rating: data.rating,
      genero: genres,
    };

    if (!newGame.id)
      throw new Error("No se encuentre el personaje con el id " + id);

    return newGame;
  } else {
    const gameByBd = await Videogame.findByPk(id, {
      include: {
        model: Genre,
        //incluya solo el name de la tabla Genre.
        attributes: ["name", "id"],
        //indica que no se incluirán los atributos adicionales asociados con la relación entre el videojuego y el género.
        through: {
          attributes: [],
        },
      },
    });

    return gameByBd;
  }
};

module.exports = { getGameById };
