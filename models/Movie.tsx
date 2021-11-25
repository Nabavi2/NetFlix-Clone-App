class Movie {
    id: number;
    category_id: {};
    video: string;
    poster: string;
    creator_name: string;
    cast: string;
    year: string;
    plot: string;
    title: string;
    duration: string;
    constructor(id: number, category_id: {}, title: string, video: string, poster: string, creator_name: string, cast: string, year: string, plot: string, duration: string) {
        this.id = id;
        this.title = title;
        this.category_id = category_id;
        this.video = video;
        this.poster = poster;
        this.creator_name = creator_name;
        this.cast = cast;
        this.year = year;
        this.plot = plot;
        this.duration = duration;
    }
}
export default Movie;