import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View } from './Themed';

function StyledButton(props: any) {
    return (
        <TouchableOpacity style={styles.main} onPress={props.onPress}>
        <View style={{...styles.container, backgroundColor: props.color}}>
            {props.children}
        </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
    },
    main:{
        marginVertical: 5,
    }
})

export default StyledButton;