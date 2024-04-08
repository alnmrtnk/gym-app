import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import { data as trainers } from '../../trainers';

const styles = StyleSheet.create({ 
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    padding: "5%",
    minHeight: 667,
  },
})

const PersonalTrainingsScreen = ({navigation}) => {
  return (
    <View>
        <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
            <ScrollView style={styles.contentContainer}>
            <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
            {
                trainers.map((trainer, index) => {
                    return (
                        
                    )
                })
            }
            </ScrollView>
        </HeaderBottomMenuComponent>
    </View>
  );
};

export default PersonalTrainingsScreen;