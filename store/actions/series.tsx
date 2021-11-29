export const SET_SERIES = 'SET_SERIES';
export const SET_SEASON = 'SET_SEASON';
export const SET_EPISODE = 'SET_EPISODE';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Episode from '../../models/Episde';
import Movie from '../../models/Movie';
import Season from '../../models/Season';
import Series from '../../models/Series';
import { baseURL } from '../reducers/Auth';

export const fetchSeries = () => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            //   const userId = getState().auth.userId;
            const response = await fetch(
                `${baseURL}/serieses`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("An error occured! in series");
            }
            const resData = await response.json();
            console.log(resData);
            const loadedSeries = [];
            for (const key in resData) {
                loadedSeries.push(
                    new Series(
                        resData[key].id,
                        resData[key].category_id,
                        resData[key].name,
                        resData[key].creator_name,
                        resData[key].cast,
                        resData[key].year,
                    )
                );
            }
            dispatch({
                type: SET_SERIES,
                series: loadedSeries,
            });
        };
    } catch (error) {
        throw error;
    }
};

//this is season fetch method 

export const fetchSeason = () => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            //   const userId = getState().auth.userId;
            const response = await fetch(
                `${baseURL}/seasons`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("An error occured! in seasone");
            }
            const resData = await response.json();
            console.log(resData);
            const loadedSeason = [];
            for (const key in resData) {
                loadedSeason.push(
                    new Season(
                        resData[key].id,
                        resData[key].series_id,
                        resData[key].name,
                    ),
                );
            }
            dispatch({
                type: SET_SEASON,
                season: loadedSeason,
            });
        };
    } catch (error) {
        throw error;
    }
};

//this is episode fetch metode

export const fetchEpisode = () => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            //   const userId = getState().auth.userId;
            const response = await fetch(
                `${baseURL}/episodes`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("An error occured in episode");
            }
            const resData = await response.json();
            console.log("eppppppppppppiiiiiiiiisssssssssssssode");

            console.log(resData);
            const loadedEpisode = [];
            for (const key in resData) {
                loadedEpisode.push(
                    new Episode(
                        resData[key].id,
                        resData[key].season_id,
                        resData[key].title,
                        resData[key].plot,
                        resData[key].poster,
                        resData[key].video,
                        resData[key].duration,
                        resData[key].number,
                    )
                );
            }
            dispatch({
                type: SET_EPISODE,
                episode: loadedEpisode,
            });
        };
    } catch (error) {
        throw error;
    }
};