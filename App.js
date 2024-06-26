import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Keyboard, StyleSheet, Text, Touchable, TouchableWithoutFeedback, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { useFonts } from 'expo-font';
import GymScreen from './src/screens/GymScreen';
import FoodScreen from './src/screens/FoodScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import React, { useState } from 'react';
import AuthContext from './src/contexts/AuthContext';
import PersonalTrainingsScreen from './src/screens/PersonalTrainingsScreen';
import GroupTrainingsScreen from './src/screens/GroupTrainingsScreen';
import TrainerScreen from './src/screens/TrainerScreen';
import { ToastProvider } from 'react-native-toast-notifications'
import AddingProductScreen from './src/screens/AddingProductScreen';
import io from 'socket.io-client';
import devConfig from './config.development';
const socket = io(devConfig.SOCKET_URL);
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import NotificationsScreen from './src/screens/NotificationsScreen';
import GoalScreen from './src/screens/GoalScreen';

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

  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('66239d73ae9929dc8d7a418a');
  const dateTime = {
    current: new Date(),
    future: new Date((new Date()).getTime() + 60 * 60 * 1000),
  };

  const [dateFrom, setDateFrom] = useState(dateTime.current);
  const [dateTo, setDateTo] = useState(dateTime.future);
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async (read) => {
    try {
      let response = null;
      if (read) {
        response = await axios.put(`${devConfig.API_URL}/notifications/${userId}`);
      }
      else {
        response = await axios.get(`${devConfig.API_URL}/notifications/${userId}`);
      }
      setNotifications(response.data);
    }
    catch {
      toast.show('Failed to fetch notifications', { type: 'danger', placement: 'top' });
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUserId('');
    socket.disconnect();
    setConnectionEstablished(false);
  }

  React.useEffect(() => {
    if (isLoggedIn && !connectionEstablished) {
      setConnectionEstablished(true);
      console.log('connecting to socket:', userId);
      socket.emit('register', { userId });
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
      socket.on('notification', (notification) => {
        fetchNotifications(false);
      });
    }

    // return () => {
    //   socket.disconnect();
    // };
  }, [isLoggedIn, connectionEstablished]);

  if (fontsLoaded) {
    return (
      <ToastProvider>
        <AuthContext.Provider value={{
          setIsLoggedIn,
          setUserId, userId,
          dateFrom, setDateFrom,
          dateTo, setDateTo,
          notifications, fetchNotifications,
          logout
        }}>
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
                    name="Home"
                    component={HomeScreen}
                  />
                  <Stack.Screen
                    name="Gym"
                    component={GymScreen}
                  />
                  <Stack.Screen
                    name="PersonalTrainings"
                    component={PersonalTrainingsScreen}
                  />
                  <Stack.Screen
                    name="Trainer"
                    component={TrainerScreen}
                    initialParams={{ index: 0 }}
                  />
                  <Stack.Screen
                    name="GroupTrainings"
                    component={GroupTrainingsScreen}
                  />
                  <Stack.Screen
                    name="Food"
                    component={FoodScreen}
                  />
                  <Stack.Screen
                    name="AddProduct"
                    component={AddingProductScreen}
                  />
                  <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                  />
                  <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                  />
                  <Stack.Screen
                    name='Goal'
                    component={GoalScreen}
                  />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </ToastProvider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    fontFamily: 'nunito-regular',
  }
});