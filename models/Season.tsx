class Season {
    id: number;
    series_id: {};
    name: string;

    constructor(
        id: number,
        series_id: {},
        name: string,
    ) {
        this.id = id;
        this.series_id = series_id;
        this.name = name;
    }
}
export default Season;