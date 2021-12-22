import { LOGIN, LOGOUT, SIGNUP } from "../actions/AuthAction";

const initialState = {
  jwt: null,
  userId: null,
};

const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        jwt: action.jwt,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        ...state,
        jwt: action.jwt,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;
