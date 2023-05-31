const { getAllPlatforms } = require("../controllers/getPlatforms");

const getPlatforms = async (req, res) => {
  try {
    let platforms = await getAllPlatforms();
    res.status(200).json(platforms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPlatforms,
};
