
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity } from 'react-native';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';

import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import NavigationService from 'routers/NavigationService';
import { Button, Container } from 'components';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import colors from 'res/colors';


const StorageWord = ({}: StackNavigationProps<
    Routes,
    AuthenticatedScreens.StorageWord
  >) => {

  const [data, setData] = React.useState([])
const dispatch= useDispatch()
const personalStorage= useSelector(store=>store.storeReducer.personalStore)
    const getStorageWords = async(values: any)=>{

const response = await RecordingAPI.GetStorageWord<GetStorageWord>({
   data:{}

})
if (response.status === ResponseCode.SUCCESS) {
    console.log(response.data)
    setData(response.data)

  }
 
    }

    useFocusEffect(
      React.useCallback(() => {
  
     getStorageWords()
       
      }, [])
    );
    const isFocused = useIsFocused();

   
    // React.useEffect(() => {
     
    //  getStorageWords()
    //   }, [isFocused])
    const handle =()=>{
        NavigationService.navigate(AuthenticatedScreens.Storage)
        
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false); 
     getStorageWords()
          
          
        }, 2000);
      }, []);
  return (
    <Container style={{backgroundColor: 'white'}} >
   
    <View >
        <TouchableOpacity 
          style={{
            marginLeft:10,
            width:'50%', 
            height:sizeWidth(10), 
            borderRadius:45, 
            marginTop:15, 
            marginBottom: -10,
            backgroundColor: '#FFD19A', 
            alignSelf: 'center'}} 
          onPress={handle}
        >
          <Text style={{alignSelf: 'center', marginTop: 10, fontSize: 15, fontWeight: 'bold', color: '#2D5672'}}>Thêm từ vào kho</Text>
        </TouchableOpacity>
    </View>
    <View style={{width:'90%', height:'100%', alignSelf:'center', marginTop:15}}>
      <FlatList 
      data={data}
      numColumns={3}
      refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.blue]}
         />  
      }
      renderItem={({item})=>(
        <View style={{flexDirection:'row',justifyContent:'center', marginVertical:10,  width:sizeWidth(30), height: sizeHeight(15)}}>
                    
        
        <View style={{ alignSelf:'center', width:sizeWidth(25), marginHorizontal:5,borderRadius:10,paddingTop:5, height:sizeHeight(16), backgroundColor: '#C1EBEA'}}>
            <Image style={{
                      resizeMode:'stretch',
                      height: sizeHeight(11), width: sizeWidth(18),
                      alignSelf:'center',
                      borderRadius: 9
                  }}
                      source={{
                          uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                          method: 'GET',
                          headers: {
                              Authorization: store.getState().authReducer.user.accessToken
                          }
                      }}

                  />
          <Text style={{fontSize:15, color:'#2D5672', fontWeight:'bold', alignSelf:"center"}}>{item?.word}</Text>
        </View>

        </View>
      )}/>
    </View>
    </Container>
  )
}

export default StorageWord

const styles = StyleSheet.create({})
