
class Episode {
    id: number;
    season_id: {};
    title: string;
    plot: string;
    poster: string;
    video: string;
    duration: string;
    part: number;


    constructor(
        id: number,
        season_id: {},
        title: string,
        plot: string,
        poster: string,
        video: string,
        duration: string,
        part: number
    ) {
        this.id = id;
        this.season_id = season_id;
        this.title = title;
        this.plot = plot;
        this.poster = poster;
        this.video = video;
        this.duration = duration;
        this.part = part;
    }
}
export default Episode;