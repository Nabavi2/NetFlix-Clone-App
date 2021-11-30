// export const ADD_MOVIE = 'ADD_MOVIE';

export const SET_CATEGORIES = 'SET_CATEGORIES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Category from '../../models/Category';
import { url } from "../../constants/links";




export const fetchCategories = () => {
    try {
        return async (dispatch: Function) => {
            const token = await AsyncStorage.getItem("userData");
            //   const userId = getState().auth.userId;
            const response = await fetch(
                `${url}/categories`,
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
            const loadedCategories = [];
            for (const key in resData) {
                loadedCategories.push(
                    new Category(
                        resData[key].id,
                        resData[key].title,

                    )
                );
            }
            dispatch({
                type: SET_CATEGORIES,
                categories: loadedCategories,
            });
        };
    } catch (error) {
        throw error;
    }
};
