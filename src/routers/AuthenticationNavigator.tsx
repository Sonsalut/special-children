import React from 'react';
import {AuthenticationScreens} from './ScreenNames';
import {Routes} from './Navigation';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'screens/authentication/login/LoginScreen';
import RegisterScreen from 'screens/authentication/register/RegisterScreen';

const Stack = createStackNavigator<Routes>();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AuthenticationScreens.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AuthenticationScreens.RegisterScreen}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
