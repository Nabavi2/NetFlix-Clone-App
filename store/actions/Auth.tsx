// import AsyncStorage from "@react-native-async-storage/async-storage";
// export const AUTHENTICATE = "AUTHENTICATE";
// // export const LOGOUT = "LOGOUT";
// // export const DID_TRY_AL = "DID_TRY_AUTO_LOGIN";

// let timer;

// // export const didTryAutoLoginUser = () => {
// //   return { type: DID_TRY_AL };
// // };


// export const loginUser = (email: string, password: string) => {
//   return async (dispatch:Function) => {
//     const response = await fetch(
//       "URL",
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
//       if (errorId === "EMAIL_NOT_FOUND") {
//         message = "This email is not found!";
//       } else if (errorId === "INVALID_PASSWORD") {
//         message = "Your password is not valid!";
//       }

//       throw new Error(message);
//     }
//     const resData = await response.json();
//     console.log(resData);
//     // dispatch(
//     //   authenticate(
//     //     resData.idToken,
//     //     resData.localId,
//     //     parseInt(resData.expiresIn) * 1000
//     //   )
//     // );
//     // const expirationDate = new Date(
//     //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
//     // );
//     // saveUserData(resData.idToken, resData.localId, expirationDate);
//   };
// };


// // export const authenticate = (token: string, userId: string, expiryTime: DateConstructor) => {
// //   return (dispatch: Function) => {
// //     dispatch(setLogoutTimer:(expiryTime: Date));
// //     dispatch({ type: AUTHENTICATE, token, userId });
// //   };
// // };



// // export const signupUser = (email, password) => {
// //   return async (dispatch) => {
// //     const response = await fetch(
// //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfAFTvangh1IGbyZ4WzZi2xu1RKQMF9Z4",
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },

// //         body: JSON.stringify({
// //           email,
// //           password,
// //           returnSecureToken: true,
// //         }),
// //       }
// //     );
// //     if (!response.ok) {
// //       const errorResData = await response.json();
// //       const errorId = errorResData.error.message;
// //       let message = "Some thing went wrong!";
// //       if (errorId === "EMAIL_EXISTS") {
// //         message = "This email exists already!";
// //       }
// //       throw new Error(message);
// //     }
// //     const resData = await response.json();
// //     console.log(resData);
// //     dispatch(
// //       authenticate(
// //         resData.idToken,
// //         resData.localId,
// //         parseInt(resData.expiresIn) * 1000
// //       )
// //     );
// //     const expirationDate = new Date(
// //       new Date().getTime() + parseInt(resData.expiresIn) * 1000
// //     );
// //     saveUserData(resData.idToken, resData.localId, expirationDate);
// //   };
// // };


// // const saveUserData = (token: string, userId: string, expirationDate: Date) => {
// //   AsyncStorage.setItem(
// //     "userData",
// //     JSON.stringify({
// //       token,
// //       userId,
// //       expiryDate: expirationDate.toISOString(),
// //     })
// //   );
// // };
