import { useEffect, useState } from "react";
import { DotPulse } from "@uiball/loaders";
//import axios from "axios";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import SearchBar from "../Search/SearchBar";
import { getAllGames } from "../../redux/actions/actions";
//const API = "http://localhost:3001/videogames/";

const Home = () => {
  const [isTrue, setIsTrue] = useState(false);
  const allVideogames = useSelector((state) => state.allVideogames);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsTrue(true);
    dispatch(getAllGames());
    if (allVideogames.lenght > 0) {
      setIsTrue(false);
    }
  }, [dispatch,allVideogames.lenght]);

  return (
    <div className="App">
      <SearchBar />
      {isTrue ? (
        <main>
          {allVideogames?.map((game) => {
            return (
              <Card
                key={game.id}
                id={game.id}
                name={game.nombre}
                image={game.imagen}
                plataforms={game.plataformas}
                genero={game.genero}
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
