import React from 'react';
import { Container, Header, Text, TextInput, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens, AuthenticationScreens, MainScreens } from 'routers/ScreenNames';
import NavigationService from 'routers/NavigationService';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { View, Image, ImageBackground, ScrollView, KeyboardAvoidingView,FlatList, Animated, TouchableHighlightComponent, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
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
import { RefreshControl, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Spinner from 'react-native-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { showIcon } from 'redux/storageWord/action';
import GlobalHeader from 'components/header/GlobalHeader';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const HomeScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.HomeScreen
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
  const show = useSelector(store=>store.storeReducer.show)
  const handleShow=( )=>{
    dispatch(showIcon())
  }
const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false); 
        getCategory()
      
        
      }, 2000);
    }, []);
    const slideAnim = React.useRef(new Animated.Value(-200)).current;
    const icons = React.useRef([<Text>sss</Text>,<Text>s2s</Text>,<Text>ss3s</Text>]).current;
  
 
    const [searchValue, setSearchValue] = React.useState('')
    const filterData= ()=>(
     
      data.filter(item=> encodeURIComponent(item?.audioWord.toLowerCase()).includes( encodeURIComponent(searchValue.toLowerCase()) ))
      
    )
  return (

    <Container isBottomTab={false}  style={{backgroundColor: 'white', flex: 1,  width: '100%'}}>  
      <TouchableWithoutFeedback
        onPress={() => console.log('Pressed')}
        onLongPress={handleShow}
      >
        <View style={{ height: sizeHeight(90), width: '95%', alignSelf: 'center', alignItems: 'center'}}>
          {
            show ? 
              <Searchbar 
                style={{ height: 40, width: sizeWidth(80), borderWidth: 1, borderColor: 'gray', marginTop: 2 }} 
                placeholder="Search" 
                value={searchValue}
                onChangeText={(e) => setSearchValue(e)}
                spellCheck={false}
              />
            : null
          }


          <FlatList
            data={filterData()}
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
            renderItem={({ item }) => (

              <TouchableOpacity
                onPress={() => NavigationService.navigate(AuthenticatedScreens.RecordingScreen, { data: item })}
                isDoubleTap={false}
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
                  paddingHorizontal: 10,
                  backgroundColor: '#C1EBEA',
                  paddingTop: 5,
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
                <Text style={{ fontSize: fontSize(5), alignSelf: 'center', fontWeight: 'bold', color: '#2D5672' }}>{item?.name}</Text>
              </TouchableOpacity>



            )}

          />

        </View>
      </TouchableWithoutFeedback>
    </Container>  
  );
};

export default HomeScreen;
