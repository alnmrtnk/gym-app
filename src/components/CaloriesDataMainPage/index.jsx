import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import FireSVG from '../../../assets/fire.svg';
import BroccoliSVG from '../../../assets/broccoli.svg';
import FlagSVG from '../../../assets/flag.svg';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    subContainer: {
        width: "fit-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    subTextContainer: {
        width: "fit-content",
    },
    header: {
        width: "fit-content",
        color: Colors.GREY_TEXT_COLOR,
        fontFamily: "nunito-bold",
        fontSize: 16,
    },
    subHeader: {    
        color: Colors.DARK_TEXT_COLOR,
        fontFamily: "nunito-bold",
        fontSize: 20,
    },

});

const CaloriesDataMainPage = ({baseGoal, consumedFood, exercises}) => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <FlagSVG width={40} height={40}/>
                <View style={styles.subTextContainer}>
                    <Text style={styles.header}>Base Goal</Text>
                    <Text style={styles.subHeader}>{baseGoal}</Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                <BroccoliSVG width={40} height={40}/>
                <View style={styles.subTextContainer}>
                    <Text style={styles.header}>Food</Text>
                    <Text style={styles.subHeader}>{consumedFood}</Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                <FireSVG width={40} height={40}/>
                <View style={styles.subTextContainer}>
                    <Text style={styles.header}>Exercises</Text>
                    <Text style={styles.subHeader}>{exercises}</Text>
                </View>
            </View>
        </View>
    );
};

export default CaloriesDataMainPage;