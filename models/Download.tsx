import { DownloadPauseState } from "expo-file-system";

export class Download {
  downloadId: string;
  download: DownloadPauseState;
  movieId: any;
  episodeId: any;
  downloaded: boolean;
  progress: number;
  created_at: Date;
  constructor(
    downloadId: string,
    download: DownloadPauseState,
    movieId: any,
    episodeId: any,
    downloaded: boolean,
    progress: number,
    created_at: Date
  ) {
    this.downloadId = downloadId;
    this.download = download;
    this.movieId = movieId;
    this.episodeId = episodeId;
    this.downloaded = downloaded;
    this.progress = progress;
    this.created_at = created_at;
  }
}
