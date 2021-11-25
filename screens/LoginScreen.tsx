import React, { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text, View } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import StyledButton from '../components/StyledButton';
import { Avatar, Button, Input} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/UserActions';



const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("password"),
});

function LoginScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleLogin = async (values: any) => {
        setError(null);
        setIsLoading(true);
        try{
          await dispatch(loginUser(values.email, values.password));
          console.log("login worked!");
          navigation.navigate("Root");
          setIsLoading(false);
        }catch(err: any){
          Alert.alert(err.message, "Your email or password is not correct!", [
              {
                  text: "Okay",
                  
              },
          ],);
          console.log("helllooooo"+ err);
        }
        setIsLoading(false);

    }
    
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20} >
           <View style={styles.container}>
            <Formik 
               initialValues={{ email: "", password: ""}}
               onSubmit={ handleLogin}
               validationSchema={validationSchema} >
                   { ({setFieldTouched, touched, errors, handleChange, handleSubmit, submitForm}) => <>{
                       <View style={styles.inputContainer}>
                       <Text style={styles.title}>NETFLIX</Text>
                       <Avatar 
                           rounded size="large"  
                           icon={{name: 'person', type: 'MaterialIcons'}} 
                           overlayContainerStyle={{backgroundColor: '#E50914'}}
                           containerStyle={styles.avatar} />
                        <Input
                        errorMessage={ touched["email"] ? errors["email"] : ""}
                        leftIcon={{name: "email", type: "MaterialIcons", color: "white"}}
                        placeholder="Email Address" 
                        placeholderTextColor="grey" 
                        keyboardType="email-address"
                        inputStyle={{color: "white", marginLeft: 5,}}
                        onBlur={() =>setFieldTouched("email")} 
                        onChangeText={ handleChange("email")} />
                     
                        <Input 
                        errorMessage={ touched["password"] ? errors["password"] : ""}
                        leftIcon={{name: "lock", type: "MaterialIcons", color: "white"}}
                        placeholder="Password" 
                        placeholderTextColor="grey" 
                        secureTextEntry={true}
                        inputStyle={{color: "white", marginLeft: 5,}}
                        onBlur={() =>setFieldTouched("password")} 
                        onChangeText={ handleChange("password")}  />
                       
                        
                        <View style={styles.buttonContainer} >
                        <Button 
                         loading={isLoading}
                         title="Login" 
                           type="solid" 
                           buttonStyle={styles.button}
                           titleStyle={{width: "100%"}} 
                           onPress={ () => handleSubmit()}
                            />
                        </View>
                    </View>
                   }</> }
         </Formik>
        </View>    
         </KeyboardAvoidingView>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#E50914",
        fontSize: 38,
        fontWeight: "600",
    },
    avatar: {
        marginVertical: 20,
    },
    container: {
        paddingTop: 200,
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "black"
    },
    inputContainer: {
        alignItems: "center",
        width: "80%",
        
        justifyContent: "space-around",
        backgroundColor: "black",

    },
    button:{
        // alignSelf: "center",
        backgroundColor: "#E50914",
        // borderRadius: 25,
        width: "100%",
        overflow: "hidden",
    },
    buttonContainer: {
        overflow: "hidden",
        alignSelf: "center",
        width: "90%",
        borderRadius: 25,
        marginVertical: 10,
        backgroundColor: "black"
    },
    temp: {
        height: 300,
        width: 200,
        backgroundColor: "blue",
    }
})

export default LoginScreen;