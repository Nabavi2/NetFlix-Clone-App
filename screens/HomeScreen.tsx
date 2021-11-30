import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, ActivityIndicator, ScrollView, Platform } from 'react-native';
import movie from '../data/movie';
import { View, Text } from './../components/Themed';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeCategories from '../components/HomeCategories';
import * as movieActions from '../store/actions/movie';
import * as seriesActions from '../store/actions/series';
import { useDispatch, useSelector } from 'react-redux';
import Movie from './../models/Movie';
import SeriesCategories from '../components/SeriesCategories';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const movie = useSelector((state) => state.movies.availableMovies);
  const series = useSelector((state) => state.series.availableSeries);
  const episode = useSelector((state) => state.series.availableEpisode);

  const dispatch = useDispatch()
  const movieAndSeriesHandler = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true);
      await dispatch(movieActions.fetchMovies());
      await dispatch(seriesActions.fetchSeries());
      await dispatch(seriesActions.fetchEpisode());
      await dispatch(seriesActions.fetchSeason());
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message)

      console.log(err.message);
      console.warn(err.message);
      setIsLoading(false);
    }

  }, [dispatch])
  useEffect(() => {
    movieAndSeriesHandler();
  }, [dispatch, movieAndSeriesHandler]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#c75a5f' />
      </View>
    )
  }

  return (

    <View style={styles.container}>
      <FlatList
        data={movie}
        renderItem={({ item }) => (
          <HomeCategories category={item} />
        )}
      />
      <View style={{ width: 250, backgroundColor: '#000', height: 30, marginVertical: 7, marginHorizontal: 10, }}>
        <Text style={{ fontSize: 20, color: '#c75a5f' }}> These are NetFlix Series </Text>
      </View>

      <FlatList
        data={episode}
        renderItem={({ item }) =>
        (
          <SeriesCategories category={item} />
        )
        }

      />

    </View>


  );
}


export const screenOverViewOption = (navData: any) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Home"
          iconName={Platform.OS === "android" ? "home" : "home"}
          onPress={() => {
            navData.navigation.navigate("Home");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '96%',
    borderRadius: 7,
    margin: 8,
    alignSelf: 'center',
    marginHorizontal: 10,
    padding: 8,
    resizeMode: 'cover',
    aspectRatio: 16 / 9,
    marginVertical: 10,
  }
})
export default HomeScreen;