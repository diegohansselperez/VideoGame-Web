const axios = require("axios");
const { API_KEY } = process.env;

const getGamesApi = async () => {
  try {
    const apiurls = Array.from(
      { length: 5 },
      (_, i) =>
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i + 1}`
    );

    let api = await axios.all(apiurls.map((url) => axios.get(url)));

    api = api?.map((response) => response.data.results).flat();
    api = api?.map((result) => {
      return {
        id: result.id,
        nombre: result.name,
        imagen: result.background_image,
        plataformas: result.platforms.map((obj) => obj.platform.name),
        fecha_de_lanzamiento: result.released,
        rating: result.rating,
        genero: result.genres.map((obj) => obj.name),
        created: false,
      };
    });

    return api;
  } catch (error) {
    console.error(`Error al obtener los datos de la página:`, error);
  }
};

module.exports = { getGamesApi };
