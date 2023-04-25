import React from 'react';
import {AuthenticatedScreens} from './ScreenNames';
import {Routes} from './Navigation';
import {createStackNavigator} from '@react-navigation/stack';
import JoinWordScreen from 'screens/authenticated/join-word/JoinWordScreen';
import RecordingScreen from 'screens/authenticated/recording/RecordingScreen';
import HomeScreen from 'screens/authenticated/home/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator<Routes>();

const HomeScreens= () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown : false,

      }}>
      <Stack.Screen
        name={AuthenticatedScreens.HomeScreen}
        component={HomeScreen}
        
      />
      
    </Stack.Navigator>
  );
};

export default HomeScreens;
