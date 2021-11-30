/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, SafeAreaView, Text, Platform, Image, Pressable, ColorSchemeName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DownloadScreen from '../screens/DownloadScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import { HomeParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/Auth';
import TestScreen from '../screens/TestScreen';
import { Tabs } from './TopTab';
import MovieScreen from '../screens/MovieScreen';
import SeriesScreen from '../screens/SeriesScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <StackNavigator /> */}
      <StackNavigator />
      {/* <TopTabNavigator /> */}
    </NavigationContainer>
  );
}
// top tab list vies
const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#717a73',
        },
        tabBarPressOpacity: 1,
      }}
    // style={{ backgroundColor: '#717a73' }}

    >
      <Tab.Screen
        name="Movies" component={MovieScreen}
        options={{
          tabBarLabelStyle: {
            color: '#FFF'
          }
        }}
      />
      <Tab.Screen
        name="Series" component={SeriesScreen}
        options={{

          tabBarLabelStyle: { color: '#FFF' }
        }}

      />

    </Tab.Navigator>

  )
}






const Stack1 = createStackNavigator<HomeParamList>();
const StackNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }} >
      <Stack1.Screen name="Home"
        component={AppDrawerNavigator}
      />

      <Stack1.Screen
        name="LoginScreen"
        component={LoginScreen}

      />

      <Stack1.Screen
        name="Movies"
        component={MovieScreen}

      />
      <Stack1.Screen
        name="Series"
        component={SeriesScreen}

      />
      <Stack1.Screen
        name="MovieDetailScreen"
        component={MovieDetailScreen}
        options={{ headerShown: true }}
      />
      {/* <Stack1.Screen
        name="Search"
        component={BottomTabNavigator}
        options={{ headerShown: true }}
      /> */}
    </Stack1.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,

      }}>
      <BottomTab.Screen
        name="Home"
        component={TopTabNavigator}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home Screen',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Home')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
            </Pressable>
          ),
          headerShown: false
        })}
      /><BottomTab.Screen
        name="ComingSoon"
        component={ComingSoonScreen}
        options={({ navigation }: RootTabScreenProps<'ComingSoon'>) => ({
          title: 'Coming Soon ',
          tabBarIcon: ({ color }) => <MaterialIcons name="video-library" color={color} size={24} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('ComingSoon')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>

            </Pressable>
          ),
          headerShown: false
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }: RootTabScreenProps<'Search'>) => ({
          title: 'Search ',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Search')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>

            </Pressable>
          ),
          headerShown: false
        })}
      />
      <BottomTab.Screen
        name="Download"
        component={DownloadScreen}
        options={({ navigation }: RootTabScreenProps<'Download'>) => ({
          title: 'Downloads',
          tabBarIcon: ({ color }) => <AntDesign name="download" color={color} size={24} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Download')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              {/* <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              /> */}
            </Pressable>
          ),
          headerShown: false
        })}
      />

    </BottomTab.Navigator>

  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

//Drawer Stack Navigator
const DrawerNavigator = createDrawerNavigator();

export const AppDrawerNavigator = () => {
  const dispatch = useDispatch();
  return (
    <DrawerNavigator.Navigator

      drawerContent={(props: any) => {

        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <Image
                style={{ width: 200, height: 200, marginLeft: 30, marginBottom: 20, marginTop: 30 }}
                source={require('../assets/images/netflix.jpg')} />
              <DrawerItemList {...props} />
              <Pressable
                style={{ width: '70%', height: 35, flexDirection: 'row', backgroundColor: '#000', }}
                onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.navigate("LoginScreen");
                }}
              >
                <SimpleLineIcons name="logout" size={24} color="#c4c7cc" style={{ marginLeft: 15, marginRight: 10, }} />
                <Text style={{ color: '#c4c7cc', fontSize: 20, fontWeight: '500', marginLeft: 25 }}>Logout</Text>
              </Pressable>
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: { backgroundColor: '#000' },
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#c4c7cc',

        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="menu"
            size={size}
            color={focused ? '#7cc' : '#ccc'}
          />
        ),
      }}
    //defaultScreenOptions={{ drawerActiveTintColor: Colors.primary, headerShown: false }}

    >
      <DrawerNavigator.Screen
        name="NetFlix"
        component={BottomTabNavigator}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "home" : "home"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "search" : "search"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />

      <DrawerNavigator.Screen
        name="ComingSoonScreen"
        component={ComingSoonScreen}
        options={{
          drawerIcon: (props: any) => (
            <MaterialIcons
              name={Platform.OS === "android" ? "video-library" : "video-library"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "download" : "download"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};