import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LogoSVG from "../../../assets/logo.svg";
import PasswordSVG from "../../../assets/password.svg";
import FormsInput from '../../components/FormsInput';
import EmailSvg from "../../../assets/email.svg";
import Colors from '../../../assets/Colors';
import { userExists } from '../../services/userService';
import AuthContext from '../../contexts/AuthContext';
import axios from "axios";
import devConfig from "../../../config.development";
import { useToast } from "react-native-toast-notifications";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    paddingBottom: "10%",
  },
  "container-header-input": {
    display: "row",
    alignItems: "center",
    
  },
  "forget-password-container": {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    paddingRight: "5%",
  },
  "forget-password-text": {
    backgroundColor: 'transparent',
    color: Colors.PRIMARY_COLOR,
    fontFamily: "nunito-bold",
  },
  'login-button': {
    backgroundColor: Colors.BUTTONS_BACKGROUND_COLOR,
    width: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  "login-text": {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.BUTTONS_TEXT_COLOR,
    fontFamily: "nunito-bold",
    fontWeight: "bold",
  },
  "sign-up-button": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  "sign-in-text": {
    color: Colors.PRIMARY_COLOR,
    fontFamily: "nunito-bold",
    color: Colors.SECONDARY_HEADER_COLOR,
    fontSize: 18,
  },
  "header-text": {
    fontSize: 30,
    fontFamily: "nunito-bold",
  },
  "bottom-container": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 50,
  },
  "question-text": {
    fontFamily: "nunito-bold",
    fontSize: 17,
  },
  "sign-up-text": {
    fontFamily: "nunito-bold",
    color: Colors.PRIMARY_COLOR,
    fontSize: 18,
  }
});

const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({email: "", password: "" });
  const {setIsLoggedIn, setUserId} =  useContext(AuthContext);
  const toast = useToast();

  const signUpPressed = () => {
    navigation.navigate("SignUp");
    navigation.setOptions({ setIsLoggedIn: setIsLoggedIn });
  }

  const login = async() => {
    try {
      const serverResponse = await axios.post(`${devConfig.API_URL}/login`, {
        email: userData.email,
        password: userData.password,
      });

      setUserId(serverResponse.data.userId);

      setIsLoggedIn(true);
    }
    catch (error) {
      console.log(error);
      toast.show("User not found", { type: "danger", placement: "top"});
    }
  }

  const loginPressed = async() => {
    setIsLoggedIn(true);
    login();
  }

  return (
    <View style={styles.container}>
      <View style={styles["container-header-input"]}>
        <LogoSVG width={200} height={200} />
        <Text style={styles['header-text']}>Welcome Back</Text>
        <Text style={styles['sign-in-text']}>Sign in to continue</Text>
        <FormsInput
          Icon={EmailSvg}
          label={"EMAIL"}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
        <FormsInput
          Icon={PasswordSVG}
          label={"PASSWORD"}
          onChangeText={(text) => setUserData({ ...userData, password: text })}
        />
      </View>
      <View style={styles["bottom-container"]}>
        <View style={styles["forget-password-container"]}>
          <Pressable>
            <Text style={styles["forget-password-text"]}>Forgot Password?</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles['login-button']}
          onPress={login}
        >
          <Text style={styles['login-text']}>LOGIN</Text>
        </Pressable>
        <Pressable style={styles['sign-up-button']}>
          <Text style={styles["question-text"]}>Don't have an account?</Text>
          <Text style={styles["sign-up-text"]} onPress={signUpPressed}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;