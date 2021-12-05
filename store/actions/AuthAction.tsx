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
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Some thing went wrong!";
      if (response.status !== 200) {
        message = "This email is or password is  incorrect!";
      }
      console.log("error message  ", message);
      console.log("responsesssss Errroororor", errorId);
      throw new Error(message);
    }

    const resData = await response.json();
    console.log("this is my resData ", resData);
    dispatch({ type: LOGIN, userId: resData.user.id, jwt: resData["jwt"] });
    saveUserData(resData.jwt);
    console.log("this is token", resData.jwt);
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
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Some thing went wrong!";
      if (message === "") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log("RESSSSSSSSSPPPPPPPPonse", resData);
    dispatch({ type: SIGNUP, jwt: resData["jwt"] });
    saveUserData(resData.jwt);
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return async (dispatch: any) => {
    dispatch({ type: LOGOUT, nothing: "" });
  };
};

const saveUserData = async (userToken: string) => {
  const response = await AsyncStorage.setItem("userData", userToken);
};
