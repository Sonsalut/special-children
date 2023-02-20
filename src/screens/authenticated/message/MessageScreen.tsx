import React from 'react';
import {Container, Text} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';

const MessageScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.MessageScreen
>) => {
  return (
    <Container>
      <Text>MessageScreen</Text>
    </Container>
  );
};

export default MessageScreen;
