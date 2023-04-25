import React from 'react';
import {AuthenticatedScreens} from './ScreenNames';
import BottomTabNavigator from './BottomTabNavigator';
import {Routes} from './Navigation';
import {createStackNavigator} from '@react-navigation/stack';
import JoinWordScreen from 'screens/authenticated/join-word/JoinWordScreen';
import RecordingScreen from 'screens/authenticated/recording/RecordingScreen';
import HomeScreen from 'screens/authenticated/home/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
import Storage from 'screens/authenticated/storageWord/Storage';
import colors from 'res/colors';
import AddCategory from 'screens/authenticated/category/AddCategory';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { addWordToStorage } from 'redux/storageWord/action';

import NavigationService from './NavigationService';
import AddWord from 'screens/authenticated/newWords/AddWord';
import images from 'res/images';
import { Image } from 'react-native';
const Stack = createStackNavigator<Routes>();
const CommonStackNavigator = ({}) => {
  const show = useSelector(store=>store.storeReducer.show)
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
        
        options={{
          headerShown:true,
          headerStyle: {
            backgroundColor: 'white',
            height: sizeHeight(10),
          },
          
          headerTitleStyle: {  
            color: colors.text_blue, 
            fontWeight: 'bold', 
            // borderWidth: 1,
            fontSize: fontSize(5), 
          },
        
          headerLeftLabelVisible:false,
          headerTintColor:'black',
          headerRight: () => (
            
            <TouchableOpacity 
              style={{
                width:sizeWidth(7), 
                height: sizeHeight(3),
                marginRight: sizeWidth(4.5),
                justifyContent: 'center',
              }} 
              onPress={()=>NavigationService.navigate(AuthenticatedScreens.AddWord)}
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

      <Stack.Screen
        name={AuthenticatedScreens.AddCategory}
        component={AddCategory}
      />
      
      <Stack.Screen
        name={AuthenticatedScreens.AddWord}
        component={AddWord}
      />
      <Stack.Screen
        name={AuthenticatedScreens.Storage}
        component={Storage}
      />
      
      
    </Stack.Navigator>
  );
};

export default CommonStackNavigator;
