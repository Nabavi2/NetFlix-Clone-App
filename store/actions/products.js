// import Product from "../../models/product";

// export const DELETE_PRODUCT = "DELETE_PRODUCT";
// export const CREATE_PRODUCT = "CREATE_PRODUCT";
// export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
// export const SET_PRODUCTS = "SET_PRODUCTS";

// export const fetchProducts = () => {
//   try {
//     return async (dispatch, getState) => {
//       console.log("helllllooo");
//       const userId = getState().auth.userId;
//       const response = await fetch(
//         "https://shopapp-547f8-default-rtdb.asia-southeast1.firebasedatabase.app/producst.json"
//       );
//       if (!response.ok) {
//         throw new Error("An error occured!");
//       }
//       const resData = await response.json();
//       console.log(resData);
//       const loadedProducts = [];
//       for (const key in resData) {
//         loadedProducts.push(
//           new Product(
//             key,
//             resData[key].ownerId,
//             resData[key].title,
//             resData[key].imageUrl,
//             resData[key].description,
//             resData[key].price
//           )
//         );
//         console.log();
//       }
//       dispatch({
//         type: SET_PRODUCTS,
//         products: loadedProducts,
//         userProducts: loadedProducts.filter((item) => item.ownerId === userId),
//       });
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteProduct = (productId) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://shopapp-547f8-default-rtdb.asia-southeast1.firebasedatabase.app/producst/${productId}.json?auth=${token}`,
//       {
//         method: "DELETE",
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Some thing went wrong!");
//     }
//     dispatch({ type: DELETE_PRODUCT, pid: productId });
//   };
// };

// export const createProduct = (title, description, imageUrl, price) => {
//   return async (dispatch, getState) => {
//     // Here is our async code...
//     const token = getState().auth.token;
//     const userId = getState().auth.userId;
//     const response = await fetch(
//       `https://shopapp-547f8-default-rtdb.asia-southeast1.firebasedatabase.app/producst.json?auth=${token}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           imageUrl,
//           price,
//           ownerId: userId,
//         }),
//       }
//     );
//     const resData = await response.json();

//     dispatch({
//       type: CREATE_PRODUCT,
//       productData: {
//         id: resData.name,
//         ownerId: userId,
//         title,
//         description,
//         imageUrl,
//         price,
//       },
//     });
//   };
// };

// export const updateProduct = (id, title, description, imageUrl) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const userId = getState().auth.userId;
//     const response = await fetch(
//       `https://shopapp-547f8-default-rtdb.asia-southeast1.firebasedatabase.app/producst/${userId}/${id}.json?auth=${token}`,
//       {
//         method: "PATCH",
//         header: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           imageUrl,
//           description,
//         }),
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Some thing went wrong!");
//     }
//     dispatch({
//       type: UPDATE_PRODUCT,
//       pid: id,
//       productData: {
//         title,
//         description,
//         imageUrl,
//       },
//     });
//   };
// };
