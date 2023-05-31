const { Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const getGenres = async (req, res) => {
  try {
    let { data } = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    let genreApi = data.results;

    const newGender = genreApi?.map((genre) => {
      return {
        name: genre.name,
      };
    });

    newGender.forEach(async (genre) => {
      await Genre.findOrCreate({
        where: { name: genre.name },
      });
    });

    let getAllGenres = await Genre.findAll();

    res.status(200).json(getAllGenres);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getGenres };
