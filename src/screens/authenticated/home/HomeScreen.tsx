import React from 'react';
import { Container, Header, Text, TextInput, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens, AuthenticationScreens, MainScreens } from 'routers/ScreenNames';
import NavigationService from 'routers/NavigationService';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { View, Image, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import images from 'res/images';
import AuthenticationApi from 'network/subs/auth/AuthApi';
import { CategoryList } from 'network/subs/auth/AuthResponse';
import AuthApi from 'network/subs/auth/AuthApi';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetFullCategory } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';
import { FlatList } from 'react-native-gesture-handler';
import { store } from 'redux/store';
import colors from 'res/colors';

const HomeScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.HomeScreen
>) => {

  const [data, setData] = React.useState([])
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
  React.useEffect(() => {
        getCategory()

  }, [])


  return (

    <Container>

      
      {/* <Header iconLeft={require('../../../assets/images/add.png')} title='Màn hình chính' /> */}
      {/* <View style={{ alignContent: 'space-around', flexDirection: 'row', alignSelf: 'center', flexWrap: 'wrap', width: '100%', paddingLeft: 5, marginTop: 30 }}>
        <TouchableOpacity style={[styles.itemView, { backgroundColor: '#9BA8B5' }]}
          onPress={() => {
            NavigationService.navigate(AuthenticatedScreens.RecordingScreen, { title: 'number' })
          }}
          isDoubleTap={false}
          activeOpacity={0.7}
        >
          <Image style={{ alignSelf: 'center', marginTop: sizeHeight(4) }} source={images.number} />
          <Text style={{ color: 'white', fontSize: fontSize(5), marginTop: sizeHeight(3), textAlign: 'center' }}>Chữ số</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: sizeWidth(2) }}></View>
        <TouchableOpacity style={[styles.itemView, { backgroundColor: '#4AD4FF' }]}
          onPress={() => {
            NavigationService.navigate(AuthenticatedScreens.RecordingScreen, { title: 'animal' })
          }}
          isDoubleTap={false}
          activeOpacity={0.7}
        >
          <Image style={{ alignSelf: 'center', marginTop: sizeHeight(4) }} source={images.danhvan} />
          <Text style={{ color: 'white', fontSize: fontSize(5), marginTop: sizeHeight(3), textAlign: 'center' }}>Con vật</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: sizeWidth(2) }}></View>
        <TouchableOpacity style={[styles.itemView, { backgroundColor: '#9c4fff' }]}
          onPress={() => {
            NavigationService.navigate(AuthenticatedScreens.JoinWordScreen)
          }}
          isDoubleTap={false}
          activeOpacity={0.7}
        >
          <Image style={{ alignSelf: 'center', marginTop: sizeHeight(2), }} source={images.Frame} />
          <Text style={{ color: 'white', fontSize: fontSize(5), marginTop: sizeHeight(1), textAlign: 'center' }}>Ghép từ</Text>
        </TouchableOpacity>
      </View> */}
      {/* <View style={{ paddingVertical: sizeHeight(1) }}></View> */}
      {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <TouchableOpacity style={[styles.itemView, { backgroundColor: '#9c4fff' }]}
          onPress={() => {
            NavigationService.navigate(AuthenticatedScreens.JoinWordScreen)
          }}
          isDoubleTap={false}
          activeOpacity={0.7}
        >
          <Image style={{ alignSelf: 'center', marginTop: sizeHeight(2), }} source={images.Frame} />
          <Text style={{ color: 'white', fontSize: fontSize(5), marginTop: sizeHeight(1), textAlign: 'center' }}>Ghép từ</Text>
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity style={{ backgroundColor: 'red', height: 100 }} onPress={() => {
        NavigationService.reset(MainScreens.AuthenticationNavigator)
      }} /> */}

      {/* <TouchableOpacity onPress={handle}>
        <Text>AAAA</Text>
      </TouchableOpacity> */}
      {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <TouchableOpacity style={[styles.itemView, { backgroundColor: '#9c4fff' }]}
          onPress={() => {
            NavigationService.navigate(AuthenticatedScreens.JoinWordScreen)
          }}
          isDoubleTap={false}
          activeOpacity={0.7}
        >
          <Image style={{ alignSelf: 'center', marginTop: sizeHeight(2), }} source={images.Frame} />
          <Text style={{ color: 'white', fontSize: fontSize(5), marginTop: sizeHeight(1), textAlign: 'center' }}>Ghép từ</Text>
        </TouchableOpacity>
      </View> */}
      <View style={{ height: sizeHeight(90), width:'90%', marginTop: 10, alignSelf:'center', alignItems:'center' }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>NavigationService.navigate(AuthenticatedScreens.RecordingScreen, {data:item})}
            isDoubleTap={false}
            activeOpacity={0.7}
            >
              <View style={{borderColor:colors.blue,width: sizeWidth(40), marginVertical:15, height:sizeHeight(26),borderRadius:10,marginHorizontal:5, alignSelf: 'center', marginTop: 10 ,borderWidth:1}}>
             
                <Image style={{
                  resizeMode:'stretch',
                  height: sizeHeight(20), width: sizeWidth(39),
                  borderRadius: sizeWidth(3),
                  
                 
                }}
                  source={item?.pictureFileId!==null?{
                    uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=medium`,
                    method: 'GET',
                    headers: {
                      Authorization: store.getState().authReducer.user.accessToken
                    }
                  }
                :require('../../.././assets/images/no.png')
                }

                />
  
               
                <Text style={{ marginTop:8,fontSize: fontSize(5), alignSelf: 'center', fontWeight:'400', color:'black' }}>{item?.name}</Text>

              </View>
            </TouchableOpacity>


          )}
        >
        </FlatList>
      </View>

    </Container>
 
   
  );
};

export default HomeScreen;
