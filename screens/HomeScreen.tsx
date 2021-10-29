import React from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import categories from '../data/categories';
import movie from '../data/movie';
import { View, Text } from './../components/Themed';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeCategories from '../components/HomeCategories';
function HomeScreen() {

    return (
        <View style={styles.container}>

            <FlatList
                data={categories.items}
                renderItem={({ item }) => (
                    <HomeCategories category={item} />
                )}
            />
            <Text>this is home Screen</Text>




        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default HomeScreen;