import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../../assets/Colors';
import CircularGraph from '../CircularGraph';
import CaloriesDataMainPage from '../CaloriesDataMainPage';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';
import devConfig from '../../../config.development';
import { useToast } from 'react-native-toast-notifications';

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
    const toast = useToast();
    const [initialized, setInitialized] = useState(false);
    const {userId} = useContext(AuthContext);
    const [generalNumber, setGeneralNumber] = useState(1);
    const [consumedNumber, setConsumedNumber] = useState(0);

    useEffect(() => {
        if(!initialized){
            setInitialized(true);
            getData();
        }
    }, []);

    const getData = async() => {
        try{
            const response = await axios.get(`${devConfig.API_URL}/calories/${userId}`);
            console.log(response.data.consumedCalories, response.data.calories);
            setGeneralNumber(response.data.calories);
            setConsumedNumber(response.data.consumedCalories);
        }
        catch {
            toast.show('Failed to fetch calories data', { type: 'danger', placement: 'top'});
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Calories</Text>
        <Text style={styles.subText}>Remaining = Goal - Food</Text>
        <View style={styles.dataContainer}>
            <CircularGraph
            generalNumber = {generalNumber}
            consumedNumber = {consumedNumber}
            />
            <CaloriesDataMainPage
            baseGoal={generalNumber} 
            consumedFood={consumedNumber} 
            exercises={10}
            />
        </View>
    </View>
  );
};

export default CaloriesElementHome;