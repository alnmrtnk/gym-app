import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, View, Text} from 'react-native';
import Colors from '../../../assets/Colors';
import FormsInput from '../../components/FormsInput';
import UserSVG from "../../../assets/user.svg";
import PasswordSVG from "../../../assets/password.svg";
import EmailSVG from "../../../assets/email.svg";
import PhoneSVG from "../../../assets/phone.svg";
import { userCanSignUp } from '../../services/userService';
import AuthContext from '../../contexts/AuthContext';
import { useToast } from 'react-native-toast-notifications';
import devConfig from "../../../config.development";
import axios from "axios";


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%",
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        paddingBottom: "15%",
        paddingTop: "10%",
        gap: 50,
    },
    containerInput: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%",
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
    'create-account-button': {
        backgroundColor: Colors.BUTTONS_BACKGROUND_COLOR,
        width: 250,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    "create-account-text": {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: Colors.BUTTONS_TEXT_COLOR,
        fontFamily: "nunito-bold",
        fontWeight: "bold",
    },
    "login-button": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    "question-text": {
        fontFamily: "nunito-bold",
        fontSize: 17,
    },
    "login-text": {
        fontFamily: "nunito-bold",
        color: Colors.PRIMARY_COLOR,
        fontSize: 18,
    }
});

const SignUpScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");

    const { setIsLoggedIn, setUserId } = useContext(AuthContext);

    const toast = useToast();

    const createAccountPressed = async () => {
        const response = await userCanSignUp(userData, confirmPassword);
        if (response.success) {
            try{
                const serverResponse = await axios.post(`${devConfig.API_URL}/signup`, {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone
                });

                setUserId(serverResponse.data.userId);
    
                setIsLoggedIn(true);
            }
            catch(error){
                console.log(error);
                toast.show("User already exists", { type: "warning", placement: "top"});
            }
        }
        else {
            toast.show(response.message, {
                type: "error",
                placement: "top",
            });
        }
    }

    const loginPressed = () => {
        navigation.navigate("Login");
        navigation.setOptions({ setIsLoggedIn: setIsLoggedIn });
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <Text style={styles['header-text']}>Create Account</Text>
                <Text style={styles['sign-in-text']}>Create a new account to continue</Text>
                <FormsInput
                    Icon={UserSVG}
                    label={"NAME"}
                    onChangeText={(text) => setUserData({ ...userData, name: text })}
                />
                <FormsInput
                    Icon={EmailSVG}
                    label={"EMAIL"}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <FormsInput
                    Icon={PhoneSVG}
                    label={"PHONE"}
                    onChangeText={(text) => setUserData({ ...userData, phone: text })}
                />
                <FormsInput
                    Icon={PasswordSVG}
                    label={"PASSWORD"}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                />
                <FormsInput
                    Icon={PasswordSVG}
                    label={"CONFIRM PASSWORD"}
                    onChangeText={setConfirmPassword}
                />
                <Pressable
                    onPress={createAccountPressed}
                    style={styles['create-account-button']}
                >
                    <Text style={styles['create-account-text']}>CREATE ACCOUNT</Text>
                </Pressable>
            </View>
            <Pressable style={styles['login-button']}>
                <Text style={styles["question-text"]}>Already have an account?</Text>
                <Text style={styles["login-text"]} onPress={loginPressed}>Login</Text>
            </Pressable>
        </View>
    );
};

export default SignUpScreen;