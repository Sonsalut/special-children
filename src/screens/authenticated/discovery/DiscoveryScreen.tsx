import React from 'react';
import {Container, Text, TouchableOpacity} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { FlatList, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'redux/store';
import { setStorage, updateStorage } from 'redux/storageWord/action';
import CheckBox from '@react-native-community/checkbox';
const DiscoveryScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.DiscoveryScreen
>) => {
  const fruits = ['Apples', 'Oranges', 'Pears']
  const [checked, setChecked] = React.useState(false);
  const state = { selectedFruits: [] }

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
  const store = useSelector(store => store.storeReducer.store)
  const dispatch = useDispatch()
  const handle=()=>{
  dispatch(setStorage( {id:1, name:'11'}))

  }
  return (
    <Container>
     
      <FlatList
      data={store}
      renderItem={({item})=>(
        <Text>{item?.id}</Text>
      )}
      />
      <CheckBox
    // disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
    
  />
  <TouchableOpacity onPress={handle}><Text>ssss</Text></TouchableOpacity>
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
