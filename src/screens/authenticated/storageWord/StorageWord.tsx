
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity } from 'react-native';
import ResponseCode from 'network/ResponseCode';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { sizeWidth } from 'utils/Utils';

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
    // React.useEffect(() => {
    //     getStorageWords()
    
    //   }, [])
    const handle =()=>{
getStorageWords()
    }
  return (
    <View>
        <TouchableOpacity style={{width:sizeWidth(22), height:sizeWidth(18), borderWidth:1}} onPress={handle}>

      <Text>Thêm từ</Text>
        </TouchableOpacity>
    </View>
  )
}

export default StorageWord

const styles = StyleSheet.create({})
