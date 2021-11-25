import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Episode } from '../types';
import { Text, View} from "./Themed"

interface EpisodeItemPorps{
    item: Episode,
    onPress: any,
}

function EpisodeItem(props: EpisodeItemPorps) {

    const {item, onPress} = props;
    return (
        <Pressable style={styles.container} onPress={ () => onPress(item)} >

           <View style={styles.subContainer}>
               <View style={{flexDirection:"row", alignItems: "center"}}>
               <Image source={{uri: item.poster}} style={styles.image} />
               <View style={{marginLeft: 10}}>
                   <Text style={{fontSize: 16}} >{item.title}</Text>
                   <Text style={{color: "darkgrey"}}>{item.duration}</Text>
               </View>
               
               </View>
               <AntDesign name="download" size={24} color="white" />
           </View>
           <Text>{item.plot}</Text> 
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,

    },
    image: {
    height: 75,
    aspectRatio: 16/9,
    borderRadius: 3,
    
    }
})
export default EpisodeItem;