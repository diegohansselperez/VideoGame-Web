import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_GAME_BY_NAME,
  TO_HOME_PAGE,
  GET_GENRES,
  POST_CREATE_GAME,
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
    const endpoint = "http://localhost:3001/videogames/";
    try {
      const { data } = await axios.post(endpoint, newGame, {
        withCredentials: true, // Habilitar el envío de cookies en solicitudes de origen cruzado
      });
      console.log("axios post ", data);

      dispatch({
        type: POST_CREATE_GAME,
        payload: data,
      });
    } catch (error) {
      console.error("postCreateGame", error.message);
    }
  };
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

export function getGameByName(name) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      , {
        withCredentials: true, // Habilitar el envío de cookies en solicitudes de origen cruzado
      });

      dispatch({
        type: GET_GAME_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.error("Error en getByName: " + error.message);
    }
  };
}

export function toHomePage() {
  return (dispatch) => {
    dispatch({
      type: TO_HOME_PAGE,
    });
  };
}
