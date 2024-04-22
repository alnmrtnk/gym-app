import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LogoSvg from "../../../assets/logoForHeader.svg";
import NotificationSVG from "../../../assets/notification.svg";
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        paddingTop: "7.5%",
        paddingBottom: "7.5%",
        paddingLeft: "1%",
        paddingRight: "3%",
    },
    elevation: {
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.09,
      },

});

const ScreenHeader = ({notificationsIsOpened, navigation}) => {
  return (
    <View style={[styles.headerContainer, styles.elevation]}>
        <LogoSvg height={100}/>
        <Pressable height={50} onPress={() => {navigation.navigate('Notifications')}}>
            <NotificationSVG height={50} fill={notificationsIsOpened ? Colors.ACCENT_COLOR : Colors.DARK_GREY_COLOR}/>
        </Pressable>
    </View>
  );
};

export default ScreenHeader;