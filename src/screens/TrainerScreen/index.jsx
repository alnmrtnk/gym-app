import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import data from '../../trainers';
import IndividualTrainerContainer from '../../components/IndividualTrainerContainer';

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

const TrainerScreen = ({navigation, route}) => {
    console.log(route.params.index);

    const trainer = data[route.params.index];

    return (
        <View>
            <View>
                <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
                    <View style={styles.contentContainer}>
                        <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
                        <View>
                            <IndividualTrainerContainer trainer={trainer} />
                        </View>
                    </View>
                </HeaderBottomMenuComponent>
            </View>

        </View>
    );
};

export default TrainerScreen;