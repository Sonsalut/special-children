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


const AddCategory = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.AddCategory
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
  const onRefresh = React.useCallback(() => {
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
<Container style={{flex:1}}>
    <HeaderWithBack title={'Chủ đề'}
    
    outerStyle={{backgroundColor:colors.title_blue}} 
    rightIconShow={true}
    hasDone={showDoneIcon}
    handle={handle} /> 
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
          onPress={()=>console.log('aa')}
        >
          <Text style={{alignSelf: 'center', marginTop: 10, fontSize: 15, fontWeight: 'bold', color: '#2D5672'}}>Thêm chủ đề</Text>
        </TouchableOpacity>
        <View style={{ height: sizeHeight(90), width:'95%', alignSelf:'center', alignItems:'center'}}>
   
   
 
         <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.blue]}
             />  
          }
          renderItem={({item})=>(
        
          <TouchableOpacity
           onPress={()=>handleOnclick(item)}
              isDoubleTap={true}
              activeOpacity={0.7}  
                style={{                 
                  width: sizeWidth(40),
                  // sizeWidth(40),
                  // marginVertical: 15,
                  height: sizeHeight(25),
                  borderRadius: 10,
                  marginHorizontal: 9,
                  alignSelf: 'center',
                  marginTop: 30,
                  paddingHorizontal:10,
                  backgroundColor: '#C1EBEA',
                  paddingTop: 5,
                  borderWidth:item?.isActive ? 0: 2
                
                  
                }}           
              >      
                  <Image
                    style={{
                      resizeMode: 'stretch',
                      height: '80%', 
                      width: '100%',
                      marginTop: '1%',
                      // sizeWidth(39),
                      borderRadius: sizeWidth(3),
                      
                    }}
                    source={item?.pictureFileId !== null ? {
                      uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                      method: 'GET',
                      headers: { Authorization: store.getState().authReducer.user.accessToken }
                    } :
                      require('../../.././assets/images/no.png')
                    }
                  /> 
           <Text style={{fontSize: fontSize(5), alignSelf: 'center', fontWeight:'bold', color:'#2D5672'}}>{item?.name}</Text>
          </TouchableOpacity>
       
          
          
  )}
         
         />
          
        </View>
   
   
    </Container>
  );
};

export default AddCategory;
