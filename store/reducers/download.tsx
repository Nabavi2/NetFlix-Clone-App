import {
  ADD_DOWNLOAD,
  FETCH_DOWNLOADS,
  UPDATE_DOWNLOAD,
} from "../actions/download";
import { Download } from "../../models/Download";
import { LOGOUT } from "../actions/AuthAction";
const DInitialState = {
  downloadList: [],
};

export const DownloadReducer = (state = DInitialState, action: any) => {
  switch (action.type) {
    case ADD_DOWNLOAD:
      const downloadItem = new Download(
        action.downloadId,
        action.userId,
        action.download,
        action.movieId,
        action.episodeId,
        false,
        action.progress,
        action.created_at
      );
      const newList = [...state.downloadList!, downloadItem];
      return { downloadList: newList };
    case FETCH_DOWNLOADS:
      const list: [] = action.downloadList;

      const dList = list.map(
        (item: any, index) =>
          new Download(
            item.id,
            item.user_id,
            item.resumData,
            item.movie ? item.movie.id : null,
            item.episode ? item.episode.id : null,
            item.downloaded,
            item.progress,
            item.created_at
          )
      );
      return { downloadList: [...dList] };
    case UPDATE_DOWNLOAD:
      const doList: never[] = state.downloadList!;
      doList.forEach((element: any) => {
        if (element.downloadId === action.downloadId) {
          element.downloaded = true;
        }
      });
      return { downloadList: doList };
    case LOGOUT:
      return DInitialState;

    default:
      return { ...state };
  }
};
