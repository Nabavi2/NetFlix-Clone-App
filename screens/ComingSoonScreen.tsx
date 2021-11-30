import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import ComingSoonItem from "../components/ComingSoonItem";
import { fetchComingSoons } from "../store/actions/Comingsoon";
import HomeScreen from "./HomeScreen";
function ComingSoonScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const comSonList = useSelector((state) => state.comingSoon.comingSoonList);

  const loadComingSoon = useCallback(async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(fetchComingSoons());
    } catch (err) {
      alert(err);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadComingSoon);
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    setIsLoading(true);
    loadComingSoon().then(() => setIsLoading(false));
  }, [dispatch, loadComingSoon]);
  console.log("commmmmming");
  console.log(comSonList);
  const na = useNavigation();
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: "black", }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <FlatList
     style={{backgroundColor: "black"}}
      refreshControl={
        <RefreshControl
        onRefresh={loadComingSoon}
        refreshing={isRefreshing}
          title="Pull to refresh"
          tintColor="#fff"
          titleColor="#fff"
          colors={["red"]}
        />
      }
      data={comSonList}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => <ComingSoonItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({});

export default ComingSoonScreen;
