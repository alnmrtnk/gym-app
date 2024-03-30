import React from 'react'
import { View, Text} from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';

const SettingsScreen = ({navigation}) => {
  return (
    <View>
        <HeaderBottomMenuComponent currentPage={3} navigation={navigation}>
            <Text>Settings Screen</Text>
        </HeaderBottomMenuComponent>
    </View>
  );
};

export default SettingsScreen;