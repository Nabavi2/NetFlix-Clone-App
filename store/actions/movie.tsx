// export const ADD_MOVIE = 'ADD_MOVIE';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_MOVIE_BY_ID = 'SET_MOVIE_BY_ID';
export const SET_SEARCH = 'SET_SEARCH';
export const EMPTY = "EMPTY";
export const E_L_HANDLER = 'E_L_HANDLER'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../../constants/links';
import Movie from '../../models/Movie';




export const fetchMovies = (start: number, categoryId: number) => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            const response = await fetch(
                `${url}/movies?_start=${start}&_limit=5&category_id_eq=${categoryId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                }

            );
            if (!response.ok) {
                throw new Error("An error occured! in movies");
            }
            const resData = await response.json();
            console.log(resData);
            const loadedMovies = [];
            for (const key in resData) {
                loadedMovies.push(
                    new Movie(
                        resData[key].id,
                        resData[key].category_id,
                        resData[key].title,
                        resData[key].video,
                        resData[key].poster,
                        resData[key].creator_name,
                        resData[key].cast,
                        resData[key].year,
                        resData[key].plot,
                        resData[key].duration,
                    )
                );
            }
            dispatch({
                type: SET_MOVIES,
                movies: loadedMovies,
                start,
            });
        };
    } catch (error) {
        throw error;
    }
};

//mthode search movies by name 

export const searchMovieByName = (title: any) => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            const response = await fetch(
                `${url}/movies?title_contains=${title}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                }

            );
            if (!response.ok) {
                throw new Error('somthing went wrong');

            }

            const resData = await response.json();
            if (resData.lenght === 0) {
                throw new Error('not found!')
            }

            const loadedMoviesByName = [];

            for (const key in resData) {
                loadedMoviesByName.push(
                    new Movie(
                        resData[key].id,
                        resData[key].category_id,
                        resData[key].title,
                        resData[key].video,
                        resData[key].poster,
                        resData[key].creator_name,
                        resData[key].cast,
                        resData[key].year,
                        resData[key].plot,
                        resData[key].duration,
                    )
                );
            }
            dispatch({
                type: SET_SEARCH,
                searchMovie: loadedMoviesByName,
            });
        };
    } catch (error) {
        throw error;
    }
};
export const emptySearchHandler = () => {
    return async (dispatch: Function) => {
        dispatch({ type: E_L_HANDLER, emptyList: [] })
    }
}

export const EmptyList = () => {
    const array: [] = [];
    return async (disptach: Function) => {

        disptach({ type: EMPTY, arr: array });
    }
}