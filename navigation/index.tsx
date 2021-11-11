/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DownloadScreen from '../screens/DownloadScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import { HomeParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import LoginScreen from '../screens/LoginScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack1 = createStackNavigator<HomeParamList>();
const StackNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="LoginScreen">
      <Stack1.Screen
        name="Home"
        component={HomeScreen}

      />
      <Stack1.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
    </Stack1.Navigator>
  )
}
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">

      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ title: '' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "HomeScreen" }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={BottomTabNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  // return (
  //   <BottomTab.Navigator
  //     initialRouteName="TabOne"
  //     screenOptions={{
  //       tabBarActiveTintColor: Colors[colorScheme].tint,
  //     }}>
  //     <BottomTab.Screen
  //       name="TabOne"
  //       component={TabOneScreen}
  //       options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
  //         title: 'Tab One',
  //         tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
  //         headerRight: () => (
  //           <Pressable
  //             onPress={() => navigation.navigate('Modal')}
  //             style={({ pressed }) => ({
  //               opacity: pressed ? 0.5 : 1,
  //             })}>
  //             <FontAwesome
  //               name="info-circle"
  //               size={25}
  //               color={Colors[colorScheme].text}
  //               style={{ marginRight: 15 }}
  //             />
  //           </Pressable>
  //         ),
  //       })}
  //     />
  //     <BottomTab.Screen
  //       name="TabTwo"
  //       component={TabTwoScreen}
  //       options={{
  //         title: 'Tab Two',
  //         tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
  //       }}
  //     />
  //   </BottomTab.Navigator>
  // );
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { margin: 5 },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
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
              {/* <FontAwesome
              name="info-circle"
              size={25}
              color={Colors[colorScheme].text}
              style={{ marginRight: 15 }}
            /> */}
            </Pressable>
          ),
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
              {/* <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              /> */}
            </Pressable>
          ),
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
