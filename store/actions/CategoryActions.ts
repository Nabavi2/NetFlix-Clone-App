import { url } from "../../constants/links";

export const GET_CATES = "GET_CATES";

export const getCategories = () => {

    return async (dispatch : any) => {
        //your async code man!!!
        const moviesRes = fetch(`${url}/movies`)
        const seriesRes = fetch;
    }
}