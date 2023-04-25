import React from 'react';
import {AuthenticatedScreens} from './ScreenNames';
import {Routes} from './Navigation';
import {createStackNavigator} from '@react-navigation/stack';
import JoinWordScreen from 'screens/authenticated/join-word/JoinWordScreen';
import RecordingScreen from 'screens/authenticated/recording/RecordingScreen';
import HomeScreen from 'screens/authenticated/home/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
import StorageWord from 'screens/authenticated/storageWord/StorageWord';
import Storage from 'screens/authenticated/storageWord/Storage';
const Stack = createStackNavigator<Routes>();

const StoreNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={AuthenticatedScreens.StorageWord}
        component={StorageWord}
      />
      
    </Stack.Navigator>
  );
};

export default StoreNavigator;
