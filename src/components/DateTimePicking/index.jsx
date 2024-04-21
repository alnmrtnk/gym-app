import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../../assets/Colors';

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

const OPENING_TIME = { hour: 7, minute: 0 };
const CLOSING_TIME = { hour: 22, minute: 0 };
const DIVIDING_DATE = (1000 * 60 * 60 * 24);

const DateTimePicking = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            const newDate = new Date(dateFrom);
            newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            setDateFrom(newDate);
        }
    };
    
    

    const onChangeFromTime = (event, selectedDate) => {
        if (selectedDate) {
            const newDate = new Date(dateFrom);
    
            newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
    
            const currentDate = new Date();
    
            if (newDate > currentDate) {
                setDateFrom(newDate);
            } else {
                setDateFrom(currentDate);
            }

            if(newDate > dateTo) {
                const newDateTo = new Date(newDate.getTime() + (60 * 60 * 1000));
                setDateTo(newDateTo);
            }
        }
    };    

    const onChangeToTime = (event, selectedDate) => {
        if (selectedDate) {
            const newDateTo = new Date(dateTo);
    
            newDateTo.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
    
            if (newDateTo <= dateFrom) {
                const adjustedDateTo = new Date(dateFrom.getTime() + (60 * 60 * 1000));  
                setDateTo(adjustedDateTo);
            } else {
                setDateTo(newDateTo);
            }
        }
    };    

    return (
        <View style={styles.container}>
            <DateTimePicker
                testID="dateTimePicker"
                value={dateFrom}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
            />
            <View style={styles.hoursContainer}>
                <View style={styles.hoursSubContainer}>
                    <Text style={styles.text}>From: </Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateFrom}
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