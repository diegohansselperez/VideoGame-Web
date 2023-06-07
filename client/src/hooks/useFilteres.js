import { useState } from "react";

//Aqui van la logica de los filtros que necesita el array de juegos, y el estado que almacena los filtros
const useFilters = () => {
  const [filterGames, setFilterGames] = useState({
    genero: "all",
    origen: "all",
    order: "all",
    rating: "all"
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
    }).sort((a, b) => {
      if (filterGames.order === "Ascendente") {
        return a.nombre?.localeCompare(b.nombre);
      } else if (filterGames.order === "Descendente") {
        return b.nombre?.localeCompare(a.nombre);
      }
      return 0;
    }).sort((a,b) => {
      if(filterGames.rating === "Menor"){
        return a.rating - b.rating;
      } else if(filterGames.rating === "Mayor"){
        return b.rating - a.rating;
      }

      return 0
    })
    ;
  };

  return { setFilterGames, filteredVideogames };
};

export default useFilters;
