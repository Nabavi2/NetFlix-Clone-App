import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/links";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginUser = (email: string, password: string) => {
  return async (dispatch: any) => {
    const response = await fetch(`${url}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    if (!response.ok) {
      if (response.status === 400)
        throw new Error("Your email or password is not correct!");
      throw new Error("Some thing went wrong!");
    }

    const resData = await response.json();
    dispatch({ type: LOGIN, userId: resData.user.id, jwt: resData["jwt"] });
    saveUserData(resData.jwt, resData.user.id);
  };
};

export const signupUser = (email: string, password: string) => {
  return async (dispatch: Function) => {
    const response = await fetch(`${url}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        email,
        password,
      }),
    });

    if (!response.ok) {
      if (response.status === 400)
        throw new Error("This email is already used by another user!");
      throw new Error("Some thing went wrong!");
    }
    const resData = await response.json();
    dispatch({ type: SIGNUP, jwt: resData["jwt"], userId: resData["user"].id });
    saveUserData(resData.jwt, resData["user"].id);
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    const unToken = await AsyncStorage.removeItem("userData");
    const unUserId = await AsyncStorage.removeItem("userId");
    dispatch({ type: LOGOUT, unToken: unToken, unUserId: unUserId });
  };
};

const saveUserData = async (userToken: string, userId: any) => {
  await AsyncStorage.setItem("userData", userToken);
  await AsyncStorage.setItem("userId", userId.toString());
};
