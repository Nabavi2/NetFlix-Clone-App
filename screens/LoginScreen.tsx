// import React, { useState } from 'react';
// import * as Yup from 'yup';
// import { Formik, useFormik } from 'formik';
// import { TextInput, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { Text } from '../components/Themed';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// function LoginScreen() {
//     const login = () => {

//         navigation.navigate('Home')
//     }
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     let validate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5r,}$/;
//     const validationSchema = Yup.object().shape({
//         email: Yup.string().required('Required').email('Invalid email format, your email must have (@) and (.com)').label("Email"),
//         password: Yup.string().trim().min(5, `your password should be atlest ${5} character`).required('Please Enter your password'),
//     });
//     const navigation = useNavigation();
//     return (
//         <ScrollView style={{ backgroundColor: '#ccd6db' }}>
//             <View style={styles.screen}>

//                 <Image
//                     style={{ width: '75%', height: 100, marginTop: '17%', marginBottom: "6%", }}
//                     source={require('../assets/images/nt.png')}
//                 />
//                 <Ionicons
//                     style={{ marginBottom: 30, width: 120, alignSelf: 'center' }}
//                     name="person" size={114} color="black" />
//                 <Formik
//                     validationSchema={validationSchema}
//                     initialValues={{ email: '', password: '' }}
//                     onSubmit={login}
//                     validateOnMount={true}
//                 >
//                     {({ values, errors, handleBlur, touched, handleChange }) => {
//                         const { email, password } = values;
//                         console.log('My values object', values)
//                         return (
//                             <>
//                                 <View style={styles.cart}>
//                                     <View style={styles.container}>
//                                         <View style={styles.input}>
//                                             <MaterialCommunityIcons
//                                                 style={{ padding: 10, }}
//                                                 name="email" size={28} color="#000" />
//                                             <TextInput
//                                                 placeholder="Email"
//                                                 keyboardType="email-address"
//                                                 onBlur={handleBlur('email')}
//                                                 value={values.email}
//                                                 onChangeText={handleChange('email')}
//                                             />
//                                         </View>
//                                         {errors ? <Text style={{ color: 'red' }}> {touched.email && errors.email} </Text> : null}
//                                         <View style={styles.input}>
//                                             <MaterialCommunityIcons
//                                                 style={{ padding: 10, }}
//                                                 name="lock" size={26} color="#000" />
//                                             <TextInput
//                                                 placeholder="Password"
//                                                 secureTextEntry={true}
//                                                 keyboardType="default"
//                                                 onBlur={handleBlur('password')}
//                                                 textContentType="password"
//                                                 value={values.password}
//                                                 onChangeText={handleChange('password')}
//                                             />
//                                         </View>
//                                         {errors ? <Text style={{ color: 'red' }}> {touched.password && errors.password} </Text> : null}
//                                         <TouchableOpacity
//                                             style={styles.button}
//                                             onPress={login}>
//                                             <Text style={{ color: "#FFF" }}> Login</Text>
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
//         backgroundColor: '#ccd6db'

//     },
//     container: {
//         flexDirection: 'column',
//         width: '98%',
//         height: 250,
//         borderRadius: 25,
//         marginTop: 15,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     input: {
//         flexDirection: 'row',
//         backgroundColor: '#c75a5f',
//         width: '90%',
//         height: 50,
//         borderRadius: 25,
//         marginVertical: 5,
//     },
//     button: {
//         backgroundColor: '#633f59',
//         width: '90%',
//         height: 40,
//         borderRadius: 25,
//         marginBottom: 20,
//         marginTop: 7,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     cart: {
//         backgroundColor: '#FFF',
//         width: '85%',
//         height: 270,
//         borderRadius: 15,
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// })
// export default LoginScreen;