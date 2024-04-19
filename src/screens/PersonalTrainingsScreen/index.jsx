import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
  const openTrainerScreen = (index) => {
    navigation.navigate('Trainer', { index: index });
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
                  <Pressable key={index} onPress={() => openTrainerScreen(index)}>
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