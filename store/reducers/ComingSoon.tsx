import { LOGOUT } from "../actions/AuthAction";
import {
  FETCH_COMINGSOONS,
  UPDATE_SELECTED_COMINGSOON,
} from "../actions/Comingsoon";

const CInitialState = {
  comingSoonList: null,
  selectedComingSoon: {},
};

const ComingSoonReducer = (state = CInitialState, action: any) => {
  switch (action.type) {
    case FETCH_COMINGSOONS:
      return {
        comingSoonList: action.comingSoonList,
        selectedComingSoon: action.comingSoonList[0],
      };
    case UPDATE_SELECTED_COMINGSOON:
      return { ...state, selectedComingSoon: action.comingSoon };
    case LOGOUT:
      return CInitialState;
    default:
      return { ...state };
  }
};

export default ComingSoonReducer;
