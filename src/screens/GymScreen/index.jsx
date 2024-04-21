import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import Colors from '../../../assets/Colors';
import DateTimePicking from '../../components/DateTimePicking';
import GymInfoData from '../../components/GymInfoData';
import { useToast } from 'react-native-toast-notifications';
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

const convertToUTC = (date) => {
  const localDate = new Date(date);
  const offset = localDate.getTimezoneOffset();
  localDate.setMinutes(localDate.getMinutes() - offset);
  return localDate;
};

const OPENING_TIME = { hour: 7, minute: 0 };
const CLOSING_TIME = { hour: 22, minute: 0 };

const GymScreen = ({ navigation }) => {
  const toast = useToast();
  
  const {dateFrom, setDateFrom, dateTo, setDateTo} = useContext(AuthContext);

  const switchPage = () => {
    setDateFrom(convertToUTC(dateFrom));
    setDateTo(convertToUTC(dateTo));

    const openingMinutes = OPENING_TIME.hour * 60 + OPENING_TIME.minute;
    const closingMinutes = CLOSING_TIME.hour * 60 + CLOSING_TIME.minute;

    const dateFromMinutes = dateFrom.getHours() * 60 + dateFrom.getMinutes();
    const dateToMinutes = dateTo.getHours() * 60 + dateTo.getMinutes();

    const isValidDateFrom = dateFromMinutes >= openingMinutes && dateFromMinutes < closingMinutes;
    const isValidDateTo = dateToMinutes >= openingMinutes && dateToMinutes < closingMinutes;

    if (!isValidDateFrom || !isValidDateTo) {
      toast.show("Gym is not open at the selected times. Please select a different time.", { type: "info", placement: "top" })
      return;
    }

    navigation.navigate('PersonalTrainings');
    navigation.setOptions({dateFrom: dateFrom, dateTo: dateTo})
  }


  return (
    <View>
      <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
        <View style={styles.contentContainer}>
          <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
          <DateTimePicking dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} />
          <GymInfoData />
          <Pressable style={styles.findButton} onPress={switchPage}>
            <Text style={styles.buttonText}>Find a training</Text>
          </Pressable>
        </View>
      </HeaderBottomMenuComponent>
    </View>
  );
};

export default GymScreen;