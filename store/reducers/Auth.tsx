
export const baseURL = 'http://172.16.1.63:1337';
import { LOGIN, LOGOUT, SIGNUP, } from "../actions/Auth";

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
        case SIGNUP:
            return {
                ...state,
                jwt: action.jwt,
            }
        case LOGOUT: {
            return initialState
        }
        default:
            return state;
    }
};
