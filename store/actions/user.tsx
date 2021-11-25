import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/links";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";



export const loginUser = (email: string, password: string) => {
      
    return async (dispatch: any) => {
        // Your async code man!!!!
        const response = await fetch(`${url}/auth/local`, {
            method: "POST",
            headers: {
               "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                identifier: email,
                password,
            }),
        });

       if(!response.ok){
            throw Error("Could not login!");
       }

       const resData = await response.json();
       console.log(resData);
       
      const sto = await AsyncStorage.setItem("jwt", resData.jwt);
      await AsyncStorage.setItem("userId", resData.user.id);
      console.log("asyncSto  "+ sto);
      
       dispatch({type: LOGIN, userId: resData.user.id,  jwt: resData["jwt"]});

    };
};