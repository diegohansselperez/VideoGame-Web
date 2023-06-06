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

  // Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base
  // de datos (creados por nosotros desde el formulario).
  // !Botones/Opciones para ordenar tanto ascendentemente como descendentemente
  // !los videojuegos por orden alfabético y por rating.

  return (
    <>
      <section className={styles.containFilters}>
        <div className={styles.conteinSelectors}>
          <label htmlFor="genero">Genero</label>
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
          <label htmlFor="origen">Origen</label>
          <select id="origen" onChange={handleChangeOrigin}>
            <option value="all">Todos</option>
            <option value="false">API</option>
            <option value="true">Base de Datos</option>
          </select>
        </div>
      </section>
    </>
  );
};

export default Filters;
