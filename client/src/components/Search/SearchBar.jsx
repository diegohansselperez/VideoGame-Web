import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getGameByName, getAllGames } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

 
  const renderingGame = debounce(() => {
    if (searchValue.length > 1) {
      dispatch(getGameByName(searchValue));
    } else {
      dispatch(getAllGames());
    }
  }, 500);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    renderingGame(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length > 0) {
      dispatch(getGameByName(searchValue));
    
    }
  };

  return (
    <>
      <nav className={style.navContain}>
        <h1 id={style.henry_games}>Henry Games</h1>
        <div className={style.searchContainer}>
          
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.inputCont}>
              <input
                type="search"
                name="search"
                className={style.input}
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search game..."
              />
            </div>

            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Search
            </button>
          </form>{" "}
        </div>
        <div className={style.navlinks}>
          <Link to="/create">
            <button>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Create
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SearchBar;
// useEffect(() => {
//   if (searchValue.length > 0) {
//     dispatch(getGameByName(searchValue));
//   } else {
//     dispatch(getAllGames());
//   }

// }, [searchValue, dispatch]);
