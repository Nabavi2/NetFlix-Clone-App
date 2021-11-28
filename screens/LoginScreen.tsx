// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch } from "react-redux";
// import * as Yup from 'yup';
// import { Formik, useFormik } from 'formik';
// import { Alert, TextInput, StyleSheet, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
// import { Text } from '../components/Themed';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import * as authActions from "../store/actions/Auth";
// import * as movieActions from '../store/actions/movie';
// import { loginUser } from '../store/actions/Auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { string } from 'yup/lib/locale';


// function LoginScreen() {
//     const [isSignup, setIsSignup] = useState(false);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isEmailFocused, setIsEmailFocused] = useState(false);
//     const [isPasswordFocused, setIsPasswordFocused] = useState(false)


//     const handlePasswordFocused = () => {
//         setIsPasswordFocused(true)
//     }
//     const handleEmailFocused = () => {
//         setIsEmailFocused(true)
//     }
//     const handlePasswordBlur = () => {
//         setIsPasswordFocused(true)
//     }
//     const handleEmaildBlur = () => {
//         setIsEmailFocused(true)
//     }

//     const dispatch = useDispatch()
//     const authHandler = async (email: string, password: string) => {
//         setError(null);
//         setIsLoading(true);
//         let action;
//         if (isSignup) {
//             action = await dispatch(authActions.signupUser(email, password))
//         } else {
//             action = await dispatch(authActions.loginUser(email, password))
//         }
//         try {
//             await dispatch(action)
//         } catch (error: any) {
//             setIsLoading(false)
//             setError(error)
//             alert(error.message);
//         }
//     }

//     let validate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5r,}$/;
//     const validationSchema = Yup.object().shape({
//         email: Yup.string().required('Email is Required').email('Invalid email format, your email must have (@) and (.com)').label("Email"),
//         password: Yup.string().trim().min(5, `your password should be atlest ${5} character`).required('Please Enter your password'),
//     });
//     const navigation = useNavigation();
//     if (isLoading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <ActivityIndicator
//                     size="large"
//                     color="#c75a5f"
//                 />
//             </View>
//         )
//     }
//     return (
//         <ScrollView style={{ backgroundColor: '#000' }}>
//             <View style={styles.screen}>
//                 <Image
//                     style={{ width: '75%', height: 100, marginTop: '17%', marginBottom: "10%", }}
//                     source={require('../assets/images/nt.png')}
//                 />
//                 {/* <Ionicons
//                     style={{ marginBottom: 30, width: 120, alignSelf: 'center' }}
//                     name="ios-person-outline" size={114} color="#E50914" /> */}
//                 <Text style={{ color: '#FFF', fontSize: 20, marginBottom: '15%' }}> Start your free three days trial</Text>
//                 <Formik
//                     validationSchema={validationSchema}
//                     initialValues={{ email: '', password: '' }}
//                     onSubmit={() => console.log('this is my submit form methode')}
//                     validateOnMount={true}
//                 >
//                     {({ values, errors, handleBlur, touched, handleChange }) => {
//                         const { email, password } = values;
//                         console.log('My values object', values)
//                         return (
//                             <>
//                                 <View style={styles.cart}>
//                                     <View style={styles.container}>
//                                         <View style={{ flexDirection: 'row-reverse' }}>
//                                             <MaterialCommunityIcons
//                                                 style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 5, }}
//                                                 name="email" size={28} color="#FFF" />
//                                             <TextInput
//                                                 style={[styles.input, {
//                                                     borderColor: isEmailFocused ? 'red' : 'grey'
//                                                 }]}
//                                                 onFocus={handleEmailFocused}
//                                                 placeholder="Email"
//                                                 placeholderTextColor='#423e3e'
//                                                 keyboardType="email-address"
//                                                 onBlur={handleBlur('email')}
//                                                 value={values.email}
//                                                 onChangeText={handleChange('email')}
//                                             />
//                                         </View>
//                                         {errors ? <Text style={{ color: 'red' }}> {touched.email && errors.email} </Text> : null}
//                                         <View style={{ flexDirection: 'row-reverse' }}>
//                                             <MaterialCommunityIcons
//                                                 style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 5, }}
//                                                 name="lock" size={26} color="#FFF" />
//                                             <TextInput
//                                                 style={[styles.input, {
//                                                     borderColor: isPasswordFocused ? 'red' : 'grey'
//                                                 }]}
//                                                 placeholder="Password"
//                                                 placeholderTextColor='#423e3e'
//                                                 secureTextEntry={true}
//                                                 keyboardType="default"
//                                                 onBlur={handleBlur('password')}
//                                                 onFocus={handlePasswordFocused}
//                                                 textContentType="password"
//                                                 value={values.password}
//                                                 onChangeText={handleChange('password')}
//                                             />
//                                         </View>
//                                         {errors ? <Text style={{ color: 'red' }}> {touched.password && errors.password} </Text> : null}
//                                         <TouchableOpacity
//                                             style={styles.button}
//                                             onPress={async () => {
//                                                 const token = await AsyncStorage.getItem("userData");
//                                                 console.log('TTTTTOOOOOKKKKKEEEEENNNN  ', token);
//                                                 if (!values.email || !values.password) {
//                                                     Alert.alert('Sorry!', 'your email or password field is empty or you did not authenticate ', [{ text: 'Ok' }]);

//                                                 } else {
//                                                     await authHandler(values.email, values.password);
//                                                     navigation.navigate('Home');
//                                                 }

//                                             }}>
//                                             <Text style={{ color: "#FFF" }}> {isSignup ? 'SignUp' : 'Login'} </Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             style={{ ...styles.button, borderWidth: 1, borderColor: '#c41a1a', backgroundColor: '#000', }}
//                                             onPress={() => {
//                                                 setIsSignup((prevState) => !prevState);
//                                             }}
//                                         >
//                                             <Text style={{ color: "#FFF" }}> {`Switch to ${isSignup ? "Login" : "Sign Up"}`} </Text>

//                                         </TouchableOpacity>

//                                     </View>

//                                 </View>
//                             </>
//                         )
//                     }}
//                 </Formik>

//             </View>

//         </ScrollView>

//     );
// }
// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#000'

//     },
//     container: {
//         flexDirection: 'column',
//         width: '98%',
//         height: 250,
//         borderRadius: 25,
//         marginTop: 15,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 50,
//     },
//     input: {
//         flexDirection: 'row-reverse',
//         backgroundColor: '#000',
//         width: '80%',
//         height: 40,
//         borderColor: '#423e3e',
//         borderBottomWidth: 1,
//         color: '#FFF'
//     },
//     button: {
//         backgroundColor: '#c41a1a',
//         width: '90%',
//         height: 40,
//         borderRadius: 25,
//         marginBottom: 10,
//         marginTop: 7,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     // snignupBotton: {
//     //     backgroundColor: '#000',
//     //     borderColor: '#633f59',
//     //     borderWidth: 1,
//     //     width: '90%',
//     //     height: 40,
//     //     borderRadius: 25,
//     //     marginBottom: 20,
//     //     marginTop: 7,
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     // },
//     cart: {
//         backgroundColor: '#000',
//         width: '85%',
//         height: 270,
//         borderRadius: 15,
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// })
// export default LoginScreen;