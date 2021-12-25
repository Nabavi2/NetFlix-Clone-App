import AsyncStorage from "@react-native-async-storage/async-storage";
export const AUTHENTICATE = "AUTHENTICATE";
import { baseURL } from './../reducers/Auth';
export const LOGIN = "LOGIN";

// export const didTryAutoLoginUser = () => {
//   return { type: DID_TRY_AL };
// };


export const loginUser = (email: string, password: string) => {
    return async (dispatch: any) => {
        const response = await fetch(
            `${baseURL}/auth/local`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: email,
                    password: password,
                }),
            }
        );
        console.log('this is my response data  ', response)
        if (!response.ok) {

            const errorResData = await response.json();
            // const errorId = errorResData.error.message;
            let message = "Some thing went wrong!";
            if (errorResData.identifier == !email) {
                message = "This email is not found!";
            }
            else if (errorResData.password == !password) {
                message = "Your password is not valid!";
            }
            console.log('error message  ', message);
            throw new Error(message);
        }
        const resData = await response.json();
        console.log('this is my resData ', resData);
        dispatch(
            { type: LOGIN, userId: resData.user.id, jwt: resData['jwt'] });
        saveUserData(resData.jwt,);
        console.log('this is token', resData.jwt)
    };
};


export const authenticate = (userToken: string, undefined: string, password: string) => {
    return (dispatch: Function) => {

        dispatch({ type: AUTHENTICATE, userToken, undefined, password });
    };
};



// export const signupUser = (email, password) => {
//   return async (dispatch) => {
//     const response = await fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfAFTvangh1IGbyZ4WzZi2xu1RKQMF9Z4",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           email,
//           password,
//           returnSecureToken: true,
//         }),
//       }
//     );
//     if (!response.ok) {
//       const errorResData = await response.json();
//       const errorId = errorResData.error.message;
//       let message = "Some thing went wrong!";
//       if (errorId === "EMAIL_EXISTS") {
//         message = "This email exists already!";
//       }
//       throw new Error(message);
//     }
//     const resData = await response.json();
//     console.log(resData);
//     dispatch(
//       authenticate(
//         resData.idToken,
//         resData.localId,
//         parseInt(resData.expiresIn) * 1000
//       )
//     );
//     const expirationDate = new Date(
//       new Date().getTime() + parseInt(resData.expiresIn) * 1000
//     );
//     saveUserData(resData.idToken, resData.localId, expirationDate);
//   };
// };


const saveUserData = async (userToken: string,) => {
    const response = await AsyncStorage.setItem(
        "userData", userToken,

    );
    console.log("response storage ", response)
};
