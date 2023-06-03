import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCreateGame } from "../../redux/actions/actions.js";
//import validate from "./validate.js";

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

  const validate = (game) => {
    const errorForm = {};
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (createGame.nombre.length < 2) {
      errorForm.nombre =
        "El nombre ingresado no puede contener mas de 2 caracteres";
    }

    if (!dateRegex.test(createGame.fecha_de_lanzamiento)) {
      errorForm.fecha_de_lanzamiento =
        "Por favor, ingresa una fecha válida en el formato YYYY-MM-DD.";
    }
    if (createGame.descripcion.length >= 254) {
      errorForm.descripcion =
        "La descripcion tiene que ser mayor a 255 caracteres";
    }
    if (createGame.rating <= 0 || createGame.rating >= 5) {
      errorForm.rating = "Rating tiene que ser mayor a 0 y menor o igual a 5";
    }
    if (createGame.genero.length <= 1) {
      errorForm.genero = "el juego debe de tener al menos un tipo de genero";
    }
    if (createGame.plataformas.length <= 1) {
      errorForm.plataformas =
        "el juego debe de tener al menos un tipo de plataforma";
    }

    return errorForm;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validate(createGame);
    setError(validationErrors);
    if (Object.values(error).length > 0) {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nombre: </label>
        <input
          type="text"
          onChange={onInputChange}
          name="nombre"
          value={createGame.nombre}
          placeholder="Nombre del juego..."
        />
        {error.nombre && <span>{error.nombre}</span>}
        <label htmlFor="">Imagen: </label>
        <input
          type="text"
          onChange={onInputChange}
          name="imagen"
          value={createGame.imagen}
          placeholder="URL de la imagen..."
        />
        {error.imagen && <span>{error.imagen}</span>}
        <label htmlFor="">Descripcion: </label>
        <input
          type="text"
          onChange={onInputChange}
          name="descripcion"
          value={createGame.descripcion}
          placeholder="Descripcion..."
        />
        {error.descripcion && <span>{error.descripcion}</span>}
        <select
          className="form-select"
          name="plataformas"
          onChange={handleSelectPlataforms}
        >
          <option defaultValue>Seleccionar Plataforma</option>
          {allPlataforms?.map((plat, index) => {
            return (
              <option key={index} value={plat.name}>
                {plat.name}
              </option>
            );
          })}
        </select>
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
        {error.plataformas && <span>{error.plataformas}</span>}
        <label htmlFor="">Fecha de lanzamiento: </label>
        <input
          type="text"
          onChange={onInputChange}
          name="fecha_de_lanzamiento"
          value={createGame.fecha_de_lanzamiento}
          placeholder="Fecha de lanzamiento"
        />
        {error.fecha_de_lanzamiento && (
          <span>{error.fecha_de_lanzamiento}</span>
        )}
        <select
          className="form-select "
          name="genero"
          onChange={handleSelectGenre}
        >
          <option defaultValue>Select Genero</option>
          {allGenres?.map((genre, index) => {
            return (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            );
          })}
        </select>
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
        {error.genero && <span>{error.genero}</span>}
        <label htmlFor="">Rating: </label>
        <input
          type="number"
          onChange={onInputChange}
          name="rating"
          value={createGame.rating}
          placeholder="Rating"
        />
        {error.rating && <span>{error.rating}</span>}

        <button type="submit">Save Game</button>
      </form>
    </div>
  );
};

export default Form;
