import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Alert, TextInput, StyleSheet, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../components/Themed';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as authActions from "../store/actions/Auth";
import * as movieActions from '../store/actions/movie';
import { loginUser } from '../store/actions/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { string } from 'yup/lib/locale';


function LoginScreen() {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [userToken, setUserToken] = useState();



    // const getMovie = async () => {
    //     try {
    //         await dispatch(movieActions.fetchMovies());
    //         console.log("Movies fetched");
    //     } catch (err: any) {
    //         alert(err.message);
    //     }

    // }
    // useEffect(() => {
    //     getMovie();
    // })

    const dispatch = useDispatch()
    const login = async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);



        try {
            // props.navigation.navigate("Auth");
            await dispatch(authActions.loginUser(email, password))

        } catch (error: any) {
            setIsLoading(false)
            setError(error)
            alert(error.message);
        }
    }

    let validate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5r,}$/;
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is Required').email('Invalid email format, your email must have (@) and (.com)').label("Email"),
        password: Yup.string().trim().min(5, `your password should be atlest ${5} character`).required('Please Enter your password'),
    });
    const navigation = useNavigation();
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                    size="large"
                    color="#c75a5f"
                />
            </View>
        )
    }
    return (
        <ScrollView style={{ backgroundColor: '#000' }}>
            <View style={styles.screen}>
                <Image
                    style={{ width: '75%', height: 100, marginTop: '17%', marginBottom: "6%", }}
                    source={require('../assets/images/nt.png')}
                />
                <Ionicons
                    style={{ marginBottom: 30, width: 120, alignSelf: 'center' }}
                    name="ios-person-outline" size={114} color="#c75a5f" />
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={() => console.log('this is my submit form methode')}
                    validateOnMount={true}
                >
                    {({ values, errors, handleBlur, touched, handleChange }) => {
                        const { email, password } = values;
                        console.log('My values object', values)
                        return (
                            <>
                                <View style={styles.cart}>
                                    <View style={styles.container}>
                                        <View style={styles.input}>
                                            <MaterialCommunityIcons
                                                style={{ padding: 10, }}
                                                name="email" size={28} color="#000" />
                                            <TextInput
                                                placeholder="Email"
                                                keyboardType="email-address"
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                onChangeText={handleChange('email')}
                                            />
                                        </View>
                                        {errors ? <Text style={{ color: 'red' }}> {touched.email && errors.email} </Text> : null}
                                        <View style={styles.input}>
                                            <MaterialCommunityIcons
                                                style={{ padding: 10, }}
                                                name="lock" size={26} color="#000" />
                                            <TextInput
                                                placeholder="Password"
                                                secureTextEntry={true}
                                                keyboardType="default"
                                                onBlur={handleBlur('password')}
                                                textContentType="password"
                                                value={values.password}
                                                onChangeText={handleChange('password')}
                                            />
                                        </View>
                                        {errors ? <Text style={{ color: 'red' }}> {touched.password && errors.password} </Text> : null}
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={async () => {


                                                if (!values.email || !values.password) {
                                                    Alert.alert('Sorry!', 'your email or password field is empty', [{ text: 'Ok' }]);

                                                } else {
                                                    console.log(' this is before of call login method vlaues.Email', values.email, 'values .Password', values.password)
                                                    await login(values.email, values.password);
                                                    navigation.navigate('Home');
                                                    //alert(error)
                                                }

                                            }}>
                                            <Text style={{ color: "#FFF" }}> Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )
                    }}
                </Formik>

            </View>

        </ScrollView>

    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'

    },
    container: {
        flexDirection: 'column',
        width: '98%',
        height: 250,
        borderRadius: 25,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flexDirection: 'row',
        backgroundColor: '#c75a5f',
        width: '90%',
        height: 50,
        borderRadius: 25,
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#633f59',
        width: '90%',
        height: 40,
        borderRadius: 25,
        marginBottom: 20,
        marginTop: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cart: {
        backgroundColor: '#000',
        width: '85%',
        height: 270,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default LoginScreen;