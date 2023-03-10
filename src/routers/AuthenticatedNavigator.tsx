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
import { sizeHeight } from 'utils/Utils';
import { addWordToStorage } from 'redux/storageWord/action';
import NavigationService from './NavigationService';

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
        // options={{
        //   headerRight: () => (
        //     show ? 
        //       <TouchableOpacity onPress={()=>NavigationService.navigate(AuthenticatedScreens.AddCategory)}>
        //         <Icon 
        //           name='pencil-outline' 
        //           size={sizeHeight(3)} 
        //           style={{right:5}}
        //         />
        //       </TouchableOpacity>
        //     : null
        //   )
        // }}
      />

      <Stack.Screen
        name={AuthenticatedScreens.AddCategory}
        component={AddCategory}
      />
      {/* <Stack.Screen
        name={AuthenticatedScreens.AddWord}
        component={AddWord}
      /> */}
      <Stack.Screen
        name={AuthenticatedScreens.Storage}
        component={Storage}
      />
      
      
    </Stack.Navigator>
  );
};

export default CommonStackNavigator;
