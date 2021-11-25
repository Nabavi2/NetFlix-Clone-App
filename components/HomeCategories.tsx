import React from 'react';
import { StyleSheet, Image, FlatList, Pressable, TouchableOpacity, ScrollView, ListView } from 'react-native';

import { View, Text } from './../components/Themed';
import Navigation from '../navigation/index';
import { useNavigation } from '@react-navigation/native';
import movie from '../data/movie';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { useSelector } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


function HomeCategories(props: any) {
    const { category } = props;

    const navigation = useNavigation();
    console.log("MMMMOOOOVVVVIE IINNNNN HOOOMMEECART  ", category)

    let i = 0;
    return (
        <View style={styles.container}>
            <ScrollView

                horizontal={true}
            >
                <View style={{ backgroundColor: '#000', width: '100%' }}>
                    <Text style={{ margin: 10, color: '#FFF', fontSize: 24, }}>
                        {category.category_id.title}
                    </Text>
                    <Pressable onPress={() => {
                        navigation.setParams('MovieDetailScreen', { movieId: category.id });
                        navigation.navigate('MovieDetailScreen', { movieId: category.id })
                    }}>
                        <Image style={styles.image} source={{ uri: category.poster }} />

                    </Pressable>
                </View>

            </ScrollView >
        </View >
        // <View style={styles.container}>
        //     <Text style={{ margin: 10, color: '#000' }}>
        //         {category.title}
        //     </Text>
        //     <FlatList
        //         data={category}
        //         key={category.id}
        //         renderItem={({ item }) => {
        //             return (
        //                 <Pressable onPress={() => {
        //                     navigation.setParams('MovieDetailScreen', { movieId: category.id });
        //                     navigation.navigate('MovieDetailScreen', { movieId: category.id })
        //                 }}>
        //                     <Image style={styles.image} source={{ uri: item.poster }} />
        //                 </Pressable>
        //             )
        //         }}
        //         horizontal
        //     />

        // </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 7,
        margin: 8,
        alignSelf: 'center',
        resizeMode: 'cover',
        aspectRatio: 16 / 9,

    }
})
export default HomeCategories;