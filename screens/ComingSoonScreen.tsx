import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import HomeScreen from './HomeScreen';
function ComingSoonScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            
            <View style={styles.container}>
                <Image style={{width: 350, height: 450, }} resizeMode="cover" source={{uri: "https://res.cloudinary.com/tutia-tech/image/upload/v1637753371/imperial_Dreams_8e5c58475c.jpg?651474.5"}} />
                <View style={styles.titleContainer} >
                  <Text style={styles.title}>Thor: Sister Return</Text>    
                  <Text style={styles.subtitle} >Cast: Elen suzi, Haguard Plen, Micheal Teli</Text>    
                </View> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        backgroundColor: "#444",
        borderRadius: 7,
    },
    titleContainer: {
        padding: 10,
    }, 
    title: {
        color: "white",
        fontSize: 20,
        marginVertical: 3,
        fontWeight: "bold",
    },
    subtitle: {
        color: "lightgrey",

    }

})

export default ComingSoonScreen;