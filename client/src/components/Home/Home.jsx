import { useEffect, useState } from "react";
import { DotPulse } from "@uiball/loaders";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import SearchBar from "../Search/SearchBar";
import { getAllGames , deleteVideogame } from "../../redux/actions/actions";
import Filters from "../Filters/Filters";
import Paginate from "../Paginate/Paginate";

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
  const numPage = Math.ceil(numGames / gamesPerPage);
  const numbers = [...Array(numPage + 1).keys()].map((num) => num + 1);

  return { currentPage, setCurrentPage, records, numbers, numPage };
};

const Home = () => {
  const [isTrue, setIsTrue] = useState(false);

  const allVideogames = useSelector((state) => state.allVideogames);
  const dispatch = useDispatch();

  //Filtros desed el customHook
  const { filteredVideogames, setFilterGames } = useFilters();

  const newGamesFiltered = filteredVideogames(allVideogames);

  //Paginacion con ajuste automatico dependiendo los juegos filtadros.

  const { currentPage, setCurrentPage, records, numbers, numPage } =
    usePaginate(newGamesFiltered);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeToPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== numPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  //ejecuta la funcion para mandar traer todo el array de elementos.
  useEffect(() => {
    setIsTrue(true);
    dispatch(getAllGames());
    if (records.lenght > 0) {
      setIsTrue(false);
    }
  }, [dispatch, records.lenght]);

  //funcion para eliminar una card

  const handleDelete = (id) => {
    dispatch(deleteVideogame(id));
  };

  return (
    <div className="App">
      <SearchBar />
      <Filters onChangeFilters={setFilterGames} />
      <Paginate
        prePage={prePage}
        numbers={numbers}
        nextPage={nextPage}
        changeToPage={changeToPage}
      />
      {isTrue ? (
        <main>
          {records?.map((game) => {
            return (
              <Card
                key={game.id}
                id={game.id}
                name={game.nombre}
                image={game.imagen}
                plataforms={game.plataformas}
                genero={game.genero}
                handleDelete={handleDelete}
              />
            );
          })}
        </main>
      ) : (
        <div>
          <DotPulse size={80} lineWeight={3.5} speed={1} color="white" />
        </div>
      )}
    </div>
  );
};

export default Home;
