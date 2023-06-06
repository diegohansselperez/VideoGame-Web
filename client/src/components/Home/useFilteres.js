import { useState } from "react";

//Aqui van la logica de los filtros que necesita el array de juegos, y el estado que almacena los filtros
const useFilters = () => {
  const [filterGames, setFilterGames] = useState({
    genero: "all",
    origen: "all",
  });

  const filteredVideogames = (arr) => {
    return arr.filter((game) => {
      return (
        (filterGames.genero === "all" ||
          game.genero.find(
            (name) => name.toLowerCase() === filterGames.genero.toLowerCase()
          )) &&
        (filterGames.origen === "all" ||
          String(game.created) === filterGames.origen)
      );
    });
  };

  return { setFilterGames, filteredVideogames };
};

export default useFilters;
