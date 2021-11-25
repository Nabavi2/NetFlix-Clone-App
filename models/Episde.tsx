
class Episode {
    id: number;
    season_d: {};
    title: string;
    plot: string;
    poster: string;
    video: string;
    duration: string;
    number: number;

    constructor(
        id: number,
        season_d: {},
        title: string,
        plot: string,
        poster: string,
        video: string,
        duration: string,
        number: number,
    ) {
        this.id = id;
        this.season_d = season_d;
        this.title = title;
        this.plot = plot;
        this.poster = poster;
        this.video = video;
        this.duration = duration;
        this.number = number;
    }
}
export default Episode;