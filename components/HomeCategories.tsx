import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Text, View } from './Themed';

interface CategoryProps {
       category: {
        id: string,
        title: string,
        movies: {
            id: string,
            poster: string,
        }[],
       }
    
}

function CategoryItem(props: CategoryProps) {

    const {category} = props;
    const navigation = useNavigation();
    return (
        <View>
            {/* <Text>helelel</Text> */}
           <Text style={styles.categoryTitle}>{ category.title}</Text> 
           <FlatList horizontal data={category.movies} keyExtractor={ (item) => item.id }  renderItem={ ({ item }) => (
                <TouchableOpacity onPress={() => { navigation.navigate('MovieDetail',);}} >
                <View style={styles.image}>
                <Image source={{uri: item.poster}} style={styles.image} />
            </View>
            </TouchableOpacity>
    )} />
       </View>

    );
}

const styles = StyleSheet.create({
    image: {
        height: 180,
        width: 130,
        borderRadius: 3,
        marginHorizontal: 10,
     },
     categoryTitle: {
         fontSize: 16,
         fontWeight: "700",
         margin: 5,
     }
})

export default CategoryItem;