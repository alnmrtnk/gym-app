import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import Colors from '../../../assets/Colors';

const styles=StyleSheet.create({
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    padding: "5%",
    gap: 20,
  },
});

const GymScreen = ({navigation}) => {
  return (
    <View>
        <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
          <View style={styles.contentContainer}>
            <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
          </View>
        </HeaderBottomMenuComponent>
    </View>
  );
};

export default GymScreen;