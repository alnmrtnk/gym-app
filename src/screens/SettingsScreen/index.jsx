import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable} from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import UserSVG from '../../../assets/userSettings.svg';
import AuthContext from '../../contexts/AuthContext';
import axios from "axios";
import devConfig from "../../../config.development";
import { useToast } from 'react-native-toast-notifications';

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    padding: "5%",
    minHeight: 667,
  },
  email: {
    color: Colors.PRIMARY_TEXT_COLOR,
    fontSize: 20,
    fontFamily: "nunito-bold",
    marginTop: 20,
  },
  actions: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  action: {
    color: Colors.PRIMARY_TEXT_COLOR,
    fontSize: 20,
    fontFamily: "nunito-bold",
    marginBottom: 20,
    marginTop: 20,
  }
})

const SettingsScreen = ({navigation}) => {
  const toast = useToast();
  const {userId, setIsLoggedIn, logout} = useContext(AuthContext);
  const [email, setEmail] = React.useState("");

  const getData = async() => {
    try{
      const response = await axios.get(`${devConfig.API_URL}/user/${userId}`);
      setEmail(response.data.email);
    }
    catch(error){
      toast.show("Something went wrong on the server", { type: "danger", placement: "top" });
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View>
        <HeaderBottomMenuComponent currentPage={3} navigation={navigation}>
            <View style={styles.contentContainer}>
              <UserSVG width={150} height={150} />
              <Text style={styles.email}>{email}</Text>
              <View style={styles.actions}>
                <Pressable onPress={() => navigation.navigate('Goal')}>
                  <Text style={styles.action}>Goal</Text>
                </Pressable>
                <Pressable onPress={logout}>
                  <Text style={styles.action}>Log out</Text>
                </Pressable>
              </View>
            </View>
        </HeaderBottomMenuComponent>
    </View>
  );
};

export default SettingsScreen;