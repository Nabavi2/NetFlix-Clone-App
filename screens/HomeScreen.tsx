import React from 'react';
import { FlatList, Image, ListRenderItemInfo, StyleSheet } from 'react-native';
import CategoryItem from '../components/HomeCategories';
import { Text, View } from '../components/Themed';
import categories from '../data/categories';


interface Props {
    movie: {
        id: string,
        poster: string,
    }
}

function HomeScreen() {
    const first = categories.items[0];
    const fi = first.movies[0];
    const ob = {
        cates: categories,
    }
    return (
        <View style={styles.container}>
          <FlatList data={categories.items} renderItem={ ({item}) => (<CategoryItem category={item} />)} />
        </View>
       
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       padding: 10,
     
   }
})

export default HomeScreen;