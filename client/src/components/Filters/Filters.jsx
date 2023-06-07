import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../redux/actions/actions";
import styles from "./Filters.module.css";

const Filters = ({ onChangeFilters }) => {
  const dispacth = useDispatch();
  //me traigo el estado AllGenres
  const { allGenres } = useSelector((state) => state);

  //aqui voy a despachar la accion que me va a trear los generos del estado global

  useEffect(() => {
    dispacth(getAllGenres());
  }, [dispacth]);

  const handleChangeGenre = (e) => {
    onChangeFilters((prevState) => ({
      ...prevState,
      genero: e.target.value,
    }));
  };

  const handleChangeOrigin = (e) => {
    onChangeFilters((prevState) => ({
      ...prevState,
      origen: e.target.value,
    }));
  };

  const handleChangeOrder = (e) => {
    onChangeFilters((prevState) => ({
      ...prevState,
      order: e.target.value,
    }));
  };

  const handleChangeRating = (e) => {
    onChangeFilters((prevState) => ({
      ...prevState,
      rating: e.target.value,
    }))
  }

  return (
    <>
      <section className={styles.containFilters}>
        <div className={styles.conteinSelectors}>
          <label htmlFor="genero">Genre</label>
          <select onChange={handleChangeGenre} id="genero">
            <option value="all" defaultValue>
              Todos
            </option>
            {allGenres &&
              allGenres.map((genr) => {
                return (
                  <option key={genr.id} value={genr.name}>
                    {genr.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className={styles.conteinSelectors}>
          <label htmlFor="origen">Origin</label>
          <select id="origen" onChange={handleChangeOrigin}>
            <option value="all">Todos</option>
            <option value="false">API</option>
            <option value="true">Base de Datos</option>
          </select>
        </div>
        <div className={styles.conteinSelectors}>
          <label htmlFor="order">Order</label>
          <select id="order" onChange={handleChangeOrder}>
            <option value="all">Todos</option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
        </div>
        <div className={styles.conteinSelectors}>
          <label htmlFor="raring">Rating</label>
          <select id="rating" onChange={handleChangeRating}>
            <option value="all">Todos</option>
            <option value="Mayor">Mayor</option>
            <option value="Menor">Menor</option>
          </select>
        </div>
      </section>
    </>
  );
};

export default Filters;
