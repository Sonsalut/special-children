import React from 'react';
import {Container, Text} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity } from 'react-native';

const MessageScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.MessageScreen
>) => {
  return (
    <Container>
      <TouchableOpacity onPress={()=>DevSettings.reload()}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MessageScreen;
