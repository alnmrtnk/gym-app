import React from 'react';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import { View, Text } from 'react-native';

const FoodScreen = ({ navigation }) => {
    return (
        <View>
            <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
                <Text>Food Screen</Text>
            </HeaderBottomMenuComponent>
        </View>
    );
};

export default FoodScreen;