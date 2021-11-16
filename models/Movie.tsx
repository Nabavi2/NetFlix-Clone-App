class Movie {
    id: number;
    categoryId: number;
    name: string;
    video: string;
    poster: string;
    creator: string;
    cast: string;
    year: string;
    plot: string;
    duration: string;
    constructor(id: number, categoryId: number, name: string, video: string, poster: string, creator: string, cast: string, year: string, plot: string, duration: string) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.video = video;
        this.poster = poster;
        this.creator = creator;
        this.cast = cast;
        this.year = year;
        this.plot = plot;
        this.duration = duration;
    }
}
export default Movie;