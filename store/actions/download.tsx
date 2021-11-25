// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const SET_DOWNLOAD = 'SET_DOWNLOAD';

// export const fethcDownload = () => {
//     try {
//         return async (dispatch: Function) => {
//             const token = AsyncStorage.getItem('userData');
//           const response =  await fetch(
//                 'URL',
//                 {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 }
//             );
//             if(!response.ok){
//                 throw new Error('Something went wrong in download method');
//             }
//             const resData = response.json();
//             const loadedDownload = [];
//             for(const key in resData){
//                 loadedDownload.push(
//                     // new download model
//                 )
//             }
//         }

//     } catch (error) {
//         throw error;
//     }
// }