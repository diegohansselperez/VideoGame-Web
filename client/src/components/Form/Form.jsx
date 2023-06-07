import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCreateGame } from "../../redux/actions/actions.js";
import validate from "../../hooks/validate.js";
import style from "./Form.module.css";

const Form = ({ allGenres, allPlataforms }) => {
  //tengo que traerme todas los generos de la db almacenados
  //cada que se inicie la app me los tengo que traer.
  //los coloco en un estado global
  const [createGame, setCreateGame] = useState({
    nombre: "",
    imagen: "",
    descripcion: "",
    fecha_de_lanzamiento: "",
    plataformas: [],
    genero: [],
    rating: 0,
  });

  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCreateGame({
      ...createGame,
      [name]: value,
    });
    setError(
      validate({
        ...createGame,
        [name]: value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(createGame);
    setError(validationErrors);
    if (Object.values(error).length > 0 && Object.values(createGame.nombre).length <= 0) {
      return alert(
        "Porfavor revisa tus inputs y los requerimientos que se te piden"
      );
    } else {
      dispatch(postCreateGame(createGame));

      alert("Game created successfully");
      setCreateGame({
        nombre: "",
        imagen: "",
        descripcion: "",
        fecha_de_lanzamiento: "",
        plataformas: [],
        genero: [],
        rating: 0,
      });
      window.location.href = "/home";
    }
  };

  //agregar a Plataformas
  const handleSelectPlataforms = (e) => {
    if (
      e.target.value !== "plataformas" &&
      !createGame.plataformas.includes(e.target.value)
    ) {
      setCreateGame({
        ...createGame,
        plataformas: [...createGame.plataformas, e.target.value],
      });
    }
  };
  //eliminar de Plataformas
  const handleDeletePlataforms = (plataforma) => {
    setCreateGame({
      ...createGame,
      plataformas: createGame.plataformas.filter((plat) => plat !== plataforma),
    });
  };

  //agregar a Generos
  const handleSelectGenre = (e) => {
    if (
      e.target.value !== "genero" &&
      !createGame.genero.includes(e.target.value)
    ) {
      setCreateGame({
        ...createGame,
        genero: [...createGame.genero, e.target.value],
      });
    }
  };
  //eliminar de Generos
  const handleDeleteGenre = (genero) => {
    setCreateGame({
      ...createGame,
      genero: createGame.genero.filter((genre) => genre !== genero),
    });
  };

  return (
    <div className={style.containForm}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputText}>
          {" "}
          <div className={style.sectionInput}>
            {" "}
            <label htmlFor="">Name: </label>
            <input
              type="text"
              onChange={onInputChange}
              name="nombre"
              value={createGame.nombre}
              placeholder="Nombre del juego..."
            />
          </div>
          {error.nombre && <span>{error.nombre}</span>}
        </div>
        <div className={style.inputText}>
          <div className={style.sectionInput}>
            <label htmlFor="">Image: </label>
            <input
              type="text"
              onChange={onInputChange}
              name="imagen"
              value={createGame.imagen}
              placeholder="URL de la imagen..."
            />
          </div>

          {error.imagen && <span>{error.imagen}</span>}
        </div>
        <div className={style.inputText}>
          {" "}
          <div className={style.sectionInput}>
            <label htmlFor="">Description: </label>
            <input
              type="text"
              onChange={onInputChange}
              name="descripcion"
              value={createGame.descripcion}
              placeholder="Descripcion..."
            />
          </div>
          {error.descripcion && <span>{error.descripcion}</span>}
        </div>
        <div className={style.selectInput}>
          {" "}
          <select
            className={style.formSelect}
            name="plataformas"
            onChange={handleSelectPlataforms}
          >
            <option defaultValue>Select Platform</option>
            {allPlataforms?.map((plat, index) => {
              return (
                <option key={index} value={plat.name}>
                  {plat.name}
                </option>
              );
            })}
          </select>
          <div className={style.listaSelect}>
            <ul>
              {createGame.plataformas?.map((plat, index) => (
                <li
                  value={plat}
                  onDoubleClick={() => handleDeletePlataforms(plat)}
                  style={{ cursor: "pointer" }}
                  key={index}
                >
                  {plat}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {error.plataformas && <span>{error.plataformas}</span>}

        <div className={style.inputText}>
          <div className={style.sectionInput}>
            {" "}
            <label htmlFor="">Relasing Date: </label>
            <input
              type="text"
              onChange={onInputChange}
              name="fecha_de_lanzamiento"
              value={createGame.fecha_de_lanzamiento}
              placeholder="Fecha de lanzamiento"
            />
          </div>
          {error.fecha_de_lanzamiento && (
            <span>{error.fecha_de_lanzamiento}</span>
          )}{" "}
        </div>

        <div className={style.selectInput}>
          <select
            className={style.formSelect}
            name="genero"
            onChange={handleSelectGenre}
          >
            <option defaultValue>Select Genre</option>
            {allGenres?.map((genre, index) => {
              return (
                <option key={index} value={genre.name}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          <div className={style.listaSelect}>
            <ul>
              {createGame.genero?.map((gener, index) => (
                <li
                  value={gener}
                  onDoubleClick={() => handleDeleteGenre(gener)}
                  style={{ cursor: "pointer" }}
                  key={index}
                >
                  {gener}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {error.genero && <span>{error.genero}</span>}

        <div className={style.inputText}>
          <div className={style.sectionInput}>
            <label htmlFor="">Rating: </label>
            <input
              type="number"
              onChange={onInputChange}
              name="rating"
              value={createGame.rating}
              placeholder="Rating"
            />
          </div>

          {error.rating && <span>{error.rating}</span>}
        </div>

        <button className={style.btnSave} type="submit">
          Save Game
        </button>
      </form>
    </div>
  );
};

export default Form;
