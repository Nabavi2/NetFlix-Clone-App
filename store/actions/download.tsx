import AsyncStorage from "@react-native-async-storage/async-storage";
import { DownloadPauseState } from "expo-file-system";
import { url } from "../../constants/links";

export const ADD_DOWNLOAD = "ADD_DOWNLOAD";
export const UPDATE_DOWNLOAD = "UPDATE_DOWNLOAD";
export const FETCH_DOWNLOADS = "FETCH_DOWNLOADS";

export const addDownload = (
  download: DownloadPauseState,
  movieId: any,
  episodeId: any,
  isDownloaded: boolean,
  progress: number
) => {
  return async (dispatch: any) => {
    const token = await AsyncStorage.getItem("userData");
    const userId = await AsyncStorage.getItem("userId");
    const response = await fetch(`${url}/downloads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumData: JSON.stringify(download),
        downloaded: isDownloaded,
        user_id: userId,
        movie: movieId,
        episode: episodeId,
        progress,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    dispatch({
      type: ADD_DOWNLOAD,
      download,
      downloadId: resData.id,
      movieId,
      episodeId,
      progress,
      created_at: resData.created_at,
    });
  };
};

export const sendPauseDownload = (
  downloadId: any,
  pauseData: any,
  progress: any
) => {
  //pauseData is already stringyfied in download Item.
  return async (dispatch: Function) => {
    const token = await AsyncStorage.getItem("userData");
    const response = await fetch(`${url}/downloads/${downloadId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumData: pauseData,
        progress,
      }),
    });
    if (!response.ok) {
      throw new Error("could not save pause of downlaod!");
    }
  };
};

export const updateDownload = (downloadId: any) => {
  return async (dispatch: any) => {
    const token = await AsyncStorage.getItem("userData");
    const response = await fetch(`${url}/downloads/${downloadId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        downloaded: true,
      }),
    });
    if (!response.ok) {
      throw new Error("could not update downlaod!");
    }
    dispatch({
      type: UPDATE_DOWNLOAD,
      downloadId,
    });
  };
};
export const deleteDownloadItem = (downloadId: any) => {
  return async (dispatch: any) => {
    const token = await AsyncStorage.getItem("userData");
    const response = await fetch(`${url}/downloads/${downloadId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("could not delete downlaod!");
    }
  };
};

export const fetchDownloads = () => {
  return async (dispatch: any) => {
    const token = await AsyncStorage.getItem("userData");
    const response = await fetch(`${url}/downloads`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("could not fetch downloads!");
    }

    const resData = await response.json();

    dispatch({
      type: FETCH_DOWNLOADS,
      downloadList: resData,
    });
  };
};
