import React from 'react';
import { Text, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';

const PersonalTrainingsScreen = ({navigation}) => {
  return (
    <View>
        <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
            <Text>Personal Trainings</Text>
        </HeaderBottomMenuComponent>
    </View>
  );
};

export default PersonalTrainingsScreen;