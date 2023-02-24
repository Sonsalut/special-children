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
import { Container, Header } from 'components';
import { Title } from 'react-native-paper';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
const Storage = ({}: StackNavigationProps<
    Routes,
    AuthenticatedScreens.StorageWord
  >) => {
    const [data, setData] = React.useState([])
    const [dataWord , setDataWord] = React.useState([])
    

    const getCategory = async (values: any) => {
        const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
          pageIndex: 1,
          pageSize: 20,
          name:null,
          isActive:true,
          categories: {}
    
        });
        if (response.status === ResponseCode.SUCCESS) {
          console.log(response.data.categories)
    
          setData(response.data.categories)
    
        }
      }

      const loadData = async (id: any) => {
        const response: any = await RecordingAPI.GetWordByCateID< GetWordByCateID>({
            pageIndex: 1,
            pageSize: 20,
            word: '',
            categoryId: data?.id,
            isActive:true
        });
        if (response.status === ResponseCode.SUCCESS) {
          
            console.log(response.data)
            setDataWord(response.data?.words)

        }
        else {
            console.log('that bai')
        }
    }
    // const filter

      React.useEffect(() => {
        getCategory()
    //  loadData(303)
       
        
    
      }, [])
  return (


    <Container>
      <HeaderWithBack title={'Kho từ'}/>
    <View style={{marginLeft:10, marginTop:10}}>
      
     <FlatList
      data={data}
      renderItem={({item, index})=>(
        <View>
             <View style={{width:60, height:60, borderWidth:1}}>
              <Text>{item?.name}</Text>
              
             </View>
           
             <FlatList data={dataWord}
              horizontal={true}
               renderItem={({item})=>(
                <Text>{item?.word}</Text>
               )}
              />
        </View>
      )}

     />
    </View>
    </Container>
  )
}

export default Storage

const styles = StyleSheet.create({})