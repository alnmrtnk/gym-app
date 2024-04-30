import React from 'react'
import { View, Text } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Colors from '../../../assets/Colors';
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: Colors.SECONDARY_BACKGROUND_COLOR,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: Colors.SECONDARY_BACKGROUND_COLOR,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(105, 48, 195, ${opacity})`,
    strokeWidth: 3,
    barRadius: 40,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
};

const CircularGraph = ({ generalNumber, consumedNumber }) => {
    const data = {
        data: [consumedNumber / generalNumber]
    };

    return (
        <View style={{ height: "fit-content", width: "fit-content", display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
            <Text
                style={{
                    position: "absolute", top: "40%", left: "20%", zIndex: 3, fontSize: 18, color: Colors.DARK_TEXT_COLOR, 
                    fontFamily: "nunito-bold", width: 100, textAlign: "center", height: "fit-content"
                }}>
                {(generalNumber - consumedNumber).toFixed(0)} remaining
            </Text>
            <ProgressChart
                data={data}
                width={screenWidth / 2.5}
                height={220}
                strokeWidth={16}
                radius={70}
                chartConfig={chartConfig}
                hideLegend={true}
            />
        </View>
    );
};

export default CircularGraph;