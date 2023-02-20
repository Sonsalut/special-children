import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from './NavigationService';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreens } from './ScreenNames';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import { IRootState } from 'redux/rootReducer';

const MainStack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state: IRootState) => state.authReducer.user);

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen
          name={MainScreens.AuthenticationNavigator}
          component={AuthenticationNavigator}
        />
        <MainStack.Screen
          name={MainScreens.AuthenticatedNavigator}
          component={AuthenticatedNavigator}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
