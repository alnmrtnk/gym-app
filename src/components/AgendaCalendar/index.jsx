import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import GroupTrainingItem from '../GroupTrainingItem';
import Colors from '../../../assets/Colors';

const AgendaCalendar = ({ key, groupTrainingsData, register }) => {
    const CALENDAR_THEME = {
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: Colors.VIOLET_ACCENT_COLOR,
        reservationsBackgroundColor: "fff",
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: Colors.VIOLET_ACCENT_COLOR,
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        textDayFontFamily: 'nunito-regular',
        textMonthFontFamily: 'nunito-regular',
        textDayHeaderFontFamily: 'nunito-regular',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14
    };

    const renderEmptyDay = () => {
        return <View />;
    };

    const renderEmptyItem = () => {
        return <Text style={{fontFamily: "nunito-bold", fontSize: 20, textAlign: 'center'}}>
            Unfortunately, there are no more training sessions today.
        </Text>;
    };

    const renderItems = (item, firstItemInDay) => {
        return <GroupTrainingItem training={item} showHeader={firstItemInDay} register={register}/>;
    };

    const items = groupTrainingsData.reduce((acc, item) => {
        const { _id, start_time, date, duration, name, trainer, max_participants, participants } = item;

        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push({ _id, start_time, date, duration, name, trainer, max_participants, participants });
        return acc;
    }, {});


    return (
        <View style={{flex: 1}}>
            <Agenda
                items={items}
                renderDay={renderEmptyDay}
                renderEmptyData={renderEmptyItem}
                renderItem={renderItems}
                scrollEnabled={true}
                selected={new Date().toISOString().split('T')[0]}
                hideKnob={false}
                showClosingKnob 
                theme={{
                    ...CALENDAR_THEME,
                }}
            />
        </View>
    );
};

export default AgendaCalendar;
