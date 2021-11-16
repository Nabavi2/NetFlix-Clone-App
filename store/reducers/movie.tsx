import { SET_MOVIES } from '../actions/movie';
const initialState = {
    availableMovies: {},
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                availableMovies: action.movies,
            };
    };
    return state;
};
