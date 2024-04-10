import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { useFonts } from 'expo-font';
import GymScreen from './src/screens/GymScreen';
import FoodScreen from './src/screens/FoodScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { useState } from 'react';
import AuthContext from './src/contexts/AuthContext';
import PersonalTrainingsScreen from './src/screens/PersonalTrainingsScreen';
import GroupTrainingsScreen from './src/screens/GroupTrainingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
    'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-extra-bold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'nunito-black': require('./assets/fonts/Nunito-Black.ttf'),
    'nunito-extra-light': require('./assets/fonts/Nunito-ExtraLight.ttf'),
    'nunito-italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'nunito-bold-italic': require('./assets/fonts/Nunito-BoldItalic.ttf'),
    'nunito-extra-bold-italic': require('./assets/fonts/Nunito-ExtraBoldItalic.ttf'),
    'nunito-black-italic': require('./assets/fonts/Nunito-BlackItalic.ttf'),
    'nunito-extra-light-italic': require('./assets/fonts/Nunito-ExtraLightItalic.ttf'),
    'nunito-light-italic': require('./assets/fonts/Nunito-LightItalic.ttf'),
    'nunito-semibold-italic': require('./assets/fonts/Nunito-SemiBoldItalic.ttf')
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (fontsLoaded) {
    return (
      <AuthContext.Provider value={{ setIsLoggedIn }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ animation: 'none' }} >
            {!isLoggedIn ? (
              <Stack.Group>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
                >
                </Stack.Screen>
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen
                  name="GroupTrainings"
                  component={GroupTrainingsScreen}
                />
                <Stack.Screen
                  name="PersonalTrainings"
                  component={PersonalTrainingsScreen}
                />
                <Stack.Screen
                  name="Gym"
                  component={GymScreen}
                />
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                />
                <Stack.Screen
                  name="Food"
                  component={FoodScreen}
                />
                <Stack.Screen
                  name="Settings"
                  component={SettingsScreen}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    fontFamily: 'nunito-regular',
  }
});