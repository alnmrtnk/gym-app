import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import ScreenMenu from '../../components/ScreenMenu';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    padding: "5%",
    gap: 20,
  },
  bottomContentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  }
});

const HeaderBottomMenuComponent = ({ navigation, currentPage, children }) => {
  return (
    <View style={styles.container}>
      <ScreenHeader />
      {children}
      <ScreenMenu navigation={navigation} currentPage={currentPage} />
    </View>
  );
};

export default HeaderBottomMenuComponent;