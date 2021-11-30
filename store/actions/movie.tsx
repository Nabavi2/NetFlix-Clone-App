// export const ADD_MOVIE = 'ADD_MOVIE';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_MOVIE_BY_ID = 'SET_MOVIE_BY_ID';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyObject } from 'yup/lib/object';
import { url } from '../../constants/links';
import Movie from '../../models/Movie';




export const fetchMovies = () => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            //   const userId = getState().auth.userId;
            const response = await fetch(
                `${url}/movies`,
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