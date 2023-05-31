import {
  GET_VIDEOGAMES,
  GET_GAME_BY_NAME,
  TO_HOME_PAGE,
  GET_GENRES,
  POST_CREATE_GAME,
} from "../type/types";

const initialState = {
  allVideogames: [],
  allGamesOrigin: [],
  allGenres: [],
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        allGamesOrigin: action.payload,
      };
    case GET_GAME_BY_NAME:
      //const getGameByName = state.allVideogames.filter( game => game.nombre.toLowerCase() === action.payload.toLowerCase())
      return {
        ...state,
        allVideogames: action.payload,
      };

    case POST_CREATE_GAME:
      return {
        ...state,
        allVideogames: [{ ...action.payload }, ...state.allVideogames],
      };

    case TO_HOME_PAGE:
      return {
        ...state,
        allVideogames: [],
      };

    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
