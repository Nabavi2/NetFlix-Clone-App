import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Alert,
  TextInput,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Text } from "../components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../store/actions/AuthAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

function LoginScreen() {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePasswordFocused = () => {
    setIsPasswordFocused(true);
  };
  const handleEmailFocused = () => {
    setIsEmailFocused(true);
  };

  const dispatch = useDispatch();
  const authHandler = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    let action: Function;
    if (isSignup) {
      action = await dispatch(authActions.signupUser(email, password));
    } else {
      action = await dispatch(authActions.loginUser(email, password));
    }
    try {
      action;
    } catch (error: any) {
      setIsLoading(false);
      setError(error);
      alert(error.message);
    }
  };

  let validate =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5r,}$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required")
      .email('Invalid email format, your email must have "@" and ".com"')
      .label("Email"),
    password: Yup.string()
      .trim()
      .min(5, `your password should be atlest ${5} character`)
      .required("Please Enter your password"),
    confirmPassword: Yup.string()
      .trim()
      .min(5, `your password should be atlest ${5} character`)
      .required("Please Reenter your password"),
  });
  const navigation = useNavigation();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <View style={styles.screen}>
        <Image
          style={{
            width: "75%",
            height: 100,
            marginTop: "17%",
            marginBottom: "10%",
          }}
          source={require("../assets/images/nt.png")}
        />
        <Text style={{ color: "#FFF", fontSize: 20, marginBottom: "15%" }}>
          {" "}
          Start your free three days trial
        </Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={() => console.log("this is my submit form methode")}
          validateOnMount={true}
        >
          {({ values, errors, handleBlur, touched, handleChange }) => {
            const { email, password } = values;
            console.log("My values object", values);
            return (
              <>
                <View style={styles.cart}>
                  <View style={styles.container}>
                    <View style={{ flexDirection: "row" }}>
                      <MaterialCommunityIcons
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          marginBottom: 5,
                        }}
                        name="email"
                        size={28}
                        color="#FFF"
                      />
                      <TextInput
                        style={[
                          styles.input,
                          {
                            borderColor: isEmailFocused
                              ? Colors.primary
                              : Colors.secondary,
                          },
                        ]}
                        onFocus={handleEmailFocused}
                        placeholder="Email"
                        placeholderTextColor={Colors.secondary}
                        keyboardType="email-address"
                        onBlur={handleBlur("email")}
                        value={email}
                        onChangeText={handleChange("email")}
                      />
                    </View>
                    {errors ? (
                      <Text
                        style={{
                          color: "red",
                          width: "70%",
                          paddingHorizontal: 10,
                        }}
                      >
                        {touched.email && errors.email}
                      </Text>
                    ) : null}
                    <View style={{ flexDirection: "row" }}>
                      <MaterialCommunityIcons
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          marginBottom: 5,
                        }}
                        name="lock"
                        size={26}
                        color="#FFF"
                      />
                      <TextInput
                        style={[
                          styles.input,
                          {
                            borderColor: isPasswordFocused
                              ? Colors.primary
                              : Colors.secondary,
                          },
                        ]}
                        placeholder="Password"
                        placeholderTextColor={Colors.secondary}
                        secureTextEntry={true}
                        keyboardType="default"
                        onBlur={handleBlur("password")}
                        onFocus={handlePasswordFocused}
                        textContentType="password"
                        value={password}
                        onChangeText={handleChange("password")}
                      />
                    </View>
                    {errors ? (
                      <Text style={{ color: "red" }}>
                        {" "}
                        {touched.password && errors.password}{" "}
                      </Text>
                    ) : null}
                    {isSignup ? (
                      <>
                        <View style={{ flexDirection: "row" }}>
                          <MaterialCommunityIcons
                            style={{
                              paddingTop: 10,
                              paddingBottom: 10,
                              marginBottom: 5,
                            }}
                            name="lock"
                            size={26}
                            color="#FFF"
                          />
                          <TextInput
                            style={[
                              styles.input,
                              {
                                borderColor: isPasswordFocused
                                  ? Colors.primary
                                  : Colors.secondary,
                              },
                            ]}
                            placeholder="Confirm Password"
                            placeholderTextColor={Colors.secondary}
                            secureTextEntry={true}
                            keyboardType="default"
                            onBlur={handleBlur("confirmPassword")}
                            onFocus={handlePasswordFocused}
                            textContentType="password"
                            value={values.confirmPassword}
                            onChangeText={handleChange("confirmPassword")}
                          />
                        </View>
                        {errors && (
                          <Text style={{ color: "red" }}>
                            {touched.confirmPassword && errors.confirmPassword}
                          </Text>
                        )}
                      </>
                    ) : null}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={async () => {
                        const token = await AsyncStorage.getItem("userData");
                        console.log("TTTTTOOOOOKKKKKEEEEENNNN  ", token);
                        if (
                          isSignup &&
                          values.password !== values.confirmPassword
                        ) {
                          Alert.alert(
                            "Attention!",
                            "Passwords don't match together!",
                            [{ text: "Ok", style: "destructive" }]
                          );
                        } else if (!values.email || !values.password) {
                          Alert.alert(
                            "Attention!",
                            "Please enter either your email and password!",
                            [{ text: "Ok", style: "destructive" }]
                          );
                        } else {
                          await authHandler(values.email, values.password);
                          navigation.navigate("Home");
                        }
                      }}
                    >
                      <Text style={{ color: "#FFF" }}>
                        {" "}
                        {isSignup ? "SignUp" : "Login"}{" "}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        backgroundColor: "#000",
                      }}
                      onPress={() => {
                        setIsSignup((prevState) => !prevState);
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          //   textDecorationLine: "underline",
                          borderBottomWidth: 1,
                          borderColor: "red",
                        }}
                      >
                        {" "}
                        {`Switch to ${isSignup ? "Login" : "Sign Up"}`}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "column",
    width: "98%",
    height: 250,
    borderRadius: 25,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  input: {
    flexDirection: "row",
    backgroundColor: "#000",
    width: "80%",
    height: 40,
    borderColor: Colors.secondary,
    borderBottomWidth: 1,
    color: "#FFF",
  },
  button: {
    backgroundColor: Colors.primary,
    width: "90%",
    height: 40,
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  cart: {
    backgroundColor: "#000",
    width: "85%",
    height: Dimensions.get("screen").height * 0.35,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoginScreen;
