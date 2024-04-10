import React from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import groupTrainingsData from "../../groupTrainings";
import GroupTrainingItem from '../GroupTrainingItem';
import Colors from '../../../assets/Colors';

const AgendaCalendar = () => {
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

    // Specify how each date should be rendered. day can be undefined if the item is not first in that day
    const renderEmptyDay = () => {
        return <View />;
    };

    //returns card for empty slots.
    const renderEmptyItem = () => {
        return (
            <Text >
                No slots in the calendar
            </Text>
        );
    };

    // Specify how each item should be rendered in the agenda
    const renderItems = (item, firstItemInDay) => {
        return <GroupTrainingItem training={item} showHeader={firstItemInDay}/>;
    }

    const items = groupTrainingsData.reduce((acc, item) => {
        const { startTime, date, duration, name, trainer, maxParticipants, participants } = item;
        /*
        startTime, date, duration, name, trainer, maxParticipants, participants
        */
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push({ startTime, date, duration, name, trainer, maxParticipants, participants });
        return acc;
    }, {});

    return (
        <View style={{flex: 1}}>
            <Agenda
                items = {items}
                renderDay={renderEmptyDay}
                renderEmptyData={renderEmptyItem}
                renderItem={renderItems}
                scrollEnabled={true}
                selected={new Date().toISOString().split('T')[0]} //Initially selected day
                hideKnob={false} // Hide knob button. Default = false
                showClosingKnob // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                theme={{
                    ...CALENDAR_THEME,
                }}
            />
        </View>
    );
};

export default AgendaCalendar;