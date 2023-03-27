import React from 'react';
import { Container } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { sizeHeight } from 'utils/Utils';
import { View, FlatList } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { AddWordForUser, DeleteWord, GetWordByCateID, UpdateWord } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';
import colors from 'res/colors';
import { RefreshControl } from 'react-native-gesture-handler';
import { Menu, Modal } from 'react-native-paper';
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




const AddWord = ({ }: StackNavigationProps<
  Routes, AuthenticatedScreens.AddWord
>) => {
  const [data, setData] = React.useState([])
  const [datas, setDatas] = React.useState([])
  const [image, setImage] = React.useState("");
  const [random, setRandom] = React.useState(Math.random())
  const [cameraOptionsVisble, setCameraOptionsVisble] = React.useState(false)
  const [itemData, setItemData] = React.useState(new FormData())


  const chooseImage = async () => {
    ImagePicker.launchImageLibrary(IMAGE_LIBRARY_OPTION, (response?: any) => {

      if (response.didCancel) {
        console.log('CANCEL')
      }
      else {
        if (!response.errorMessage) {
          const imageDatas = new FormData()

          console.log(response.assets)
          setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
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
      showToast('Xóa thành công', 'success')
      loadData()

    }
    console.log(response?.data)
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
          setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
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

  // Pop up thêm hình ảnh cho từ mới
  const ModalCamera = () => {
    return (
      <Modal
        visible={cameraOptionsVisble}
        style={{
          backgroundColor: '#E7F6FF',
          borderRadius: 15,
          height: 200,
          marginTop: sizeHeight(46),
          alignSelf: 'center',
          width: '90%',
          marginHorizontal: 20,
        }}
        onDismiss={() => {
          setCameraOptionsVisble(!cameraOptionsVisble)
        }}
      >
        <Menu.Item
          titleStyle={{ fontSize: 18, color: '#2D5672' }}
          leadingIcon="camera"
          onPress={takePhoto}
          title="Chụp ảnh"
        />
        <Menu.Item
          titleStyle={{ fontSize: 18, color: '#2D5672' }}
          leadingIcon="store-settings"
          onPress={chooseImage}
          title="Chọn ảnh từ thư viện"
        />
        <Menu.Item
          titleStyle={{ color: 'red', fontSize: 18 }}
          leadingIcon="archive-cancel"
          onPress={() =>
            setCameraOptionsVisble(!cameraOptionsVisble)}
          title="Hủy bỏ"
        />
      </Modal>
    )
  }

  //block sửa từ start
  const updateWord = async (item: any) => {
    let name = ''
    let special = false
    textInputRef.current
      ? name = encodeURIComponent(textInputRef.current)
      : name = encodeURIComponent(item?.word)
    const imageData = new FormData()
    if (image !== "") {

      imageData.append(
        "file-image", {
        uri: image,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      }
      )
      special = true
    }
    const response = await RecordingAPI.UpdateWord<UpdateWord>({
      wordId: item?.id,
      categoryId: item?.category?.id,
      word: name,
      wordAudio: name,
      isActive: special,
      data: imageData
    })
    if (response.status === 200) {
      console.log(" Update SUCCESS")
      showToast("Thay đổi thành công", 'success')
      setEditPopupVisivle(!editPopupVisivle)
      setRandom(Math.random())
      setImage("")
      loadData()
    }
    else {
      console.log(response)
    }
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
  const handleDoneAdd = async () => {
    const imageData = new FormData()
    if (image !== "") {

      imageData.append(
        "file-image", {
        uri: image,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      }
      )
    }
    
    const response = await RecordingAPI.AddWord<AddWordForUser>({
      categoryId: id,
      word: encodeURIComponent(textInputRef.current),
      wordAudio: encodeURIComponent(textInputRef.current),
      data: imageData,
      isActive: true
    })
    if (response.status === 200) {
      showToast("Thêm thành công", 'success')
      setConfigModalvisible(!configModalvisible)
      setImage("")
      loadData()

    }
    else{
      console.log(response)
    }
    
  }
  return (
    <Container style={{ backgroundColor: 'white' }}>
      <HeaderWithBack
        title={'Từ vựng'}
        titleStyle={{
          color: colors.header_title,
          marginLeft: '7%'
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
          width: '95%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 10
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}
          contentContainerStyle={{paddingBottom: '5%'}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.blue]}
            />
          }
          renderItem={({ item }) => (

            <BigCardWithShield
              onPress={() => handleOnclick(item)}
              isDoubleTap={true}
              // activeOpacity={0.7}
              type={item?.type}
              title={item?.word}
              isClicked={item?.isActive}
              source={{
                uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&${random}`,
                method: 'GET',
                headers: { Authorization: store.getState().authReducer.user.accessToken }
              }}
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
        deleteCategory={handleHideWord}
        cancel={handleCancel}
      />



      {/* Popup Edit từ */}
      <AddEditModal
        visible={editPopupVisivle}
        title={"Chỉnh sửa từ"}
        onDismiss={() => { setEditPopupVisivle(!editPopupVisivle) }}
        handleSubmit={handleDoneEdit}
        source={image ? { uri: image }
          : {
            uri: ApiConstants.HOST + `ext/files/download?id=${personData?.pictureFileId}&file-size=ORIGINAL`,
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


      />

      {/* <AddEditModal title={"Chỉnh sửa từ"}
        visible={editPopupVisivle}
        onDismiss={() => {
          setEditPopupVisivle(!editPopupVisivle)

        }}
        handleSubmit={handleDoneEdit}
        source={image ? { uri: image }
          : {
            uri: ApiConstants.HOST + `ext/files/download?id=${personData?.pictureFileId}&file-size=ORIGINAL`,
            method: 'GET',
            headers: { Authorization: store.getState().authReducer.user.accessToken }
          }
        }
        cancel={() => { setEditPopupVisivle(!editPopupVisivle); setValue('') ; setImage('') }}
        cateName={personData?.name}
      /> */}

      {/* Pop up thêm từ */}
      <AddEditModal
        title={'Thêm từ'}
        visible={configModalvisible}
        onDismiss={() => { setConfigModalvisible(!configModalvisible) }}
        source={image ? { uri: image } : null}
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
    </Container>
  )
};
export default AddWord