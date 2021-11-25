import { LOGIN} from '../actions/UserActions'

const UInitialState = {

    jwt: null,
    userId: null,
}


export const UserReducer = (state = UInitialState, action: any) => {
     switch(action.type){
        case LOGIN: 
          return {
              jwt: action.jwt,
              userId: action.userId,}
        
        default:  
             return UInitialState;
     }
}