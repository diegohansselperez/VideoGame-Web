const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame } = require("../db");
const { Op } = require("sequelize");

const getVideogameByName = async (name) => {
  const dbResults = await Videogame.findAll({
    where: {
      nombre: { [Op.iLike]: `%${name}%` },
    },
  });
  console.log("games DB", dbResults);
  const dbGames = dbResults.map((game) => {
    return {
      id: game.id,
      nombre: game.nombre,
      imagen: game.imagen,
      genero: game.genero,
      plataformas: game.plataformas, // Si las plataformas están almacenadas como una cadena separada por comas, puedes dividirla en un array
      rating: game.rating,
    };
  });

  console.log("games DB mapeado", dbGames);

  const { data } = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );
  
  
  //nos entregue solo 15 juegos
  const responseName = data.results.splice(0, 15);

  
  
  const vgSearch = await responseName.map((game) => {
    return {
      id: game.id,
      nombre: game.name,
      imagen: game.background_image,
      genero: game.genres.map((elem) => elem.name),
      plataformas: game.platforms.map((elem) => elem.platform.name), // [{platfom{}}] => [""]
      rating: game.rating,
    };
  });

  return !dbGames ? [...vgSearch] : [...dbGames, ...vgSearch];
};

module.exports = { getVideogameByName };
