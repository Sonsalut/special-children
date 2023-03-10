import React from 'react';
import { Container, Header, TextInput, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens, AuthenticationScreens, MainScreens } from 'routers/ScreenNames';
import NavigationService from 'routers/NavigationService';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { Text,View, Image, ImageBackground, ScrollView, KeyboardAvoidingView,FlatList, Animated, TouchableHighlightComponent, TouchableWithoutFeedback } from 'react-native';

import images from 'res/images';
import AuthenticationApi from 'network/subs/auth/AuthApi';
import { CategoryList } from 'network/subs/auth/AuthResponse';
import AuthApi from 'network/subs/auth/AuthApi';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetFullCategory } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';

import { store } from 'redux/store';
import colors from 'res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { RefreshControl } from 'react-native-gesture-handler';
import Spinner from 'react-native-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { showIcon } from 'redux/storageWord/action';
import GlobalHeader from 'components/header/GlobalHeader';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const AddWord = ({}: StackNavigationProps<
    Routes, AuthenticatedScreens.AddWord
>) => {
    const [data, setData] = React.useState([])
    const [datas, setDatas] = React.useState([])
    const getCategory = async (values: any) => {
    const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
      pageIndex: 1,
      pageSize: 20,
      name:null,
      isActive:true,
      // categories: {}

    });
    if (response.status === ResponseCode.SUCCESS) {

      setData(response.data?.categories)
      console.log(data)
    }
  }
  React.useEffect(() => {
        getCategory()

  }, [])
  const dispatch= useDispatch()
  const show= useSelector(store=>store.storeReducer.show)
  const handle=( )=>{
    console.log(data)
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const 
    onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false); 
        getCategory()
      }, 2000);
    }, []);
  
  const [searchValue, setSearchValue] = React.useState('')
  const filterData= ()=>(  
    data.filter(item=> encodeURIComponent(item?.audioWord.toLowerCase()).includes( encodeURIComponent(searchValue.toLowerCase()) ))    
    )
    const [showDoneIcon, setShowDoneIcon] = React.useState(true)
    const checkDone =()=>{
      let tmp= data.find(item=> item?.isActive===false)
      if(tmp)
      {
        setShowDoneIcon(false)
      }
      else{
        setShowDoneIcon(true)
      }
    }
    const handleOnclick=(item)=>{
      checkDone()

           let tmp = data.map((items)=>{
            if(items?.id===item.id)
            {
              return{
                ...items,
                isActive: !item?.isActive
              }
            }
            return items
           })
          setData(tmp)
          // console.log(showDoneIcon)
          // setShowDoneIcon(!showDoneIcon)
    }
  return (
    <Container>
        <TouchableWithoutFeedback>
            <View>
                
            </View>
        </TouchableWithoutFeedback>
    </Container>
  )
};