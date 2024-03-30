import React from 'react'
import { Button, Pressable, Text, View } from 'react-native';
import PlusSVG from '../../../assets/plus.svg';
import FireSVG from '../../../assets/fire.svg';
import ClockSVG from '../../../assets/time.svg';
import Colors from '../../../assets/Colors';

const ExerciseComponentMainPage = ({ burn, time }) => {
    return (
        <View style={{ backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR, padding: 15, borderRadius: 20, display: "flex", }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text  style={{fontFamily: "nunito-bold", fontSize: 20}}>Exercises</Text>
                <Pressable>
                    <PlusSVG />
                </Pressable>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "space-between", gap: 10}}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <FireSVG width={40} height={40}/>
                    <Text style={{fontFamily: "nunito-bold", fontSize: 18}}>{burn} kcal</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center",  gap: 5 }}>
                    <ClockSVG  width={40} height={40}/>
                    <Text  style={{fontFamily: "nunito-bold", fontSize: 18}}>{time.hours}:{time.minutes} hour</Text>
                </View>
            </View>
        </View>
    );
};

export default ExerciseComponentMainPage;