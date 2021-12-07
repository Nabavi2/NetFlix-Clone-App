import { EMPTY, SET_MOVIES, SET_MOVIE_BY_ID, SET_SEARCH } from "../actions/movie";
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
        availableMovieById: action.movies[0],
        availableMovies: action.movies,

      };
    case SET_MOVIE_BY_ID:
      return {
        ...state,
        availableMovieById: action.movie,
      };
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
    default:
      return { ...state };
  }
};
