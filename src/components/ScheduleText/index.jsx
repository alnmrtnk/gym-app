import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({ 
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        backgroundColor: Colors.ACCENT_COLOR,
        height: 120,
        padding: "5%",
        borderRadius: 25,
    },
    heading: {
        fontSize: 24,
        fontFamily: "nunito-bold",
        color: Colors.BUTTONS_TEXT_COLOR,
        fontWeight: "bold",
    },
    subText: {
        fontSize: 20,
        fontFamily: "nunito-regular",
        color: Colors.BUTTONS_TEXT_COLOR,
    },
});

const ScheduleText = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Open Today</Text>
        <Text style={styles.subText}>7:00 a.m. - 10:00 p.m</Text>
    </View>
  );
};

export default ScheduleText;