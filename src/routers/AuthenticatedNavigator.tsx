import React from 'react';
import {AuthenticatedScreens} from './ScreenNames';
import BottomTabNavigator from './BottomTabNavigator';
import {Routes} from './Navigation';
import {createStackNavigator} from '@react-navigation/stack';
import JoinWordScreen from 'screens/authenticated/join-word/JoinWordScreen';
import RecordingScreen from 'screens/authenticated/recording/RecordingScreen';
import HomeScreen from 'screens/authenticated/home/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator<Routes>();

const CommonStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={AuthenticatedScreens.DrawerNavigator}
        component={DrawerNavigator}
      />
       <Stack.Screen
        name={AuthenticatedScreens.RecordingScreen}
        component={RecordingScreen}
      />
       <Stack.Screen
        name={AuthenticatedScreens.JoinWordScreen}
        component={JoinWordScreen}
      />
    </Stack.Navigator>
  );
};

export default CommonStackNavigator;
