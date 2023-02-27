import React from 'react';
import {Container, Text, TouchableOpacity} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';

const DiscoveryScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.DiscoveryScreen
>) => {

  // const store = useSelector(store => store.StoreReducer.store)
  return (
    <Container>
      <TouchableOpacity>
      <Text>aaaaa</Text>

      </TouchableOpacity>
    </Container>
  );
};
const styles=StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
export default DiscoveryScreen;
