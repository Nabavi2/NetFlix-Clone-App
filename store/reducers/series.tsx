import { SET_EPISODE, SET_SEASON, SET_SERIES } from '../actions/series';
const initialState = {
    availableSeries: [],
    availableSeason: [],
    availableEpisode: {},
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_SERIES:
            return {
                ...state,
                availableSeries: action.series,
            };
        case SET_SEASON:
            return {
                ...state,
                availableSeason: action.season,
            }
        case SET_EPISODE:
            return {
                ...state,
                availableEpisode: action.episode,

            }
    };

    return state;
};
