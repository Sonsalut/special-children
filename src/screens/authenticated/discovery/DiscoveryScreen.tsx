import React from 'react';
import {Container, Text} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';

const DiscoveryScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.DiscoveryScreen
>) => {
  return (
    <Container>
      <Text>DiscoveryScreen</Text>
    </Container>
  );
};

export default DiscoveryScreen;
