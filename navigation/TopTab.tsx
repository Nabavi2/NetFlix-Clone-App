import React from 'react'

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MovieScreen from '../screens/MovieScreen';
import SeriesScreen from '../screens/SeriesScreen';

export const Tabs = createMaterialTopTabNavigator(
    {
        Movies: {
            screen: MovieScreen,
            navigationOption: {
                tabBarLabel: ({ }) => {
                    <View>
                        <Ionicons name='videocam-sharp' size={24} color="#FFF" />
                        <Text> Movies</Text>
                    </View>
                }
            }
        },
        
        Series: {
            screen: SeriesScreen,
            navigationOption: {
                tabBarLabel: ({ }) => {
                    <View>
                        <Ionicons name='videocam' size={24} color="#FFF" />
                        <Text> Movies</Text>
                    </View>
                }
            }
        }
    },
    
    {
    

    }
);