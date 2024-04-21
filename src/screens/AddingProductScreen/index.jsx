import React from 'react';
import { View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';

const AddingProductScreen = ({navigation}) => {
  return (
    <View>
        <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
            <Text>Adding product screen</Text>
        </HeaderBottomMenuComponent>
    </View>
  );
};

export default AddingProductScreen;