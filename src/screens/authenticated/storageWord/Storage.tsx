import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity } from 'react-native';
import ResponseCode from 'network/ResponseCode';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetFullCategory } from 'network/subs/auth/recording/RecordingRequest';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { sizeWidth } from 'utils/Utils';
import { FlatList } from 'react-native-gesture-handler';
const Storage = ({}: StackNavigationProps<
    Routes,
    AuthenticatedScreens.StorageWord
  >) => {
    const [data, setData] = React.useState([])

    const getCategory = async (values: any) => {
        const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
          pageIndex: 1,
          pageSize: 20,
          name:null,
          categories: {}
    
        });
        if (response.status === ResponseCode.SUCCESS) {
          console.log(response.data.categories)
    
          setData(response.data.categories)
    
        }
      }
      React.useEffect(() => {
        getCategory()
    
      }, [])
  return (


    
    <View>
      <Text>Storage</Text>
     
    </View>
  )
}

export default Storage

const styles = StyleSheet.create({})