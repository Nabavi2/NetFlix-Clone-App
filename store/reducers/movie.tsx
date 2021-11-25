import { SET_MOVIES, SET_MOVIE_BY_ID } from '../actions/movie';
const initialState = {
    availableMovies: [],
    availableMovieById: {},
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                availableMovies: action.movies,
            };
        case SET_MOVIE_BY_ID:
            return {
                ...state,
                availableMovieById: action.movie,
            }
    };
    return state;
};
