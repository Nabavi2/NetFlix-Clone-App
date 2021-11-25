
export const baseURL = 'http://172.16.1.63:1337';
import { LOGIN, } from "../actions/Auth";

const initialState = {
    jwt: null,
    userId: null,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                jwt: action.jwt, userId: action.userId
            };
        default:
            return state;
    }
};
