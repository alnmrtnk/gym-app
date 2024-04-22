import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../../assets/Colors';
import CircularProgressChart from '../CircularProgressChart';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        width: "100%",
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
    },
    graphsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
    innerTextContainer: {
        position: "absolute",
        top: "35%",
        left: "10%",
        zIndex: 3,
        fontSize: 18,
        color: Colors.DARK_TEXT_COLOR,
        fontFamily: "nunito-bold",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "fit-content"
    },
    innerTopText: {
        textAlign: "center",
        width: 100,
        fontSize: 20,
        fontFamily: "nunito-black"
    },
    innerBottomText: {
        textAlign: "center",
        width: 100,
        fontSize: 14,
        fontFamily: "nunito-black",
        color: Colors.LIGHT_GREY_COLOR
    },
    header: {
        fontSize: 24,
        fontFamily: "nunito-black",
        color: Colors.DARK_TEXT_COLOR,
        marginLeft: 10
    },
    caloriesContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 20
    },
    caloriesContainerMainText: {
        fontSize: 16,
        fontFamily: "nunito-bold",
        color: Colors.DARK_TEXT_COLOR
    },
    caloriesContainerMainText: {
        fontSize: 18,
        fontFamily: "nunito-bold",
        color: Colors.DARK_TEXT_COLOR
    },
    caloriesContainerText: {
        fontSize: 16,
        fontFamily: "nunito-bold",
        color: Colors.LIGHT_GREY_COLOR
    }
});

const MacrosComponent = ({
    totalCalories, totalProtein, totalFat, totalCarbs, 
    caloriesRestriction, proteinRestriction, fatRestriction, carbsRestriction
}) => {
    const Carbohydrates = { consumed: totalCarbs, general: carbsRestriction };
    const Fats = { consumed: totalFat, general: fatRestriction };
    const Proteins = { consumed: totalProtein, general: proteinRestriction };
    const Calories = { consumed: totalCalories, general: caloriesRestriction };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Macros</Text>
            <View style={styles.graphsContainer}>
                <CircularProgressChart
                    data={[(Carbohydrates.consumed / Carbohydrates.general) < 1 ? Carbohydrates.consumed / Carbohydrates.general : (Carbohydrates.consumed - Carbohydrates.general) / Carbohydrates.consumed]}
                    topText={"Carbs"}
                    InnerText={
                        <View style={styles.innerTextContainer}>
                            <Text style={{ ...styles.innerTopText, color: 'rgb(83, 144, 217)' }}>{Carbohydrates.consumed}</Text>
                            <Text style={styles.innerBottomText}>/{Carbohydrates.general}g</Text>
                        </View>}
                    bottomText={Carbohydrates.general - Carbohydrates.consumed + "g left"}
                    size={120}
                    textColor={"83, 144, 217"}
                />
                <CircularProgressChart
                    data={[(Fats.consumed / Fats.general) < 1 ? Fats.consumed / Fats.general : (Fats.consumed - Fats.general) / Fats.consumed]}
                    topText={"Fats"}
                    InnerText={
                        <View style={styles.innerTextContainer}>
                            <Text style={{ ...styles.innerTopText, color: 'rgb(72, 191, 227)' }}>{Fats.consumed}</Text>
                            <Text style={styles.innerBottomText}>/{Fats.general}g</Text>
                        </View>}
                    bottomText={Fats.general - Fats.consumed + "g left"}
                    size={120}
                    textColor={"72, 191, 227"}
                />
                <CircularProgressChart
                    data={[(Proteins.consumed / Proteins.general) < 1 ? Proteins.consumed / Proteins.general : (Proteins.consumed - Proteins.general) / Proteins.consumed]}
                    topText={"Proteins"}
                    InnerText={
                        <View style={styles.innerTextContainer}>
                            <Text style={{ ...styles.innerTopText, color: 'rgb(114, 239, 221)' }}>{Proteins.consumed}</Text>
                            <Text style={styles.innerBottomText}>/{Proteins.general}g</Text>
                        </View>}
                    bottomText={Proteins.general - Proteins.consumed + "g left"}
                    size={120}
                    textColor={"114, 239, 221"}
                />
            </View>
            <View style={styles.caloriesContainer}>
                <Text style={styles.caloriesContainerMainText}>{Calories.consumed} cal / {Calories.general} cal</Text>
                <Text style={styles.caloriesContainerText}>{Calories.general - Calories.consumed} cal left</Text>
            </View>
        </View>
    );
};



export default MacrosComponent;