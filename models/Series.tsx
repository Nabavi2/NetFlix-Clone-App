

class Series {
    id: number;
    category_id: {};
    name: string;
    creator_name: string;
    cast: string;
    year: string;
    constructor(
        id: number,
        category_id: {},
        name: string,
        creator_name: string,
        casts: string,
        year: string,
    ) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.creator_name = creator_name;
        this.cast = casts;
        this.year = year;
    }

}
export default Series;