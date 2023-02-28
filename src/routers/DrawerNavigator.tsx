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
          title: 'Học từ', 
          headerStyle: { backgroundColor: colors.title_blue },        
          headerTitleStyle: { color: '#2D5672', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }
        }}

      />
      <Drawer.Screen name={AuthenticatedScreens.DiscoveryScreen}
        component={DiscoveryScreen}
        options={{ 
          title: 'Thông báo', 
          headerStyle: { backgroundColor: colors.white_gray }, 
          headerTitleStyle: { color: '#2D5672', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }
        }}

      />

      <Drawer.Screen name={AuthenticatedScreens.StorageWords}
        component={StoreNavigator}
        options={{ 
          title: 'Kho ghép từ', 
          headerStyle: { backgroundColor: colors.title_blue },
          headerTitleStyle: { color: '#2D5672', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }
        }}

      />
      <Drawer.Screen name={AuthenticatedScreens.JoinWordScreen}
        component={JoinWordScreen}
        options={{ 
          title: 'Ghép từ', 
          headerStyle: { backgroundColor: colors.title_blue },
          headerTitleStyle: { color: '#2D5672', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }
        }}

      />
      <Drawer.Screen name={AuthenticatedScreens.MessageScreen}
        component={MessageScreen}
        options={{ 
          title: 'Cài đặt', 
          headerStyle: { backgroundColor: colors.title_blue },
          headerTitleStyle: { color: '#2D5672', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }        
        }}

      />

    </Drawer.Navigator>

  )
}

export default DrawerNavigator

