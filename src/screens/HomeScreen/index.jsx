import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ScheduleText from '../../components/ScheduleText';
import Colors from '../../../assets/Colors';
import CaloriesElementHome from '../../components/CaloriesElementHome';
import StepsContainer from '../../components/StepsContainer';
import ExerciseComponentMainPage from '../../components/ExerciseComponentMainPage';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    padding: "5%",
    minHeight: 667,
  },
  bottomContentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  }
});

const HomeScreen = ({ navigation }) => {
  const [exercisesTime, setExercisesTime] = useState({ hours: 0, minutes: 10 });

  return (
    <View>
      <HeaderBottomMenuComponent currentPage={0} navigation={navigation}>
      <View style={styles.contentContainer}>
        <ScheduleText />
        <CaloriesElementHome />
        <View style={styles.bottomContentContainer}>
          <StepsContainer goal={15000} done={3550} />
          <ExerciseComponentMainPage burn={10} time={exercisesTime} />
        </View>
      </View>
      </HeaderBottomMenuComponent>
    </View>
  );
};

export default HomeScreen;