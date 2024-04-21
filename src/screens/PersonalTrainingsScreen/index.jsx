import React, { useContext, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import TrainerContainer from '../../components/TrainerContainer';
import { useToast } from 'react-native-toast-notifications';
import axios from "axios";
import devConfig from "../../../config.development";
import AuthContext from '../../contexts/AuthContext';

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    padding: "5%",
    minHeight: 667,
  },
  trainersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
})

const PersonalTrainingsScreen = ({ navigation, route }) => {
  const [initialized, setInitialized] = React.useState(false);
  const toast = useToast();
  const [data, setData] = React.useState([]);
  const {dateFrom, dateTo, userId} = useContext(AuthContext);

  const openTrainerScreen = (id) => {
    navigation.navigate('Trainer', { id: id });
  }

  useEffect(() => {
    if(!initialized) {
      setInitialized(true);

      getData();
    }
  });

  const getData = async() => {
    try{
      const params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        userId: userId
      }

      const response = await axios.get(`${devConfig.API_URL}/trainers`, {params});
      
      setData(response.data);
    }
    catch(error){
      toast.show("Something went wrong on the server", { type: "danger", placement: "top" });
    }
  }

  return (
    <View>
      <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
        <View style={styles.contentContainer}>
          <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
          <ScrollView style={styles.trainersContainer}>
            {
              data.map((trainer, index) => {
                return (
                  <Pressable key={trainer._id} onPress={() => openTrainerScreen(trainer._id)}>
                    <TrainerContainer trainer={trainer} />
                  </Pressable>
                )
              })
            }
          </ScrollView>
        </View>
      </HeaderBottomMenuComponent>
    </View>
  );
};

export default PersonalTrainingsScreen;