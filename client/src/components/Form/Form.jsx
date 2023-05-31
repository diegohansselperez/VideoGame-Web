import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCreateGame } from "../../redux/actions/actions.js";

const Form = ({ allGenres }) => { 
  //tengo que traerme todas los generos da la db almacenados
  //cada que se inicie la app me los tengo que traer.
  //los coloco en un estado global
  const [createGame, setCreateGame] = useState({
    nombre: "",
    imagen: "",
    descripcion: "",
    fecha_de_lanzamiento: "",
    plataformas: "",
    genero: "",
    rating: 0,
  });

  const dispatch = useDispatch();

 

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setCreateGame((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCreateGame(createGame));
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
        <label htmlFor="">Imagen: </label>
        <input
          type="url"
          onChange={onInputChange}
          name="imagen"
          value={createGame.imagen}
          placeholder="URL de la imagen..."
        />
        <label htmlFor="">Descripcion: </label>
        <input
          type="text"
          onChange={onInputChange}
          name="descripcion"
          value={createGame.descripcion}
          placeholder="Descripcion..."
        />
        <label htmlFor="">Plataformas: </label>
        <input
          type="text"
          onChange={onInputChange}
          name="plataformas"
          value={createGame.plataformas}
          placeholder="Plataformas..."
        />
        <label htmlFor="">Fecha de lanzamiento: </label>
        <input
          type="text"
          onChange={onInputChange}
          name="fecha_de_lanzamiento"
          value={createGame.fecha_de_lanzamiento}
          placeholder="Fecha de lanzamiento"
        />
        <label htmlFor="">Rating: </label>
        <input
          type="number"
          onChange={onInputChange}
          name="rating"
          value={createGame.rating}
          placeholder="Rating"
        />

        <select className="form-select " name="genero" onChange={onInputChange}>
          <option defaultValue>Select Genero</option>
          {allGenres?.map((genre) => {
            return (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            );
          })}
        </select>

        <button type="submit">Save Game</button>
      </form>
    </div>
  );
};

export default Form;
