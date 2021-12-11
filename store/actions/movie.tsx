// export const ADD_MOVIE = 'ADD_MOVIE';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_MOVIE_BY_ID = 'SET_MOVIE_BY_ID';
export const SET_SEARCH = 'SET_SEARCH';
export const EMPTY = "EMPTY";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyObject } from 'yup/lib/object';
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

// this methode fetch movie by on id
export const fetchMovieById = (id: any) => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            const response = await fetch(
                `${url}/movies/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    },
                }

            );
            if (!response.ok) {
                throw new Error("An error occured! in movies by id");
            }
            const resData = await response.json();
            console.log(resData);
            const loadedMoviesById = [];
            loadedMoviesById.push(
                new Movie(
                    resData.id,
                    resData.category_id,
                    resData.title,
                    resData.video,
                    resData.poster,
                    resData.creator_name,
                    resData.cast,
                    resData.year,
                    resData.plot,
                    resData.duration,
                )
            );
            dispatch({
                type: SET_MOVIE_BY_ID,
                movie: loadedMoviesById,
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


export const EmptyList = () => {
    console.log("RRR@@@@@@@@@@@@@@22222");
    const array: [] = [];
    return async (disptach: Function) => {

        disptach({ type: EMPTY, arr: array });
    }
}