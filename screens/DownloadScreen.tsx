import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../components/Themed';
import * as movieActions from '../store/actions/movie';

function DownloadScreen() {
    const videos = useSelector((state) => state.movies.availableMovies);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <TouchableOpacity
                onPress={async () => {
                    await movieActions.fetchMovies();
                    console.log("Videos form reducer : ", videos)
                }}
            />
        </View>
    );
}

export default DownloadScreen;