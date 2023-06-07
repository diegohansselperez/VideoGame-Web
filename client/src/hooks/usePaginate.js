import { useState } from "react";

const usePaginate = (newGamesFiltered) => {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  const firtsIndex = (currentPage - 1) * gamesPerPage;
  const filteredGames = newGamesFiltered;
  let lastIndex = currentPage * gamesPerPage;

  const numGames = filteredGames.length;

  if (lastIndex > numGames) {
    lastIndex = numGames;
  }
  const records = filteredGames.slice(firtsIndex, lastIndex);
  const numPage = Math.round(numGames / gamesPerPage);
  
  

  const numbers = [...Array(numPage + 1).keys()].map((num) => num + 1);

  return { currentPage, setCurrentPage, records, numbers, numPage };
};

export default usePaginate;
