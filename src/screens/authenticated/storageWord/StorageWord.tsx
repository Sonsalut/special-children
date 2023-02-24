
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity } from 'react-native';
import ResponseCode from 'network/ResponseCode';

import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { sizeWidth } from 'utils/Utils';
import NavigationService from 'routers/NavigationService';
import { Container } from 'components';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { FlatList } from 'react-native-gesture-handler';


const StorageWord = ({}: StackNavigationProps<
    Routes,
    AuthenticatedScreens.StorageWord
  >) => {

  const [data, setData] = React.useState([])

    const getStorageWords = async(values: any)=>{

const response = await RecordingAPI.GetStorageWord<GetStorageWord>({
   data:{}

})
if (response.status === ResponseCode.SUCCESS) {
    console.log(response.data)
    // setData(response.data.data)

  }

    }
    React.useEffect(() => {
        getStorageWords()
        
    
      }, [])
    const handle =()=>{
        NavigationService.navigate(AuthenticatedScreens.Storage)
    }
  return (
    <Container>
     
    <View>
        <TouchableOpacity style={{marginLeft:10,width:sizeWidth(22), height:sizeWidth(18), borderWidth:1, borderRadius:15, marginTop:10}} onPress={handle}>
    <View style={{alignSelf:"center" ,marginTop:10}}>
    <Image source={require('../../../assets/images/addS.png')} style={{width:20, height:20}}></Image>
      <Text>Thêm từ</Text>
    
    </View>
     
        </TouchableOpacity>
    </View>
    </Container>
  )
}

export default StorageWord

const styles = StyleSheet.create({})
