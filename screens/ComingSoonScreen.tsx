import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import ComingSoonItem from "../components/ComingSoonItem";
import { fetchComingSoons } from "../store/actions/Comingsoon";
import HomeScreen from "./HomeScreen";
function ComingSoonScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const comSonList = useSelector((state) => state.comingSoon.comingSoonList);

  const loadComingSoon = useCallback( async () => {
      setIsLoading(true);
    try{
        await dispatch(fetchComingSoons());
    }catch(err){
        alert(err);
    }
    setIsLoading(false);
    
}, [dispatch,]);

 
 useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadComingSoon);
    return () => {
        unsubscribe();
    }
 });


  useEffect(() => {
      setIsLoading(true);
      loadComingSoon().then(() => setIsLoading(false));        
  }, [dispatch, loadComingSoon]);
  console.log("commmmmming");
  console.log(comSonList);
  
  if(isLoading){
      return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="red" />
      </View>
  }
  
  return (
    <FlatList
      data={comSonList}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => <ComingSoonItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({});

export default ComingSoonScreen;
