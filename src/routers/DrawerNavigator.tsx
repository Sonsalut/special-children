import * as React from 'react';
import { Button, View, Text,TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Svg, {  Path } from "react-native-svg";
import { Routes } from './Navigation';
import { AuthenticatedScreens } from './ScreenNames';
import MessageScreen from 'screens/authenticated/message/MessageScreen';
import JoinWordScreen from 'screens/authenticated/join-word/JoinWordScreen';
import StorageWord from 'screens/authenticated/storageWord/StorageWord';
import { BottomTabCustom } from 'components';
import colors from 'res/colors';
import StoreNavigator from './StoreNavigator';
import HomeScreens from './HomeScreens';
import RecordingScreen from 'screens/authenticated/recording/RecordingScreen';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { checkIpad, fontSize, isPortrait, sizeHeight, sizeWidth } from 'utils/Utils';
import NavigationService from './NavigationService';
import { color } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({}) => {
  const show= useSelector(store=>store.storeReducer.show)
  return (

    <Drawer.Navigator 
      screenOptions = {({ navigation }) => ({
        headerLeft: () => (
          
          <Pressable onPress={navigation.toggleDrawer}>
              <Image
              // source={require('../')}
                source={require('../assets/images/nav.png')}
                style={{
                  left: sizeWidth(5.5),
                  alignSelf: 'flex-start',
                  resizeMode: 'contain',
                  maxWidth: sizeWidth(5.5),
                  maxHeight: sizeHeight(2.1),
                }} 
              />
            </Pressable>
          
        ),
          
        
        drawerLabelStyle: 
        checkIpad() ? {fontSize:fontSize(2.5)} : null
      })} 
    initialRouteName={AuthenticatedScreens.HomeScreen}>
      <Drawer.Screen 
        name={AuthenticatedScreens.HomeScreens}
        component={HomeScreens}
        options={{
          title: 'Học từ',
          headerStyle: { 
            backgroundColor: colors.white,
            // borderWidth:1,
            height: isPortrait() ? sizeHeight(10) : checkIpad() ? sizeHeight(10) :sizeHeight(5)  
          },        
          headerTitleStyle: {  
            color: colors.text_blue, 
            fontWeight: 'bold', 
            fontSize: fontSize(5), 
          },
          headerRight: () => (
            
            <TouchableOpacity 
              style={{
                width:sizeWidth(7), 
                height: sizeHeight(3),
                marginRight: sizeWidth(4.5),
                justifyContent: 'center',
              }} 
              onPress={()=>NavigationService.navigate(AuthenticatedScreens.AddCategory)}
            >
              <Image
                source={require('../assets/images/edit.png')}
                
                style={{
                  resizeMode: 'contain',
                  maxWidth: sizeWidth(6.5),
                  maxHeight: sizeHeight(2.7),
                }}
              />
            </TouchableOpacity>
            
          ),
        }}
      />
    
      <Drawer.Screen name={AuthenticatedScreens.StorageWords}
        component={StoreNavigator}
        options={{ 
          title: 'Kho ghép từ', 
          headerStyle: { 
            backgroundColor: colors.white,
            height: isPortrait() ? sizeHeight(10) : checkIpad() ? sizeHeight(10) :sizeHeight(5)  
          }, 
          headerTitleStyle: {  
            color: colors.text_blue, 
            fontWeight: 'bold', 
            fontSize: fontSize(5), 
          },          
          headerPressOpacity: 1,
          
        }}

      />
      <Drawer.Screen 
        name={AuthenticatedScreens.JoinWordScreen}
        component={JoinWordScreen}
        options={{ 
          title: 'Ghép từ', 
          headerStyle: { 
            backgroundColor: colors.white,
            height: isPortrait() ? sizeHeight(10) : checkIpad() ? sizeHeight(10) :sizeHeight(5)  
          }, 
          headerTitleStyle: {  
            color: colors.text_blue, 
            fontWeight: 'bold', 
            fontSize: fontSize(5), 
          },
          headerRight: () => (
            
            <TouchableOpacity 
              style={{
                width:sizeWidth(7), 
                height: sizeHeight(3),
                marginRight: sizeWidth(3.5),
                marginTop: sizeHeight(0.5),
                justifyContent: 'center',
              }} 
              onPress={()=>NavigationService.navigate(AuthenticatedScreens.StorageWord)}
            >
              
                <Image
                  source={require('../assets/images/setup.png')}
                  style={{
                    resizeMode: 'contain',
                    maxWidth: sizeWidth(6.5),
                    maxHeight: sizeHeight(2.7),
                  }}
                  
                  
                />
            </TouchableOpacity>
            
          ),       
        }}

      />
      <Drawer.Screen 
        name={AuthenticatedScreens.MessageScreen}
        component={MessageScreen}
        options={{ 
          title: 'Cài đặt',
          headerStyle: { 
            backgroundColor: colors.white,
            height: isPortrait() ? sizeHeight(10) : checkIpad() ? sizeHeight(10) :sizeHeight(5)  
          }, 
          headerTitleStyle: {  
            color: colors.text_blue, 
            fontWeight: 'bold', 
            fontSize: fontSize(5), 
          },        
        }}
      />

    </Drawer.Navigator>

  )
}

export default DrawerNavigator

