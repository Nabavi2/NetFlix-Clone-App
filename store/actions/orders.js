// export const ADD_ORDER = "ADD_ORDER";
// import Order from "./../../models/order";
// export const SET_ORDERS = "SET_ORDERS";

// export const fetchOrders = () => {
//   try {
//     return async (dispatch, getState) => {
//       console.log("helllllooo");
//       const userId = getState().auth.userId;
//       const response = await fetch(
//         `https://shopapp-547f8-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`
//       );
//       if (!response.ok) {
//         throw new Error("An error occured!");
//       }
//       const resData = await response.json();
//       console.log("this is the response data" + resData);
//       const loadedOrders = [];
//       for (const key in resData) {
//         loadedOrders.push(
//           new Order(
//             key,
//             resData[key].cartItems,
//             resData[key].totalAmount,
//             new Date(resData[key].date)
//           )
//         );
//       }
//       dispatch({ type: SET_ORDERS, orders: loadedOrders });
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// export const addOrder = (cartItems, totalAmount) => {
//   return async (dispatch, getState) => {
//     const date = new Date();
//     const userId = getState().auth.userId;
//     const token = getState().auth.token;
//     // Here is our async code...
//     const response = await fetch(
//       `https://shopapp-547f8-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cartItems,
//           totalAmount,
//           date: date.toISOString(),
//         }),
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Some thing went wrong!");
//     }
//     const resData = await response.json();
//     dispatch({
//       type: ADD_ORDER,
//       orderData: {
//         id: resData.name,
//         items: cartItems,
//         amount: totalAmount,
//         date,
//       },
//     });
//   };
// };
