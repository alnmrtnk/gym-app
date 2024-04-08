import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import data from '../../trainers';
import TrainerContainer from '../../components/TrainerContainer';

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

const PersonalTrainingsScreen = ({ navigation }) => {
  return (
    <View>
      <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
        <View style={styles.contentContainer}>
          <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
          <ScrollView style={styles.trainersContainer}>
            {
              data.map((trainer, index) => {
                return (
                  <TrainerContainer key={index} trainer={trainer} />
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