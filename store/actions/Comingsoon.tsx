import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/links";

export const FETCH_COMINGSOONS = "FETCH_COMINGSOONS";
export const UPDATE_SELECTED_COMINGSOON = "UPATE_SELECTED_COMINGSOON";
export const fetchComingSoons = () => {
  return async (dispatch: any) => {
    const token = await AsyncStorage.getItem("userData");
    const response = await fetch(`${url}/coming-soons`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Could not fetch coming soons!");
    }
    const resData = await response.json();
    dispatch({
      type: FETCH_COMINGSOONS,
      comingSoonList: resData,
    });
  };
};

export const updateSelectedComingSoon = (comingSoon: any) => {
  return async (dispatch: any) => {
    dispatch({ type: UPDATE_SELECTED_COMINGSOON, comingSoon });
  };
};
