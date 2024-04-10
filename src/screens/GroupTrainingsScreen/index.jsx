import React from 'react';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import AgendaCalendar from '../../components/AgendaCalendar';

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

const GroupTrainingsScreen = ({ navigation }) => {
    return (
        <View>
            <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
                <View style={styles.contentContainer}>
                    <PersonalGroupTrainingsSwitch index={1} navigation={navigation} />
                    <AgendaCalendar/>
                </View>
            </HeaderBottomMenuComponent>
        </View>
    );
};

export default GroupTrainingsScreen;