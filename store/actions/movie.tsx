// export const ADD_MOVIE = 'ADD_MOVIE';
export const SET_MOVIES = 'SET_MOVIES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Movie from '../../models/Movie';
import { baseURL } from '../reducers/Auth';


// export const addMovie = (movies: any) => {
//     return { type: SET_MOVIES, movies: movies };
// };


export const fetchMovies = () => {
    try {
        return async (dispatch: Function) => {
            console.log("helllllooo");
            const token = await AsyncStorage.getItem("userData");
            //   const userId = getState().auth.userId;
            const response = await fetch(
                `${baseURL}/movies`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );
            console.log("this is token in movie fetch", token)
            console.log('This is my Response : ', response)
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
                        resData[key].categoryId,
                        resData[key].name,
                        resData[key].video,
                        resData[key].poster,
                        resData[key].creator,
                        resData[key].cast,
                        resData[key].year,
                        resData[key].plot,
                        resData[key].duration,
                    )
                );
                console.log('this is my movie data : ', resData);
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
