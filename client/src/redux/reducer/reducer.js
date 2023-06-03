import {
  GET_VIDEOGAMES,
  GET_GAME_BY_NAME,
  GET_GENRES,
  POST_CREATE_GAME,
  GET_ALL_PLATAFORMS,
  DELETE_GAME
} from "../type/types";

const initialState = {
  allVideogames: [],
  allGamesOrigin: [],
  allGenres: [],
  allPlataforms: [],
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
        allVideogames: [...action.payload,...state.allVideogames],
      };

      case DELETE_GAME: 
      const gameDelete = state.allVideogames.filter(game => String(game.id) !== String(action.payload))
      return{
        ...state,
        allVideogames: gameDelete
      }

    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
      case GET_ALL_PLATAFORMS:
        return {
          ...state,
          allPlataforms: action.payload
        }
    
    default:
      return state;
  }
};

export default reducer;
