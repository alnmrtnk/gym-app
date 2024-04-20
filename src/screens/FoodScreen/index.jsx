import React from 'react';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import MacrosComponent from '../../components/MacrosComponent';

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        padding: "5%",
        minHeight: 667,
    },
});

const FoodScreen = ({ navigation }) => {
    return (
        <View>
            <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
                <View style={styles.contentContainer}>
                    <MacrosComponent/>
                </View>
            </HeaderBottomMenuComponent>
        </View>
    );
};

export default FoodScreen;