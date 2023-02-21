import React from 'react';
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

const Tab = createBottomTabNavigator<Routes>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={AuthenticatedScreens.HomeScreen}
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name={AuthenticatedScreens.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ focused, color }) => (
            <IcTabHome {...iconConfigure(focused)} />
          ),
        }}

      />
      <Tab.Screen
        name={AuthenticatedScreens.DiscoveryScreen}
        component={DiscoveryScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ focused, color }) => (
            <IcTabNotification {...iconConfigure(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name={AuthenticatedScreens.MessageScreen}
        component={MessageScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ focused, color }) => (
            <IcTabProfile {...iconConfigure(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const iconConfigure = (focused: boolean) => {
  return {
    color: focused ? 'blue' : 'black'
  };
};

export default BottomTabNavigator;

const IcTabNotification = (props: any) => (
  <Svg
    width={20}
    height={22}
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 17.0781C15.6392 17.0781 18.2481 16.3547 18.5 13.451C18.5 10.5493 16.6812 10.7359 16.6812 7.17558C16.6812 4.39461 14.0452 1.23047 10 1.23047C5.95477 1.23047 3.31885 4.39461 3.31885 7.17558C3.31885 10.7359 1.5 10.5493 1.5 13.451C1.75295 16.3657 4.36177 17.0781 10 17.0781Z"
      stroke={props?.color ?? 'white'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.3889 20.0859C11.0247 21.6007 8.89672 21.6186 7.51953 20.0859"
      stroke={props?.color ?? 'white'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);



const IcTabHome = (props: any) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.15722 20.0019V16.9351C8.1572 16.1551 8.79312 15.5213 9.58101 15.5161H12.4671C13.2587 15.5161 13.9005 16.1514 13.9005 16.9351V16.9351V20.0114C13.9003 20.6737 14.4343 21.2149 15.103 21.2305H17.0271C18.9451 21.2305 20.5 19.6911 20.5 17.7923V17.7923V9.0683C20.4898 8.3213 20.1355 7.61982 19.538 7.1635L12.9577 1.91577C11.8049 1.00204 10.1662 1.00204 9.01342 1.91577L2.46203 7.17303C1.86226 7.62749 1.50739 8.33013 1.5 9.07783V17.7923C1.5 19.6911 3.05488 21.2305 4.97291 21.2305H6.89696C7.58235 21.2305 8.13797 20.6804 8.13797 20.0019V20.0019"
      stroke={props?.color ?? 'white'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IcTabProfile = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
      fill={props?.color ?? 'white'}
    />
    <Path
      d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
      fill={props?.color ?? 'white'}
    />
  </Svg>
);
const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    overflow: 'hidden',
   position:'absolute',
  
    bottom:15,
    
    borderRadius:15,
    width:'90%',
    left:20,
    right:20,
    height:60
   
  },
  tabBarLabelStyle: {
    fontWeight: '400',
    fontSize: 12
  },
  tabBarActiveTintColor: "blue",
  tabBarInactiveTintColor: 'black',
};