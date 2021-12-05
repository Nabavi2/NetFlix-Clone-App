import { DownloadPauseState } from "expo-file-system";

export class Download {
  downloadId: string;
  download: DownloadPauseState;
  movieId: any;
  episodeId: any;
  downloaded: boolean;
  created_at: Date;
  constructor(
    downloadId: string,
    download: DownloadPauseState,
    movieId: any,
    episodeId: any,
    downloaded: boolean,
    created_at: Date
  ) {
    this.downloadId = downloadId;
    this.download = download;
    this.movieId = movieId;
    this.episodeId = episodeId;
    this.downloaded = downloaded;
    this.created_at = created_at;
  }
}
