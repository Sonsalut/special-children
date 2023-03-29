import { AuthenticatedScreens } from 'routers/ScreenNames';
import ResponseCode from 'network/ResponseCode';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { AddWordToStorage, DeleteWordToStorage, GetFullCategory } from 'network/subs/auth/recording/RecordingRequest';
import React from 'react';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { useDispatch, useSelector } from 'react-redux';
import { isClicked, setCategory, setStorage } from 'redux/storageWord/action';
import NavigationService from 'routers/NavigationService';
import { useToast } from 'hooks/useToast';
import AuthApi from 'network/subs/auth/AuthApi';
import authSlice from 'redux/slice/authSlice';



export const useLogicStorage = () => {
  const [data, setData] = React.useState([])

  const [dataWord, setDataWord] = React.useState([])
  const [dataWords, setDataWords] = React.useState([])
  const [personDataFromAPi, setPersonDataFromApi] = React.useState()
  const category = useSelector(store => store.storeReducer.category)
  const fullStore = useSelector(store => store.storeReducer.fullStore)
  const getCategory = async (values: any) => {
    const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
      pageIndex: 1,
      pageSize: 50,
      name: null,
      isActive: true,

    });
    if (response.status === ResponseCode.SUCCESS) {
      // if (category.length <= 0) {
      // console.log( response.data?.categories)
      dispatch(setCategory(response.data?.categories))
      // console.log('AAAAA'+ response.data.categories)
      loadData(response.data?.categories?.id)
      // }

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
    const responseWord: any = await RecordingAPI.GetWordByCateID<GetWordByCateID>({
      pageIndex: 1,
      pageSize: 100,
      word: '',
      categoryId: id,
      isActive: true
    });
    if (responseWord.status === ResponseCode.SUCCESS) {
      dispatch(setStorage(responseWord.data?.words))
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
      isExits(responseWord?.data?.words, responses.data)
      // dispatch(showPersonStore(response.data))
    }
  }

  const [hasDone, setHasDone] = React.useState(true)


  const isExits = (fullStore, personalStore) => {
    let a = fullStore.map((items) => {
      const itemB = personalStore.find((item) => item.id === items.id);
      if (itemB) {
        dispatch(isClicked({
          ...items,
          isActive: false
        }))
      }

    })

  }
  const showToast = useToast()
  const doneHandle = async () => {
    let maps = fullStore.filter(word => word?.isActive === false)
    if (maps) {
      let handAdd = await maps.map((items) => {
        let itemB = personDataFromAPi.find((item) => item.id === items.id);
        if (!itemB) {
          addWordToStorage(items?.id)
        }
      }
      )
      let handDelete = await personDataFromAPi.map((items) => {
        let itemB = maps.find((item) => item.id === items.id);
        if (!itemB) {

          deleteWordToStorage(items?.id)
        }
      }
      )
      showToast('Lưu thành công', 'success')
      NavigationService.navigate(AuthenticatedScreens.StorageWords)
    }

  }
  const filterDatas = (item) => (
    fullStore.filter(word => word?.category?.id === item)
  )
  const searchData = () => (
    fullStore.filter(item => encodeURIComponent(item?.word.toLowerCase()).includes(encodeURIComponent(searchValue.toLowerCase())))

  )
  const handleChoose = (item) => {
    if (item?.isActive === false) {
      dispatch(isClicked({
        ...item,
        isActive: true
      }))
    }
    else {
      //   addWordToStorage(item?.id)
      // console.log('add')
      dispatch(isClicked({
        ...item,
        isActive: false
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
      loadData()

    }, 2000);
  }, []);
  const [show, setShow] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  return {
    personDataFromAPi, setPersonDataFromApi,
    category,
    fullStore,
    getCategory,
    getStorageWords,
    addWordToStorage,
    deleteWordToStorage,
    loadData,
    hasDone, setHasDone,
    isExits,
    doneHandle,
    filterDatas,
    searchData,
    handleChoose,
    refreshing, onRefresh,
    show, setShow,
    searchValue, setSearchValue



  }

} 