import * as React from 'react';
import { Button, View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg";

import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Routes } from './Navigation';
import { AuthenticatedScreens } from './ScreenNames';
import HomeScreen from 'screens/authenticated/home/HomeScreen';
import DiscoveryScreen from 'screens/authenticated/discovery/DiscoveryScreen';
import MessageScreen from 'screens/authenticated/message/MessageScreen';
import { BottomTabCustom } from 'components';
import colors from 'res/colors';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
   
    <Drawer.Navigator initialRouteName={AuthenticatedScreens.HomeScreen} >
      <Drawer.Screen name={AuthenticatedScreens.HomeScreen}
        component={HomeScreen}
        options={{title:'Trang chủ',headerStyle:{backgroundColor: colors.white_gray}}}
        
        />
        <Drawer.Screen name={AuthenticatedScreens.DiscoveryScreen}
        component={DiscoveryScreen}
        options={{title:'Thông báo',headerStyle:{backgroundColor: colors.white_gray}}}

        />
        <Drawer.Screen name={AuthenticatedScreens.MessageScreen}
        component={MessageScreen}
        options={{title:'Cài đặt',headerStyle:{backgroundColor: colors.white_gray}}}

        />
     
    </Drawer.Navigator>
  
  )
}

export default DrawerNavigator

