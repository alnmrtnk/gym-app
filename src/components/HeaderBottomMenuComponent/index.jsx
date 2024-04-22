import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import ScreenMenu from '../../components/ScreenMenu';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    marginTop: 0,
    marginBottom: 668,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  bottomContentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
const HeaderBottomMenuComponent = ({ navigation, currentPage, children }) => {
  return (
    <View style={styles.container}>
      <ScreenHeader style={styles.header} notificationsIsOpened={currentPage === 4} navigation={navigation}/>
      <View style={styles.contentContainer}>
        {children}
      </View>
      <ScreenMenu style={styles.bottomContentContainer} navigation={navigation} currentPage={currentPage} />
    </View>
  );
};
export default HeaderBottomMenuComponent;