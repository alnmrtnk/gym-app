import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import Colors from '../../../assets/Colors';
import DateTimePicking from '../../components/DateTimePicking';
import GymInfoData from '../../components/GymInfoData';

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    padding: "5%",
    minHeight: 667,
  },
  findButton: {
    alignSelf: "center",
    backgroundColor: Colors.BUTTONS_BACKGROUND_COLOR,
    width: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.BUTTONS_TEXT_COLOR,
    fontFamily: "nunito-bold",
    fontWeight: "bold",
},
});

const GymScreen = ({ navigation }) => {
  const switchPage = () => {
    navigation.navigate('PersonalTrainings');
  }

  return (
    <View>
      <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
        <View style={styles.contentContainer}>
          <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
          <DateTimePicking />
          <GymInfoData/>
          <Pressable style={styles.findButton} onPress={switchPage}>
            <Text style={styles.buttonText}>Find a training</Text>
          </Pressable>
        </View>
      </HeaderBottomMenuComponent>
    </View>
  );
};

export default GymScreen;