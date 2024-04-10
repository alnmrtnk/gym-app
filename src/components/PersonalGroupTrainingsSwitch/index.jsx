import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    switcherContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
    },
    header: {
        fontSize: 24,
        fontFamily: "nunito-bold",
    },
    switcherHeader: {
        fontSize: 16,
        fontFamily: "nunito-bold",
        width: 75,
        textAlign: "center",
    }
});

const PersonalGroupTrainingsSwitch = ({ index, navigation }) => {
    const [isEnabled, setIsEnabled] = useState(index === 1);
    const toggleSwitch = () => {
        navigation.navigate(index === 0 ? "GroupTrainings" : "Gym");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{index === 0 ? "Personal Trainings" : "Group Trainings"}</Text>
            <View style={styles.switcherContainer}>
                <Text style={styles.switcherHeader}>{index === 0 ? "Group" : "Personal"}</Text>
                <Switch
                    trackColor={{ false: '#C9DBD8', true: '#C9DBD8' }}
                    thumbColor={Colors.ACCENT_COLOR}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
};

export default PersonalGroupTrainingsSwitch;