import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import HomeActive from "../../../assets/homeMenuIcon-active.svg";
import HomeInactive from "../../../assets/homeMenuIcon.svg";
import GymActive from "../../../assets/gymMenuIcon-active.svg";
import GymInactive from "../../../assets/gymMenuIcon.svg";
import FoodActive from "../../../assets/foodMenuIcon-active.svg";
import FoodInactive from "../../../assets/foodMenuIcon.svg";
import UserActive from "../../../assets/userMenuIcon-active.svg";
import UserInactive from "../../../assets/userMenuIcon.svg";
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    height: 100,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.ACCENT_COLOR,
  }
});

const ScreenMenu = ({ navigation, currentPage }) => {
  const activeIcons = [HomeActive, GymActive, FoodActive, UserActive];
  const inactiveIcons = [HomeInactive, GymInactive, FoodInactive, UserInactive];
  const navigateTo = (index) => {
    switch (index) {
      case 0:
        navigation.navigate('Home');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        break;
      case 1:
        navigation.navigate('Gym');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Gym' }],
        });
        break;
      case 2:
        navigation.navigate('Food');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Food' }],
        });
        break;
      case 3:
        navigation.navigate('Settings');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Settings' }],
        });
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.iconsContainer}>
        {activeIcons.map((Icon, index) => {
          const IconComponent = currentPage === index ? activeIcons[index] : inactiveIcons[index];
          return (
            <Pressable key={index} onPress={() => navigateTo(index)}>
              <IconComponent height={50} />
            </Pressable>
          )
        })}
      </View>
      <View style={{height: 0}}></View>
    </View>
  );
};

export default ScreenMenu;