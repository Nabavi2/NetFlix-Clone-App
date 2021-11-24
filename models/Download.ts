import { DownloadPauseState } from "expo-file-system";

export class Download {
  downloadId: string;
  download: DownloadPauseState;
  movieId: any;
  episodeId: any;
  downloaded: boolean;
  constructor(
    downloadId: string,
    download: DownloadPauseState,
    movieId: any,
    episodeId: any,
    downloaded: boolean
  ) {
    this.downloadId = downloadId;
    this.download = download;
    this.movieId = movieId;
    this.episodeId = episodeId;
    this.downloaded = downloaded;
  }
}
