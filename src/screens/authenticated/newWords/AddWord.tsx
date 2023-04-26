import React from 'react';
import { Container } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { sizeHeight } from 'utils/Utils';
import { View, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RecordingAPI, { AuthApis } from 'network/subs/auth/recording/RecordingAPI';
import { DeleteWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';
import colors from 'res/colors';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { useToast } from 'hooks/useToast';
import { ApiConstants } from 'network/ApiConstants';
import AddButton from 'components/button/AddButton';
import BigCardWithShield from 'components/cards/BigCardWithShield';
import { CAMERA_OPTION, IMAGE_LIBRARY_OPTION } from '../category/constant';
import { requestCameraPermission } from '../category/Permission';
import ChoiceTab from '../category/component/ChoiceTab';
import AddEditModal from 'components/modal/AddEditModal';
import { FILE_SIZE } from 'utils/Constant';
import ConfirmModal from 'components/modal/ConfirmModal';




const AddWord = ({ }: StackNavigationProps<
  Routes, AuthenticatedScreens.AddWord
>) => {
  const [data, setData] = React.useState([])
  const [datas, setDatas] = React.useState([])
  const [image, setImage] = React.useState("");
  const [random, setRandom] = React.useState(Math.random())
  const [cameraOptionsVisble, setCameraOptionsVisble] = React.useState(false)
  const [itemData, setItemData] = React.useState(new FormData())
  const [dataImage, setDataImage] = React.useState()


  const chooseImage = async () => {
    ImagePicker.launchImageLibrary(IMAGE_LIBRARY_OPTION, (response?: any) => {

      if (response.didCancel) {
        console.log('CANCEL')
      }
      else {
        if (!response.errorMessage) {
          const imageDatas = new FormData()

          console.log(response.assets)
          // setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
          setDataImage(response?.assets?.[0])

        }
        else {
          console.log("that bai")
        }
      }

    });
  };

  const deleteWord = async (item) => {
    const response = await RecordingAPI.DeleteWord<DeleteWord>({
      id: item?.id

    });
    if (response?.data.data.length === 0) {
      showToast('Bạn không có quyền xóa', 'danger')

    }
    else {
      // console.log("HIDE SUCCESS")
      setVisible(!visible)
      setVisibleConfirmModal(!visibleConfirmModal)
      showToast('Xóa thành công', 'success')
      loadData()

    }
    console.log(response?.data)
  }
  const [visibleConfirmModal, setVisibleConfirmModal] = React.useState(false)

  const confirmDeleteWord = ()=>{
    setVisibleConfirmModal(!visibleConfirmModal)
}
  const handleHideWord = () => {
    let maps = data.filter(item => item?.isActive === false)
    let map = maps.map((item) => {
      deleteWord(item)
    })
  }

  const takePhoto = async () => {
    if (await requestCameraPermission()) {
      ImagePicker.launchCamera(CAMERA_OPTION)
      .then((response: any) => {

        if (response.didCancel) {
          console.log('CANCEL')
        }
        if (!response.errorMessage) {
          // setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
          setDataImage(response?.assets?.[0])

        }

      })
      .catch(error => {

        showToast("Error",'warning')
      })
    }
  };
  const handleUpImage = () => {
    setCameraOptionsVisble(!cameraOptionsVisble)
  }
  const id = useSelector(store => store.storeReducer.categoryId)
  const loadData = async () => {
    const response: any = await RecordingAPI.GetWordByCateID<GetWordByCateID>({
      pageIndex: 1,
      pageSize: 20,
      word: '',
      categoryId: id,
      isActive: true
    });
    if (response.status === ResponseCode.SUCCESS) {
      setData(response.data?.words)
    }
    else {
      console.log('that bai')
    }
  }
  React.useEffect(() => {
    loadData()
    // console.log(id)

  }, [])

  const dispatch = useDispatch()
  const show = useSelector(store => store.storeReducer.show)
  const handle = () => {
    showDoneIcon
      ? null
      : setVisible(!visible)
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const
    onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        loadData();
      }, 2000);
    }, []);

  const showToast = useToast()
  const [configModalvisible, setConfigModalvisible] = React.useState(false)

  const handleAddWord = () => {
    setConfigModalvisible(!configModalvisible)
  }
  const [editPopupVisivle, setEditPopupVisivle] = React.useState(false)
  const [personData, setPersonData] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState("");
  const handleCancel = () => {
    setVisible(!visible)
  }

  const handleEditCategory = () => {

    if (count < 2) {
      let maps = data.map((item) => {
        if (item?.isActive === false) {
          if (item?.type === "ADMIN") {
            showToast("Bạn không thể chỉnh sửa mục này", 'warning')
          } else {
            setEditPopupVisivle(!editPopupVisivle)
            setVisible(!visible)
            setPersonData(item)
            setValue(item?.word)
            textInputRef.current = item?.word

          }
        }
      })
    }
    else {
      showToast("Chỉ được chọn 1 mục để sửa", "warning")
    }


  }



  //block sửa từ start
  const updateWord = async (item: any) => {
    let name = ''
    let special = false
    textInputRef.current
      ? name = encodeURIComponent(textInputRef.current)
      : name = encodeURIComponent(item?.word)
    const imageData = new FormData()
    if (dataImage) {

      imageData.append(
        "file-image", {
        uri: dataImage?.uri,
        name: dataImage?.fileName,
        type: dataImage?.type
      }
      )
      special = true
    }
    let url = AuthApis.UpdateWord+`?wordId=${item?.id}&categoryId=${item?.category?.id}&word=${name}&wordAudio=${name}`
    fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: store.getState().authReducer.user.accessToken,
      },
      body: dataImage ? imageData : null
    })
    .then(response=>{
      if (response.status === 200) {
        console.log(" Update SUCCESS")
        showToast("Thay đổi thành công", 'success')
        setEditPopupVisivle(!editPopupVisivle)
        loadData()
        textInputRef.current = null
        setDataImage('')
        // setRandom(Math.random())
      }
      else {
        showToast("ERROR", 'warning')
      }
    })
    .catch(err => {console.log(err)})
  }
  //block sửa từ end
  const textInputRef = React.useRef(null);
  const handleType = (e) => {
    textInputRef.current = e

  };
  const [searchValue, setSearchValue] = React.useState('')
  const filterData = () => (
    data.filter(item => encodeURIComponent(item?.audioWord.toLowerCase()).includes(encodeURIComponent(searchValue.toLowerCase())))
  )
  const [showDoneIcon, setShowDoneIcon] = React.useState(true)

  React.useEffect(() => {
    checkDone()
    checkCount()
  }, [data])


  const checkCount = () => {
    let counts = 0
    let tmp = data.map((item) => {
      if (item?.isActive === false) {
        counts = counts + 1
      }
    })
    setCount(counts)
  }
  const checkDone = () => {
    let tmp = data.find(item => item?.isActive === false)
    if (tmp) {
      setShowDoneIcon(false)
    }
    else {
      setShowDoneIcon(true)
      setCount(0)
    }
  }
  const [count, setCount] = React.useState(1)
  const handleOnclick = (item) => {
    if (item?.isActive === true) {
      setCount(count + 1)
    }
    let tmp = data.map((items) => {
      if (items?.id === item.id) {
        return {
          ...items,
          isActive: !item?.isActive
        }
      }
      return items
    })
    setData(tmp)
  }
  const handleDoneEdit = () => {
    updateWord(personData)
  }
  const [isLoading, setIsLoading] = React.useState(false)
  const handleDoneAdd = async () => {
    let name = encodeURIComponent(textInputRef.current)
    if (textInputRef.current===null || !textInputRef.current) {
      showToast("Bạn chưa nhập tên mục", "warning")
    }
    else {
      const imageData = new FormData()
      setIsLoading(true)
      if (dataImage) {
        imageData.append(
          "file-image",
          {
            uri: dataImage?.uri,
            name: dataImage?.fileName,
            type: dataImage?.type
          }
        )
      }
      let url = AuthApis.UpdateWord+`?categoryId=${id}&word=${name}&wordAudio=${name}`
      
      fetch(url, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          // 'Content-Type':'multipart/form-data',
          Authorization: store.getState().authReducer.user.accessToken,
        },
        body: dataImage ? imageData : null
      })
        .then(res => {
  
          if (res.status === 200) {
            showToast("Thêm thành công", 'success')
            setConfigModalvisible(!configModalvisible)
            setDataImage('')
            setIsLoading(false)
            loadData()
            textInputRef.current = null
            
  
          }
          else {
            showToast("ERROR", 'danger')
            setIsLoading(false)
          // console.log(res?.data)
          console.log(res)
  
          }
  
        })
        .catch(err =>{
          showToast("ERROR", 'danger')
          setIsLoading(false)
          console.log(err)
        })
    }

    
    
  }
  return (
    <Container 
      style={{ backgroundColor: 'white'}}
      isBottomTab={false}
    >
      <HeaderWithBack
        title={'Từ vựng'}
        titleStyle={{
          color: colors.text_blue,
        }}
        outerStyle={{ backgroundColor: colors.title_blue }}
        rightIconShow={!showDoneIcon}
        hasDone={showDoneIcon}
        handle={handle}
      />
      <AddButton
        onpress={handleAddWord}
        text={'Thêm từ'}
      />

      <View
        style={{
          height: sizeHeight(80),
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: sizeHeight(2),
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={false}
          contentContainerStyle={{
            alignSelf: 'center',
            paddingBottom: sizeHeight(5)
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.blue]}
            />
          }
          renderItem={({ item, index }) => (

            <BigCardWithShield
              onPress={() => handleOnclick(item)}
              isDoubleTap={true}
              // activeOpacity={0.7}
              type={item?.type}
              title={item?.word}
              isClicked={item?.isActive}
              uri={ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=${FILE_SIZE}&${item?.updatedAt}`}
            />

          )}

        />
      </View>


      {/* Choice tab */}
      <ChoiceTab
        visible={visible}
        onDismiss={() => {
          setVisible(false)
        }}
        editCategory={handleEditCategory}
        deleteCategory={confirmDeleteWord}
        cancel={handleCancel}
        nameChoice='từ'
      />



      {/* Popup Edit từ */}
      <AddEditModal
        visible={editPopupVisivle}
        title={"Chỉnh sửa từ"}
        isLoading={isLoading}
        onDismiss={() => { setEditPopupVisivle(!editPopupVisivle) }}
        handleSubmit={handleDoneEdit}
        source={dataImage ? { uri: dataImage?.uri }
          : {
            uri: ApiConstants.HOST + `ext/files/download?id=${personData?.pictureFileId}&file-size=${FILE_SIZE}&${personData?.updatedAt}`,
            method: 'GET',
            headers: { Authorization: store.getState().authReducer.user.accessToken }
          }
        }
        slogan={"Tên từ:"}
        cancel={() => { setEditPopupVisivle(!editPopupVisivle); setValue(''); setImage('') }}
        defaultValue={value}
        onChangeText={(e) => handleType(e)}
        handleChoiceCamera={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        cancelModalCamera={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        onModalCameraDismiss={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        chooseImage={chooseImage}
        takePhoto={takePhoto}
        cameraOptionsVisble={cameraOptionsVisble}


      />


      {/* Pop up thêm từ */}
      <AddEditModal
        title={'Thêm từ'}
        visible={configModalvisible}
        isLoading={isLoading}
        onDismiss={() => { setConfigModalvisible(!configModalvisible) }}
        source={dataImage ? { uri: dataImage?.uri } : null}
        handleSubmit={handleDoneAdd}
        cancel={() => { setConfigModalvisible(!configModalvisible); setValue(''); setImage('') }}
        takePhoto={takePhoto}
        slogan={"Tên từ:"}

        chooseImage={chooseImage}
        defaultValue={value}
        onChangeText={(e) => handleType(e)}
        cameraOptionsVisble={cameraOptionsVisble}
        handleChoiceCamera={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        cancelModalCamera={() => { setCameraOptionsVisble(!cameraOptionsVisble) }}
        onModalCameraDismiss={() => setCameraOptionsVisble(!cameraOptionsVisble)}
      />
    <ConfirmModal
         visible={visibleConfirmModal}
         handleCancel={()=>setVisibleConfirmModal(!visibleConfirmModal)}
         text1='Bạn có chắc chắn muốn xóa?'
         confirmText='Xác nhận'
         handleConfirm={handleHideWord}
         style={{marginTop: sizeHeight(42)}}
        //  style={{borderWidth:1}}
      
      />
    </Container>
  )
};
export default AddWord