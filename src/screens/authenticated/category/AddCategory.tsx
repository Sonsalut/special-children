import React from 'react';
import { Container, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { Text, View, Image, ScrollView, KeyboardAvoidingView, FlatList, TextInput, PermissionsAndroid } from 'react-native';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import {  AddCategoryForUser, CategoryStatus, DeleteCategory, GetFullCategory, UpdateCategory } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';
import colors from 'res/colors';
import { RefreshControl } from 'react-native-gesture-handler';
import { Menu, Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { useToast } from 'hooks/useToast';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import { ApiConstants } from 'network/ApiConstants';


const AddCategory = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.AddCategory
>) => {

  const [animal, setAnimal] = React.useState([])
  const [imgBase64, setImgBase64] = React.useState()
  const [itemData, setItemData] = React.useState(new FormData())
  const [image, setImage] = React.useState("");
  const [value, setValue] = React.useState("");
  const textRef = React.useRef('')

  const textToRef = (value) => {
    textRef.current = textRef.current + value
  }
  const MAX_IMAGE_WIDTH = 480;
  const MAX_IMAGE_HEIGHT = 480;
  const IMAGE_QUALITY = 60;
  const IMAGE_LIBRARY_OPTION: any = {
    mediaType: 'photo',
    selectionLimit: 1,
    includeBase64: true
  };

  const CAMERA_OPTION: ImagePicker.CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    includeBase64: true,
    quality: 1,

  };

  const chooseImage = async () => {
    ImagePicker.launchImageLibrary(IMAGE_LIBRARY_OPTION, (response?: any) => {

      if (response.didCancel) {
        console.log('CANCEL')
      }
      else {
        if (!response.errorMessage) {

          console.log(response.assets)
          const imageDatas = new FormData()
          console.log(response.assets)
          setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
          imageDatas.append(
            "file-image", {
            uri: response?.assets?.[0]?.uri,
            name: 'image.png',
            fileName: 'image',
            type: 'image/png',

          }
          )
          console.log(imageDatas)
          setItemData(imageDatas)


        }
        else {
          console.log("that bai")
        }
      }

    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        return true
      } else {
        console.log("Camera permission denied");
        return false
      }
    } catch (err) {
      console.warn(err);
      return false
    }
  };
  const takePhoto = async () => {

    if (await requestCameraPermission()) {
      ImagePicker.launchCamera(CAMERA_OPTION, (response?: any) => {
        if (response.didCancel) {
          console.log('CANCEL')
        }
        else {
          if (!response.errorMessage) {
            const imageData = new FormData()
            console.log(response.assets)
            setImage(response?.assets?.[0]?.uri)
            setCameraOptionsVisble(!cameraOptionsVisble)
            imageData.append(
              "file-image", {
              uri: response?.assets?.[0]?.uri,
              name: 'image.png',
              fileName: 'image',
              type: 'image/png',
              }
            )
            // console.log(imageData.getParts())
            setItemData(imageData)
          }
          else {
            console.log(response.errorMessage)
          }
        }
      });
    }
  };
  const [data, setData] = React.useState([])
  const [datas, setDatas] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const getCategory = async (values: any) => {
    const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
      pageIndex: 1,
      pageSize: 20,
      name: null,
      isActive: true,
    
    });
    if (response.status === ResponseCode.SUCCESS) {

      setData(response.data?.categories)
      // console.log(data)
    }
  }


  const dispatch = useDispatch()
  const show = useSelector(store => store.storeReducer.show)
  const handle = () => {
    showDoneIcon
      ? null
      : setVisible(!visible)
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
    // checkDone()
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
    // console.log(count)
    // console.log(tmp) 
    // console.log(showDoneIcon)
  }
  const showToast = useToast()
  const [configModalvisible, setConfigModalvisible] = React.useState(false)
  const handleAddCategory = () => {
    setConfigModalvisible(!configModalvisible)
  }
  const setStatusCategory = async (item) => {
    const response = await RecordingAPI.SetStatusCategory<CategoryStatus>({
      id: item?.id,
      status: item?.isActive

    });
    if (response.status === ResponseCode.SUCCESS) {

      console.log("HIDE SUCCESS")
      setVisible(!visible)
      showToast('Xóa thành công', 'success')
      getCategory()
    }
    else {
      showToast('Bạn không có quyền xóa', 'danger')

    }
  }

  const deleteCategory = async (id)=>{
    const response= await RecordingAPI.DeleteCategory<DeleteCategory>({
      id:id
    })
    if(response?.data.data.length ===0)
    {
      showToast('Bạn không có quyền xóa', 'danger')
        
    }
    else
    {
      // console.log("HIDE SUCCESS")
      setVisible(!visible)
      showToast('Xóa thành công', 'success')
      getCategory()

    }
  }
  const handleHideCategory = () => {
    let maps = data.filter(item => item?.isActive === false)
    let map = maps.map((item) => {
      // setStatusCategory(item)
      deleteCategory(item?.id)
    })
  }
  const handleCancel = () => {
    setVisible(!visible)
  }
  const [editPopupVisivle, setEditPopupVisivle] = React.useState(false)
  const [personData, setPersonData] = React.useState([])
  const handleEditCategory = () => {
    setEditPopupVisivle(!editPopupVisivle)
    setVisible(!visible)
    let maps = data.map((item) => {
      if (item?.isActive === false) {
        setPersonData(item)
        setValue(item?.name)

      }
    })
  }
  const [cameraOptionsVisble, setCameraOptionsVisble] = React.useState(false)
  const handleUpImage = () => {
    setCameraOptionsVisble(!cameraOptionsVisble)
  }
  React.useEffect(() => {
    getCategory()

  }, [])
  React.useEffect(() => {
    checkDone()
    checkCount()
  }, [data])


  const ModalCamera = () => {
    return (
      <Modal

        visible={cameraOptionsVisble}

        style={{
          backgroundColor: '#ADDDDC',
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
        <Menu.Item titleStyle={{ fontSize: 18 }} leadingIcon="camera" onPress={takePhoto} title="Chụp ảnh" />
        <Menu.Item titleStyle={{ fontSize: 18 }} leadingIcon="store-settings" onPress={chooseImage} title="Chọn ảnh từ thư viện" />
        <Menu.Item titleStyle={{ color: 'red', fontSize: 18 }} leadingIcon="archive-cancel" onPress={() => setCameraOptionsVisble(!cameraOptionsVisble)} title="Hủy bỏ" />
      </Modal>

    )
  }
  const textInputRef = React.useRef(null);
  const handleType = (e) => {
    textInputRef.current = e

  };
  const updateCategory = async (item: any, data: FormData) => {
    let name = ''
    textInputRef.current
      ? name = encodeURIComponent(textInputRef.current)
      : name = encodeURIComponent(item?.name)
    const response = await RecordingAPI.UpdateCategory<UpdateCategory>({

      id: item?.id,
      name: name,
      isActive: true,
      description: 'ss',
      data: data
    })
    if (response.status === 200) {
      console.log(" Update SUCCESS")
      showToast("Thay đổi thành công", 'success')
      setEditPopupVisivle(!editPopupVisivle)
      getCategory()
    }
    else {
      console.log(response.error)
    }
  }
  const handleDoneEdit = () => {
    if (textInputRef.current) {
      console.log(textInputRef.current)
      // console.log(image)

    }
    updateCategory(personData, itemData)

    console.log(itemData)
  }
    
  const handleDoneAddCategory = async()=>{
    console.log(textInputRef.current)
    let name= encodeURIComponent(textInputRef.current)
    const response= await RecordingAPI.AddCategoryForUser<AddCategoryForUser>({
      name:name,
    description:'',
    data:itemData
    })
    if(response.status===200)
    {
      showToast("Thêm thành công", 'success')
      setConfigModalvisible(!configModalvisible)
      getCategory()

    }
    
  }
  const AddEditModal = (props) => {
    return (
      <Modal
        visible={props.visible}
        style={{
          backgroundColor: '#ADDDDC',
          borderRadius: 15,
          height: 580,
          marginTop: sizeHeight(20),
          width: '90%',
          marginHorizontal: 20,
        }}
        onDismiss={props.onDismiss}
      >
        <ScrollView style={{ height: '100%' }}>
          <KeyboardAvoidingView
            behavior='position'
            keyboardVerticalOffset={82}
            style={{ width: '100%', height: '100%' }}>
            {/* title */}
            <View style={{ width: '90%', height: sizeHeight(8), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity onPress={props.cancel}>
                <Text style={{ fontSize: 15, color: 'red' }}>Hủy bỏ</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: "400", paddingRight: 20 }}>{props.title}</Text>
              <TouchableOpacity isDoubleTap={true} onPress={props.handleSubmit}>
                <Icon name="checkmark-outline" size={sizeHeight(3)} />
              </TouchableOpacity>
            </View>
            {/* content */}
            <View style={{ width: '90%', justifyContent: 'space-around', height: sizeHeight(63), alignSelf: 'center', paddingBottom: 15, bottom: 15 }}>
              <TouchableOpacity onPress={handleUpImage}>
                <View style={{ borderWidth: 1, width: '90%', borderRadius: 5, alignSelf: 'center', alignItems: 'center', height: sizeHeight(32) }}>
                  <Image
                    style={{
                      resizeMode: 'stretch',
                      height: '85%',
                      width: '100%',
                      marginTop: '1%',
                      // sizeWidth(39),
                      borderRadius: sizeWidth(3),
                    }}
                    source={props.source}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: '90%', alignSelf: 'center', height: sizeHeight(10) }}>
                <Text style={{ fontSize: 15, color: 'black' }}>Tên chủ đề: </Text>
                <TextInput
                  style={{ height: sizeHeight(7), width: '100%', borderRadius: 5, borderWidth: 1 }}
                  // onChangeText={(text) => handleType(text)}
                  defaultValue={value}
                  onChangeText={(e) => handleType(e)}
                />
              </View>
              {/* <View style={{borderRadius:5, width: '90%', alignSelf: 'center', borderWidth: 1, height: sizeHeight(8) }}>
              </View> */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <ModalCamera />
      </Modal>


    )
  }


  return (
    <Container style={{ flex: 1 }}>
      <HeaderWithBack title={'Chủ đề'}

        outerStyle={{ backgroundColor: colors.title_blue }}
        rightIconShow={true}
        hasDone={showDoneIcon}
        handle={handle} />

      <TouchableOpacity
        style={{
          marginLeft: 10,
          width: '50%',
          height: sizeWidth(10),
          borderRadius: 45,
          marginTop: 10,
          backgroundColor: '#FFD19A',
          alignSelf: 'center'
        }}
        onPress={handleAddCategory}
        isDoubleTap={true}
      >
        <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15, fontWeight: 'bold', color: '#2D5672' }}>Thêm chủ đề</Text>
      </TouchableOpacity>
      <View style={{ height: sizeHeight(85), width: '95%', alignSelf: 'center', alignItems: 'center' }}>
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
          renderItem={({ item }) => (

            <TouchableOpacity
              onPress={() => handleOnclick(item)}
              isDoubleTap={true}
              activeOpacity={0.7}
              style={{
                width: sizeWidth(40),
                // sizeWidth(40),
                // marginVertical: 15,
                height: sizeHeight(28),
                borderRadius: 10,
                marginHorizontal: 9,
                alignSelf: 'center',
                marginTop: 30,
                paddingHorizontal: 10,
                backgroundColor: '#C1EBEA',
                paddingTop: 5,
                borderWidth: item?.isActive ? 0 : 2
              }}
            >
              {
                item?.type==='ADMIN'
             ? <Icon name='shield-sharp' size={sizeHeight(3)} style={{ width: '20%', alignSelf: 'flex-end' }} />
              
                :null
              }
              <View >
                <Image
                  style={{
                    resizeMode: 'stretch',
                    height: '80%',
                    width: '100%',

                    // marginTop: '1%',
                    // sizeWidth(39),
                    borderRadius: sizeWidth(3),


                  }}
                  source={item?.pictureFileId !== null ? {
                    // uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                    uri: ApiConstants.HOST+ `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                     
                    method: 'GET',
                    headers: { Authorization: store.getState().authReducer.user.accessToken }
                  } :
                    require('../../.././assets/images/no.png')
                  }
                />
                <Text style={{ fontSize: fontSize(5), alignSelf: 'center', fontWeight: 'bold', color: '#2D5672' }}>{item?.name}</Text>
              </View>

            </TouchableOpacity>
          )}

        />

      </View>
      {/* Popup Edit chủ đề */}

      <AddEditModal title={"Chỉnh sửa chủ đề"}
        visible={editPopupVisivle}
        onDismiss={() => {
          setEditPopupVisivle(!editPopupVisivle)

        }}
        handleSubmit={handleDoneEdit}
        source={image ? { uri: image }
          : {
            uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${personData?.pictureFileId}&file-size=ORIGINAL`,
            method: 'GET',
            headers: { Authorization: store.getState().authReducer.user.accessToken }
          }
        }
        cancel={() => { setEditPopupVisivle(!editPopupVisivle); setValue(''); setImage('') }}
        cateName={personData?.name}
      />

      {/* màn hình thêm chủ đề */}
      <AddEditModal title={'Thêm chủ đề'}
        visible={configModalvisible}
        source={image ? { uri: image } : null}
        onDismiss={() => setConfigModalvisible(!configModalvisible)}
        handleSubmit={handleDoneAddCategory}
        cancel={() => { setConfigModalvisible(!configModalvisible); setValue(''); setImage('') }} />
      {/* Choice Tab */}
      <Modal
        visible={visible}
        style={{
          backgroundColor: '#ADDDDC',
          borderRadius: 15,
          height: 250,
          marginTop: 540,
          // alignSelf:'flex-start',
          width: '90%',
          marginHorizontal: 20,

        }}
        onDismiss={() => {
          //  setShow(false)
          setVisible(false)
        }}
      >
        {
          count < 2
            ? <Menu.Item titleStyle={{ fontSize: 18 }} leadingIcon="file-document-edit-outline" onPress={handleEditCategory} title="Chỉnh sửa chủ đề" />
            : null
        }
        <Menu.Item titleStyle={{ fontSize: 18 }} leadingIcon="eye-off-outline" onPress={handleHideCategory} title="Xóa chủ đề" />
        <Menu.Item titleStyle={{ fontSize: 18 }} leadingIcon="book-check" onPress={() => { }} title="Đánh dấu đã học" />
        <Menu.Item titleStyle={{ color: 'red', fontSize: 18 }} leadingIcon="archive-cancel" onPress={handleCancel} title="Hủy bỏ" />
      </Modal>

    </Container>
  );
};

export default AddCategory;
