import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_GAME_BY_NAME,
  GET_GENRES,
  POST_CREATE_GAME,
  GET_ALL_PLATAFORMS,
  DELETE_GAME
} from "../type/types";

export function getAllGames() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/videogames/");
      console.log(data);
      dispatch({
        type: GET_VIDEOGAMES,
        payload: data,
      });
    } catch (error) {
      console.error("Error in getAllGames", error.message);
    }
  };
}

export function postCreateGame(newGame) {
  return async (dispatch) => {
    try {
      // const response = await fetch(
      //   "http://localhost:3001/videogames/",
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(newGame)
      //   }
      // );
      const response = await axios.post("http://localhost:3001/videogames/",{
        nombre: newGame.nombre,
        imagen: newGame.imagen,
        plataformas: newGame.plataformas,
        genero: newGame.genero,
        descripcion: newGame.descripcion,
        fecha_de_lanzamiento: newGame.fecha_de_lanzamiento,
        rating: newGame.rating
      })
      
      console.log(response.data);

      dispatch({
        type: POST_CREATE_GAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("postCreateGame", error.message);
    }
  };
}

export function deleteVideogame(id) {
  return  (dispatch) => {
    dispatch({
      type: DELETE_GAME,
      payload: id,
    })

  }
}

export function getAllGenres() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/genres/");
      console.log(data);

      dispatch({
        type: GET_GENRES,
        payload: data,
      });
    } catch (error) {}
  };
}

export function getAllPlataforms() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/platforms/");
      console.log(data);

      dispatch({
        type: GET_ALL_PLATAFORMS,
        payload: data,
      });
    } catch (error) {}
  };
}

export function getGameByName(name) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames?name=${name}`,
        {
          withCredentials: true, // Habilitar el envío de cookies en solicitudes de origen cruzado
        }
      );

      dispatch({
        type: GET_GAME_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.error("Error en getByName: " + error.message);
    }
  };
}


