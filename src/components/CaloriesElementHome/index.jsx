import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../../assets/Colors';
import CircularGraph from '../CircularGraph';
import CaloriesDataMainPage from '../CaloriesDataMainPage';

const styles = StyleSheet.create({
    container : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        padding: 15,
        borderRadius: 20,
    },
    heading: {
        fontSize: 24,
        fontFamily: "nunito-bold",
        color: Colors.DARK_TEXT_COLOR,
        fontWeight: "bold",
    },
    subText: {
        fontSize: 20,
        fontFamily: "nunito-regular",
        color: Colors.GREY_TEXT_COLOR,
    },
    dataContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
    },
    bottomDataContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
    }
});

const CaloriesElementHome = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Calories</Text>
        <Text style={styles.subText}>Remaining = Goal - Food</Text>
        <View style={styles.dataContainer}>
            <CircularGraph
            generalNumber = {1510}
            consumedNumber = {500}
            />
            <CaloriesDataMainPage
            baseGoal={1510} 
            consumedFood={500} 
            exercises={10}
            />
        </View>
    </View>
  );
};

export default CaloriesElementHome;