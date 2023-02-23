import React from 'react';
import {Container, Text} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity } from 'react-native';
import AuthApi from 'network/subs/auth/AuthApi';
import { store } from 'redux/store';
import {StyleSheet} from 'react-native';

const MessageScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.MessageScreen
>) => {
  const [value, setValue] = React.useState(store?.getState()?.authReducer.user.accessToken)
  const logOut = async (value: any) => {
    const response = await AuthApi.LogOut({
      value
    })
    
  }
  const handle =()=>{

    logOut(value)
    DevSettings.reload()
  }

  return (
    <Container>
      <TouchableOpacity onPress={handle}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </Container>
  );
};

 

export default MessageScreen;
