import { FETCH_COMINGSOONS } from "../actions/Comingsoon"

const CInitialState = {
    comingSoonList: null,
}

const ComingSoonReducer = (state = CInitialState, action: any) => {

    switch(action.type){
        case FETCH_COMINGSOONS: 
            return { comingSoonList: action.comingSoonList};
        default: 
            return CInitialState;
    }
}

export default ComingSoonReducer;