import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import Colors from '../../../assets/Colors';

const style = StyleSheet.create({
    topText: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: "nunito-bold"
    },
    bottomText: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: "nunito-bold",
        color: Colors.LIGHT_GREY_COLOR
    }
});

const CircularProgressChart = ({ data, topText, InnerText, bottomText, size, textColor }) => {
    return (
        <View>
            <Text style={{...style.topText, color: `rgb(${textColor})`}}>{topText}</Text>
            {InnerText}
            <ProgressChart
                data={{ data }}
                width={size}
                height={size}
                strokeWidth={size / 9}
                radius={size / 2.5}
                chartConfig={{
                    color: (opacity = 1) => `rgba(${textColor}, ${opacity})`,
                    backgroundGradientFrom: Colors.SECONDARY_BACKGROUND_COLOR,
                    backgroundGradientFromOpacity: 1,
                    backgroundGradientTo: Colors.SECONDARY_BACKGROUND_COLOR,
                    backgroundGradientToOpacity: 1,
                    strokeWidth: 3,
                    barRadius: 40,
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false
                }}
                hideLegend={true}
            />
            <Text style={style.bottomText}>{bottomText}</Text>
        </View>
    );
};

export default CircularProgressChart;