import { LOGIN } from '../actions/user'

const UInitialState = {
    jwt: null,
    userId: null,
}


export default (state = UInitialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                jwt: action.jwt,
                userId: action.userId,
            }

        default:
            return UInitialState;
    }
}