import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/links";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginUser = (email: string, password: string) => {
  return async (dispatch: any) => {
    const userToken = await AsyncStorage.removeItem("userData");
    const userId = await AsyncStorage.removeItem("userId");

    console.log('toppppppkkkkkkkkkkkkkkkkkkkkkk ', userId, userToken);

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
    saveUserData(resData.jwt, resData.user.id);
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
        username: email,
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
