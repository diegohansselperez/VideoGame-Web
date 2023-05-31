const axios = require("axios");
const { API_KEY } = process.env;

const getGenresByGameId = async (gameId) => {
  /// me traigo los generos por id
  const { data } = await axios.get(
    `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
  );
  const genero = data.genres;

  return genero;
};

module.exports = { getGenresByGameId };
