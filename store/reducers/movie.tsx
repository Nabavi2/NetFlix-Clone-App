import { LOGOUT } from "../actions/AuthAction";
import { EMPTY, E_L_HANDLER, SET_MOVIES, SET_MOVIE_BY_ID, SET_SEARCH } from "../actions/movie";
import { searchMovieByName } from './../actions/movie';
const initialState = {
  availableMovies: [],
  availableMovieById: {},
  searchedMovieByName: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        availableMovies: [...state.availableMovies, ...action.movies],
      }
    case SET_SEARCH:
      return {
        ...state,
        searchedMovieByName: action.searchMovie,
      }
    case EMPTY:
      return {
        ...state,
        searchMovieByName: action.arr,
      }
    case E_L_HANDLER:
      return {
        ...state,
        searchedMovieByName: [],
      }
    case LOGOUT:
      return initialState;
    default:
      return { ...state };
  }
};
