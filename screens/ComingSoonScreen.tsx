import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import HomeScreen from './HomeScreen';
function ComingSoonScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 22, color: 'blue', fontWeight: 'bold' }}> The  NetFlix Movie and series trailer </Text>
            {/* <HomeScreen /> */}
            <View>
                <Image style={{width: 300, height: 200, }} resizeMode="cover" source={{uri: "https://res.cloudinary.com/tutia-tech/image/upload/v1637753371/imperial_Dreams_8e5c58475c.jpg?651474.5"}} />
                <View>
                  <Text style={{color: 'white'}}>Thor: Sister Return</Text>    
                  <Text style={{color: 'white'}} >Elen suzi, Haguard Plen, Micheal Teli</Text>    
                </View> 
            </View>
        </View>
    );
}

export default ComingSoonScreen;