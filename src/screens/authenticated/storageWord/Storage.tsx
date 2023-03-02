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
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header } from 'components';
import { Title } from 'react-native-paper';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
import Vi from 'assets/languages/vi';
import CheckBox from '@react-native-community/checkbox';
import { Value } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { filterStorage, isClicked, setCategory, setStorage, showPersonStore, updateStorage } from 'redux/storageWord/action';
import NavigationService from 'routers/NavigationService';
import { useIsFocused } from '@react-navigation/native';
import colors from 'res/colors';
const Storage = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.StorageWord
>) => {
  const [data, setData] = React.useState([])

  const [dataWord, setDataWord] = React.useState([])
  const [dataWords, setDataWords] = React.useState([])
  const [personDataFromAPi, setPersonDataFromApi] = React.useState([])

  const getCategory = async (values: any) => {
    const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
      pageIndex: 1,
      pageSize: 20,
      name: null,
      isActive: true,
      categories: {}

    });
    if (response.status === ResponseCode.SUCCESS) {
      if (category.length <= 0) {
        dispatch(setCategory(response.data.categories))
        loadData(response.data.categories?.id)
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
      console.log(personDataFromAPi)
      // dispatch(showPersonStore(response.data))




    }

  }
  const addWordToStorage = async (id: any) => {
    const response = await RecordingAPI.AddWordToStorage<AddWordToStorage>({
      wordId: id
    });
    if (response.status === ResponseCode.SUCCESS) {
      console.log("SUCESS")
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



  const category = useSelector(store => store.storeReducer.category)
  const filterWordStore = useSelector(store => store.storeReducer.filterCategory)
  const personalStorage = useSelector(store => store.storeReducer.personalStore)
  const fullStore = useSelector(store => store.storeReducer.fullStore)


  const dispatch = useDispatch()
  const loadData = async (id: any) => {
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
      dispatch(setStorage(response.data?.words))
    }
    else {
      console.log('that bai')
    }
  }
  const firstHandle = async () => {

    await getStorageWords()
    await getCategory()

  }

  const isFocused = useIsFocused();


  React.useEffect(() => {

    getStorageWords()
    getCategory()
    isExits(fullStore, personDataFromAPi)


  }, [])

  const [hasDone, setHasDone] = React.useState(false)


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
  const doneHandle = async () => {
    setHasDone(!hasDone)
  }
  const filterDatas = (item) => (
    fullStore.filter(word => word?.category?.id === item)

  )
  const handleChoose = (item) => {



    if (item?.isActive == false) {
      // console.log(item?.id)

      deleteWordToStorage(item?.id)
      console.log('Xoa')
      dispatch(isClicked({
        ...item,
        isActive:true
      }))
    }
    else {
      // console.log(item?.id)
      addWordToStorage(item?.id)
      console.log('add')
      dispatch(isClicked({
        ...item,
        isActive:false
      }))
    }
    // console.log(item)
  

  }

  return (


    <Container style={{backgroundColor: 'white'}}>
      <HeaderWithBack 
        outerStyle={{
          backgroundColor:colors.title_blue}} 
        title={'Kho từ'} handle={doneHandle} hasDone={hasDone}
        titleStyle={{
          color: colors.text_blue
        }}
      />

{/* Word list container */}
      <View style={{ marginLeft: 10, marginTop: 10, height: sizeHeight(90), width: sizeWidth(95), alignItems: 'center' }}>
        <FlatList
          data={category}
          renderItem={({ item, index }) => (
            <View key={index} >

              <View key={index + 1} style={{ width: sizeWidth(20),borderRadius: 10, marginVertical: 5, marginBottom: -3, marginTop: 8, alignSelf: 'center'}}>
                

                <Text style={{ fontSize: 18, color: '#E36A51', fontWeight: 'bold', alignSelf: "center" }}>{item?.name}</Text>
              </View>

              <View key={index + 2} style={{ flexDirection: 'row', marginTop: 5, height: sizeHeight(15)}}>

                <FlatList

                  data={filterDatas(item?.id)}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (

                    <View style={{ flexDirection: 'row', width: sizeWidth(30), height: sizeHeight(15) }}>


                      <View style={{backgroundColor: '#99C8E4',alignSelf: 'center', width: sizeWidth(23), marginHorizontal: 5, borderRadius: 10, paddingTop: 0, height: sizeHeight(14)}}>
                        <Image style={{
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
                        <Text style={{ fontSize: 15, color: '#2D5672', fontWeight: 'bold', alignSelf: "center", marginTop: '10%'}}>{item?.word}</Text>
                      </View>

                      {
                        hasDone ? <CheckBox style={{ right: 25, bottom: 6 }} value={!item?.isActive} onValueChange={() => handleChoose(item)} /> : null

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