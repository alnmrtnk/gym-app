import React from 'react';
import { View, Text } from 'react-native';
import ShoeSVG from '../../../assets/shoe.svg';
import { ProgressBar } from 'react-native-paper';
import Colors from '../../../assets/Colors';

const StepsContainer = ({goal, done}) => {
  return (
    <View style={{backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR, padding: 15, borderRadius: 20, display: "flex", }}>
        <Text style={{fontFamily: "nunito-bold", fontSize: 20}}>Steps</Text>
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
            <ShoeSVG />
            <Text style={{fontFamily: "nunito-bold", fontSize: 20}}>{done}</Text>
        </View>
        <Text  style={{fontFamily: "nunito-bold", fontSize: 15, color: Colors.GREY_TEXT_COLOR}}>Goal: {goal} steps</Text>
        <ProgressBar style={{marginTop: 10}} progress={done/goal} color={Colors.VIOLET_ACCENT_COLOR} />
    </View>
  );
};

export default StepsContainer;