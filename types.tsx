/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  MovieDetailScreen: undefined;
  Home: undefined;
  LoginScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Download: undefined;
  ComingSoon: undefined;
  Search: undefined;
  Drawer: undefined;

};
export type HomeParamList = {
  Home: undefined;
  LoginScreen: undefined;
  MovieDetailScreen: undefined;
  Search: undefined;
  Drawer: undefined;
  TestScreen: undefined;
  Tabs: undefined;
  Movies: undefined;
  Series: undefined;
}
export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type Episode = {
  id: number;
  seasonId: number;
  title: string;
  plot: string;
  poster: string;
  video: string;
  duration: string;
  number: number;
}
export type Movie = {
  id: number,
  categoryId: number,
  title: string,
  video: string,
  poster: string,
  creator: string,
  cast: string,
  year: string,
  plot: string,
  duration: string,
}
