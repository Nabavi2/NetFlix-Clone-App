import AsyncStorage from "@react-native-async-storage/async-storage";
import { DownloadPauseState, DownloadResumable } from "expo-file-system";
import { url } from "../../constants/links";

export const ADD_DOWNLOAD = "ADD_DOWNLOAD";
export const UPDATE_DOWNLOAD = "UPDATE_DOWNLOAD";
export const FETCH_DOWNLOADS = "FETCH_DOWNLOADS";

export const addDownload = (
  download: DownloadPauseState,
  movieId: any,
  episodeId: any,
  isDownloaded: boolean
) => {

  return async (dispatch: any) => {
    //async code man!!!
    const token = await AsyncStorage.getItem("jwt");
    const userId = await AsyncStorage.getItem("userId");
    const response = await fetch(`${url}/downloads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        downloaded: isDownloaded,
        user_id: userId,
        movie: movieId,
        episode: episodeId,
      }),
    });
    if(!response.ok){
        throw new Error("Something went wrong!");
    }else{
        console.log("download add correctly!!!");
        
    }
    const resData = await response.json();

    console.log("this is resData ", resData );

    dispatch({
        type: ADD_DOWNLOAD,
        download,
        downloadId: resData.id,
        movieId,
        episodeId,
    });

  };
};

export const updateDownload = (downloadId: any) => {

    return async (dispatch: any) => {
      const token = await AsyncStorage.getItem("jwt");
        const response = await fetch(`${url}/downloads/${downloadId}`,{
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            downloaded: true,
          }),
        } );
        if(!response.ok){
          throw new Error("could not app date downlaod!");
        }else{
          console.log("download updated correctly");
          
        }
        dispatch({
          type: UPDATE_DOWNLOAD,
          downloadId,
        });
    }
}

export const fetchDownloads = () =>{

      return async (dispatch: any) => {
  // await AsyncStorage.setItem("jwt","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDg5ODA1LCJleHAiOjE2NDAwODE4MDV9._5zhHD_pncHZ53mwN1lrKRgfx-fbEHEVtW9iHLfe6Z8");
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDg5ODA1LCJleHAiOjE2NDAwODE4MDV9._5zhHD_pncHZ53mwN1lrKRgfx-fbEHEVtW9iHLfe6Z8';
        
        
        const response = await fetch(`${url}/downloads`,{
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        } ); 
         
        if(!response.ok){
          throw new Error("could not fetch downloads!");
        }
        console.log("sttttttttttaaaaaaaaaaatuuuuuuuuuuussssss", response.status);
        
        
        
        const resData= await response.json();
        
        dispatch({
          type: FETCH_DOWNLOADS,
          downloadList: resData,
        });
      }
}