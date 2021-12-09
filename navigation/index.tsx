import {
  FontAwesome,
  AntDesign,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  SafeAreaView,
  Text,
  Platform,
  Image,
  Pressable,
  ColorSchemeName,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import useColorScheme from "../hooks/useColorScheme";
import DownloadScreen from "../screens/DownloadScreen";
import SearchScreen from "../screens/SearchScreen";
import ComingSoonScreen from "../screens/ComingSoonScreen";
import {
  HomeParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/AuthAction";
import TestScreen from "../screens/TestScreen";
import MovieScreen from "../screens/MovieScreen";
import SeriesScreen from "../screens/SeriesScreen";
import Colors from "../constants/Colors";


export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StackNavigator />
    </NavigationContainer>
  );
}
// This methode is for Top Tab Navigator
const Tab = createMaterialTopTabNavigator();
const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor: "#FFF",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={MovieScreen}
        options={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: Colors.secondary,
          tabBarPressOpacity: 0.1,
          tabBarPressColor: "#FFF",
          tabBarIndicatorStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Tab.Screen
        name="Series"
        component={SeriesScreen}
        options={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: Colors.secondary,
          tabBarIndicatorStyle: { backgroundColor: Colors.primary },
          tabBarPressColor: '#FFF',
          tabBarPressOpacity: 0.1,
        }}
      />
    </Tab.Navigator>
  );
};
//Stack Navigator for navigate to other page
const Stack1 = createStackNavigator<HomeParamList>();
const StackNavigator = () => {
  return (
    <Stack1.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack1.Screen name="Home" component={AppDrawerNavigator} />
      <Stack1.Screen name="LoginScreen" component={LoginScreen} />
      <Stack1.Screen
        name="MovieDetailScreen"
        component={MovieDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack1.Navigator>
  );
};

//Bottom Tab navigator for navigate to other home from page bottom
const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#eee",
        tabBarStyle: { backgroundColor: "black", overflow: "hidden" },
        headerShown: false,
        headerStyle: { backgroundColor: "#222" },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TopTabNavigator}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home Screen",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "home" : "ios-home"}
              color={color}
              size={24}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Home")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            ></Pressable>
          ),
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="ComingSoon"
        component={ComingSoonScreen}
        options={({ navigation }: RootTabScreenProps<"ComingSoon">) => ({
          title: "Coming Soon ",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name={
                Platform.OS === "android" ? "video-library" : "video-library"
              }
              color={color}
              size={24}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ComingSoon")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            ></Pressable>
          ),
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }: RootTabScreenProps<"Search">) => ({
          title: "Search ",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "search" : "ios-search"}
              size={24}
              color={color}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            ></Pressable>
          ),
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Download"
        component={DownloadScreen}
        options={({ navigation }: RootTabScreenProps<"Download">) => ({
          title: "Downloads",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "download" : "ios-download"}
              color={color}
              size={24}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Download")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            ></Pressable>
          ),
          headerShown: false,
        })}
      />
    </BottomTab.Navigator>
  );
}

//Drawer Stack Navigator for show drawer and navigate
const DrawerNavigator = createDrawerNavigator();
export const AppDrawerNavigator = () => {
  const dispatch = useDispatch();
  return (
    <DrawerNavigator.Navigator
      drawerContent={(props: any) => {
        return (
          <View style={{ flex: 1, paddingTop: 20, backgroundColor: "#222" }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  marginLeft: 30,
                  marginBottom: 20,
                  marginTop: 30,
                  borderRadius: 100,
                }}
                source={require("../assets/images/netflix.jpg")}
              />
              <DrawerItemList {...props} />
              <Pressable
                style={{
                  width: "55%",
                  height: 35,
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={async () => {
                  await dispatch(authActions.logout());
                  props.navigation.navigate("LoginScreen");
                }}
              >
                <SimpleLineIcons
                  name="logout"
                  size={24}
                  color="#c4c7cc"
                  style={{ marginLeft: 15, marginRight: 10 }}
                />
                <Text
                  style={{
                    color: "#c4c7cc",
                    fontSize: 20,
                    fontWeight: "500",
                    marginLeft: 25,
                  }}
                >
                  Logout
                </Text>
              </Pressable>
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        drawerActiveTintColor: Colors.primary,
        headerStyle: { backgroundColor: "#222" },
        headerTintColor: "white",
        drawerInactiveTintColor: "#ddd",
      }}
    >
      <DrawerNavigator.Screen
        name="NETFLIX"
        component={BottomTabNavigator}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "home" : "ios-home"}
              size={23}
              color={props.color}
            />
          ),
          headerTitleStyle: { color: Colors.primary },
        }}
      />
      <DrawerNavigator.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "search" : "ios-search"}
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
              name={
                Platform.OS === "android" ? "video-library" : "video-library"
              }
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
              name={Platform.OS === "android" ? "download" : "ios-download"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};
