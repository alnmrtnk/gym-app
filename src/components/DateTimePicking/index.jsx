import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../../assets/Colors';

const OPENING_HOUR = 7;
const CLOSING_HOUR = 23;
const DIVIDING_DATE = (1000 * 60 * 60 * 24);

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5%",
        gap: 20,
    },
    hoursContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 30,
    },
    hoursSubContainer: {
        display: "flex", 
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontFamily: 'nunito-bold',
        fontSize: 20,
    }
});

function getNextAvailableTime(currentDate) {
    const currentHour = currentDate.getHours() + 1;

    if (currentHour < OPENING_HOUR) {
        currentDate.setHours(OPENING_HOUR);
    }
    else if (currentHour >= CLOSING_HOUR) {
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(OPENING_HOUR);
        currentDate.setMinutes(0);
    }

    const oneHourInMil = 60 * 60 * 1000;

    const futureTimeStamp = new Date(currentDate.getTime() + oneHourInMil);

    if (futureTimeStamp.getHours() > CLOSING_HOUR) {
        futureTimeStamp.setHours(CLOSING_HOUR);
        futureTimeStamp.setMinutes(0);
    }


    return { current: currentDate, future: futureTimeStamp };
}


const DateTimePicking = () => {
    const dateTime = getNextAvailableTime(new Date());


    const [date, setDate] = useState(dateTime.current);
    const [dateTo, setDateTo] = useState(dateTime.future);


    const onChangeDate = (event, selectedDate) => {
        const nowDate = new Date();

        if (selectedDate.getTime() / DIVIDING_DATE > nowDate.getTime() / DIVIDING_DATE) {
            selectedDate.setHours(OPENING_HOUR);
            selectedDate.setMinutes(0);
            setDate(selectedDate);

            const futureDate = new Date(selectedDate.getTime() + (60 * 60 * 1000));
            setDateTo(futureDate);
        }
    };

    onChangeFromTime = (event, selectedDate) => {
        if (selectedDate.getHours() >= OPENING_HOUR && selectedDate.getHours() <= CLOSING_HOUR) {
            setDate(selectedDate);
        }
    };

    onChangeToTime = (event, selectedDate) => {
        if (selectedDate.getHours() >= OPENING_HOUR && selectedDate.getHours() <= CLOSING_HOUR) {
            setDateTo(selectedDate);
        }
    }

    return (
        <View style={styles.container}>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
            />
            <View style={styles.hoursContainer}>
                <View style={styles.hoursSubContainer}>
                    <Text style={styles.text}>From: </Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'time'}
                        is24Hour={true}
                        onChange={onChangeFromTime}
                    />
                </View>
                <View style={styles.hoursSubContainer}>
                    <Text style={styles.text}>To: </Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateTo}
                        mode={'time'}
                        is24Hour={true}
                        onChange={onChangeToTime}
                    />
                </View>
            </View>
        </View>
    );
};

export default DateTimePicking;