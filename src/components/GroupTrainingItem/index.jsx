import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../assets/Colors';
import PlusSVG from "../../../assets/plus.svg";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        marginTop: 7.5,
        marginBottom: 7.5,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        borderRadius: 20,
        marginVertical: 5
    },
    weekday: {
        fontFamily: "nunito-bold", 
        fontSize: 18,
        paddingLeft: 10
    },
    timeContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    }
})

const GroupTrainingItem = ({ training, showHeader }) => {
    const dateParts = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).formatToParts(new Date(training.date));

    const dateComponents = dateParts.reduce((acc, part) => {
        if (part.type !== 'literal') {
          acc[part.type] = part.value;
        }
        return acc;
      }, {});

    return (
        <View>
            {
                showHeader && 
                <View style={{display: "flex", flexDirection: "row", gap: 10, alignItems: "center", paddingTop: 20}}>
                    <Text style={styles.weekday}>{dateComponents.weekday}</Text>
                    <Text style={{fontFamily: "nunito-bold", fontSize: 16, color: Colors.GROUP_DATE_COLOR}}>{dateComponents.day} {dateComponents.month} {dateComponents.year}</Text>
                </View>
            }
            
            <View style={styles.container}>
                <View style={styles.timeContainer}>
                    <Text style={{fontFamily: "nunito-bold", fontSize: 18, color: Colors.VIOLET_ACCENT_COLOR}}>{training.startTime}</Text>
                    <Text style={{fontFamily: "nunito-bold", fontSize: 20, color: Colors.GREY_TEXT_COLOR}}>{training.duration}</Text>
                </View>
                <View style={{minWidth: 100}}>
                    <Text style={{fontFamily: "nunito-bold", fontSize: 18}}>{training.name}</Text>
                    <Text style={{fontFamily: "nunito-bold", fontSize: 17}}>{training.trainer}</Text>
                </View>
                <Text style={{fontFamily: "nunito-bold"}}>
                    {training.participants}/{training.maxParticipants} people
                </Text>
                <Pressable>
                    <PlusSVG/>
                </Pressable>
            </View>
        </View>
    );
};

export default GroupTrainingItem;