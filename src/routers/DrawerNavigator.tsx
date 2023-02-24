import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from "react-native-svg";



import { Routes } from './Navigation';
import { AuthenticatedScreens } from './ScreenNames';
import DiscoveryScreen from 'screens/authenticated/discovery/DiscoveryScreen';
import MessageScreen from 'screens/authenticated/message/MessageScreen';
import JoinWordScreen from 'screens/authenticated/join-word/JoinWordScreen';
import StorageWord from 'screens/authenticated/storageWord/StorageWord';
import { BottomTabCustom } from 'components';
import colors from 'res/colors';
import StoreNavigator from './StoreNavigator';
import HomeScreens from './HomeScreens';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (

    <Drawer.Navigator initialRouteName={AuthenticatedScreens.HomeScreen} >

      <Drawer.Screen name={AuthenticatedScreens.HomeScreens}
        component={HomeScreens}
        options={{
          title: 'Trang chủ', headerStyle: { backgroundColor: colors.white_gray },
          
        }}

      />
      <Drawer.Screen name={AuthenticatedScreens.DiscoveryScreen}
        component={DiscoveryScreen}
        options={{ title: 'Thông báo', headerStyle: { backgroundColor: colors.white_gray } }}

      />

      <Drawer.Screen name={AuthenticatedScreens.StorageWords}
        component={StoreNavigator}
        options={{ title: 'Kho ghép từ', headerStyle: { backgroundColor: colors.white_gray } }}

      />
      <Drawer.Screen name={AuthenticatedScreens.JoinWordScreen}
        component={JoinWordScreen}
        options={{ title: 'Ghép từ', headerStyle: { backgroundColor: colors.white_gray } }}

      />
      <Drawer.Screen name={AuthenticatedScreens.MessageScreen}
        component={MessageScreen}
        options={{ title: 'Cài đặt', headerStyle: { backgroundColor: colors.white_gray } }}

      />

    </Drawer.Navigator>

  )
}

export default DrawerNavigator
