import { useEffect, useState } from "react";
import { DotPulse } from "@uiball/loaders";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import SearchBar from "../Search/SearchBar";
import { getAllGames, deleteVideogame } from "../../redux/actions/actions";
import Filters from "../Filters/Filters";
import Paginate from "../Paginate/Paginate";
import useFilters from "./useFilteres";
import usePaginate from "./usePaginate";



const Home = () => {
  const [isTrue, setIsTrue] = useState(false);

  const allVideogames = useSelector((state) => state.allVideogames);
  const dispatch = useDispatch();

  //Filtros del custom hook.
  const { filteredVideogames, setFilterGames } = useFilters();

  const newGamesFiltered = filteredVideogames(allVideogames);

  //Paginacion con ajuste automatico.
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

  //Ejecuta la funcion para mandar traer todo el array de elementos.
  useEffect(() => {
    setIsTrue(true);
    dispatch(getAllGames());
    if (records.lenght > 0) {
      setIsTrue(false);
    }
  }, [dispatch, records.lenght]);

  //Dispatch para eliminar una card

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
