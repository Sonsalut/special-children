import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { DevSettings, Image, TouchableOpacity } from 'react-native';
import ResponseCode from 'network/ResponseCode';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { AddWordToStorage, DeleteWordToStorage, GetFullCategory } from 'network/subs/auth/recording/RecordingRequest';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { store } from 'redux/store';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Container, Header } from 'components';
import { Title } from 'react-native-paper';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
import Vi from 'assets/languages/vi';
import CheckBox from '@react-native-community/checkbox';
import { Value } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { filterStorage, isClicked, setCategory, setStorage, updateStorage } from 'redux/storageWord/action';
import NavigationService from 'routers/NavigationService';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import colors from 'res/colors';
import { useToast } from 'hooks/useToast';
const Storage = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.StorageWord
>) => {
  const [data, setData] = React.useState([])

  const [dataWord, setDataWord] = React.useState([])
  const [dataWords, setDataWords] = React.useState([])
  const [personDataFromAPi, setPersonDataFromApi] = React.useState()
  const category = useSelector(store => store.storeReducer.category)

  const fullStore = useSelector(store => store.storeReducer.fullStore)
  const getCategory = async (values: any) => {
    const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
      pageIndex: 1,
      pageSize: 20,
      name:null,
      isActive:true,
      

    });
    if (response.status === ResponseCode.SUCCESS) {
      if (category.length <= 0) {
        console.log( response.data?.categories)
        dispatch(setCategory(response.data?.categories))
        // console.log('AAAAA'+ response.data.categories)
        loadData(response.data?.categories?.id)
      }
    }
  }

  const getStorageWords = async (values: any) => {

    const response = await RecordingAPI.GetStorageWord<GetStorageWord>({
      data: []

    })
    if (response.status === ResponseCode.SUCCESS) {
      // console.log(response.data)
      setPersonDataFromApi(response.data)
      // isExits(fullStore, response.data)
      // dispatch(showPersonStore(response.data))
    }
    

  }
  const addWordToStorage = async (id: any) => {
    const response = await RecordingAPI.AddWordToStorage<AddWordToStorage>({
      wordId: id
    });
    if (response.status === ResponseCode.SUCCESS) {
      console.log("SUCCESS")
    }
    else {
      console.log('error')
    }
  }
  const deleteWordToStorage = async (id: any) => {
    const response = await RecordingAPI.DeleteWordToStorage<DeleteWordToStorage>({
      wordId: id
    });
    if (response.status === ResponseCode.SUCCESS) {
      console.log("SUCESS")
    }
    else {
      console.log('error')
    }
  }



 


  const dispatch = useDispatch()
  const loadData = async (id: any) => {
    //Load word
    const response: any = await RecordingAPI.GetWordByCateID<GetWordByCateID>({
      pageIndex: 1,
      pageSize: 20,
      word: '',
      categoryId: id,
      isActive: true
    });
    if (response.status === ResponseCode.SUCCESS) {
      // console.log(response.data?.words) 
      setDataWord(response.data?.words)
      // console.log("API"+response.data?.words )
      dispatch(setStorage(response.data?.words))
    }
    else {
      console.log('that bai')
    }
    //get personalword
    const responses = await RecordingAPI.GetStorageWord<GetStorageWord>({
      data: []

    })
    if (responses.status === ResponseCode.SUCCESS) {
      // console.log(response.data)
      // setPersonDataFromApi(responses.data)
      // //check nếu word đã đc thêm vào personStorage
      isExits(response.data?.words, responses.data)
      // dispatch(showPersonStore(response.data))
    }


  }
 

  const isFocused = useIsFocused();

 
  React.useEffect(() => {

    getStorageWords()
    getCategory()

    // isExits(fullStore, personDataFromAPi)

  }, [])
  

  const [hasDone, setHasDone] = React.useState(true)


  const isExits = (fullStore, personalStore) => {
    let a = fullStore.map((items) => {
      const itemB = personalStore.find((item) => item.id === items.id);
      if (itemB) {
        dispatch(isClicked({
          ...items,
          isActive:false
        }))
      }

    })

  }
  const showToast= useToast()
//   const doneHandle =  () => {
//     // console.log(fullStore)
//     //map ra những item isCLicked
//     let maps= fullStore.filter(word=> word?.isActive===false)
// // lọc ra những item thuộc B mà không thuộc PersonApi --> add
//   let handAdd= maps.map((items) => {
//       let itemB = personDataFromAPi.find((item) => item.id === items.id);
//       if (!itemB) {
//         // dispatch(isClicked({
//         //   ...items,
//         //   isActive:false
//         // }))
//         console.log('add'+items?.word)
//         addWordToStorage(items?.id)
//       }
//     }
//   )
//     let handDelete= personDataFromAPi.map((items) => {
//       let itemB = maps.find((item) => item.id === items.id);
//       if (!itemB) {
//         // dispatch(isClicked({
//         //   ...items,
//         //   isActive:false
//         // }))
//         console.log('xoas'+items?.word)
//         deleteWordToStorage(items?.id)
//       }
//     }
    
//   )
  
// showToast('Lưu thành công', 'success')
// NavigationService.navigate(AuthenticatedScreens.StorageWords)
   
//   }
const doneHandle = async () => {
  let maps= fullStore.filter(word=> word?.isActive===false)
//   console.log('Handle maps')
// console.log(maps)
// console.log('--------------')
// console.log('Handle api')

console.log(personDataFromAPi)
let handAdd= await maps.map((items) => {
    let itemB = personDataFromAPi.find((item) => item.id === items.id);
    if (!itemB) {
      // dispatch(isClicked({
      //   ...items,
      //   isActive:false
      // }))
      // console.log('add'+items?.word)
      addWordToStorage(items?.id)
    }
  }
)
  let handDelete= await personDataFromAPi.map((items) => {
    let itemB =  maps.find((item) => item.id === items.id);
    if (!itemB) {
      // dispatch(isClicked({
      //   ...items,
      //   isActive:false
      // }))
      // console.log('xoas'+items?.word)
      deleteWordToStorage(items?.id)
    }
  }
  
)

showToast('Lưu thành công', 'success')
NavigationService.navigate(AuthenticatedScreens.StorageWords)
 
}

  const filterDatas = (item) => (
    fullStore.filter(word => word?.category?.id === item)

  )
  const handleChoose = (item) => {



    if (item?.isActive === false) {
      // console.log(item?.id)

      // deleteWordToStorage(item?.id)
      // console.log('Xoa')
      dispatch(isClicked({
        ...item,
        isActive:true
      }))
    }
    else {
      // console.log(item?.id)
      addWordToStorage(item?.id)
      // console.log('add')
      dispatch(isClicked({
        ...item,
        isActive:false
      }))
    }
    // console.log(item)
  

    

  }

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false); 
        getCategory()
        console.log(fullStore)
        
      }, 2000);
    }, []);
  return (


    <Container style={{backgroundColor: 'white'}}>
      <HeaderWithBack 
        outerStyle={{
          backgroundColor:colors.title_blue}} 
        title={'Kho từ'} handle={doneHandle} hasDone={true}
        titleStyle={{color: '#F1F1F2'}}
      />

{/* Word list container */}
      <View 
        style={{ 
          marginLeft: 10, 
          paddingTop: 30, 
          height: sizeHeight(90), 
          width: sizeWidth(95), 
          alignItems: 'center'
        }}
      >
        <FlatList
          data={category}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.blue]}
             />  
          }
          renderItem={({ item, index }) => (
            <View 
              key={index}
              style={{ 
                marginBottom: 22,
                paddingBottom: 15,
                borderRadius: 15,
                backgroundColor: '#E7F6FF',
                paddingLeft: 10
              }}
            >

              <View 
                key={index + 1} 
                style={{ 
                  width: sizeWidth(20),
                  borderRadius: 10, 
                  marginVertical: 5, 
                  marginBottom: -3, 
                  marginTop: 8, 
                  alignSelf: 'center'
                }}
              >
                <Text style={{ 
                  fontSize: 18, 
                  color: '#897666', 
                  fontWeight: 'bold', 
                  alignSelf: "center"
                  }}>{item?.name}
                </Text>
              </View>

              <View 
                key={index + 2} 
                style={{ 
                  flexDirection: 'row', 
                  marginTop: 8, 
                  height: sizeHeight(15)
                }}                
              >
                <FlatList

                  data={filterDatas(item?.id)}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  
                  renderItem={({ item, index }) => (

                    <View style={{ flexDirection: 'row', width: sizeWidth(30), height: sizeHeight(15), paddingTop:3}}>


                      <View style={{
                        backgroundColor: '#C1EBEA',
                        alignSelf: 'center', 
                        width: sizeWidth(23), 
                        marginHorizontal: 5, 
                        borderRadius: 10,
                        height: sizeHeight(14)
                        }}
                      >
                        <Image 
                          style={{
                            resizeMode: 'stretch',
                            height: sizeHeight(10), width: sizeWidth(18),
                            alignSelf: 'center',
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
                        <Text 
                          style={{ 
                            fontSize: 15, 
                            color: '#2D5672', 
                            fontWeight: 'bold', 
                            alignSelf: "center", 
                            marginTop: '10%'
                          }}>{item?.word}
                        </Text>
                      </View>
                      {
                        hasDone ? <CheckBox style={{ right: 25, bottom: 1, height:20 }} value={!item?.isActive} onValueChange={() => handleChoose(item)} /> : null
                      }
                    </View>
                  )}
                />

              </View>

            </View>
          )}

        />
      </View>

    </Container>
  )
}

export default Storage

const styles = StyleSheet.create({

  
})