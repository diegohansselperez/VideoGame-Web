import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGameByName, getAllGames } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";


const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue.length > 0) {
      dispatch(getGameByName(searchValue));
    } else {
      dispatch(getAllGames());
    }
    
  }, [searchValue, dispatch]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchValue.length > 0) {
      await dispatch(getGameByName(searchValue));
      // setSearchValue("");
    }
  };

  return (
    <>
      <nav style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <form onSubmit={handleSubmit}>
          <div className="search-container">
            <input
              type="search"
              name="search"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Busca el videojuego..."
            />
            <button type="submit">Buscar</button>
          </div>
        </form>
        <div className="nav-links">
          <Link to="/home" >
            <button >Home</button>
          </Link>
          <Link to="/create">
            <button>Crear</button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SearchBar;
