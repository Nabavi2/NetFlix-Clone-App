import { SET_CATEGORIES } from '../actions/category';
const initialState = {
    availableCategories: [],
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                availableCategories: action.categories,
            };
    };
    return state;
};
