import React from 'react';
import { Container, Header, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens, AuthenticationScreens, MainScreens } from 'routers/ScreenNames';
import NavigationService from 'routers/NavigationService';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { Text,View, Image, ImageBackground, ScrollView, KeyboardAvoidingView,FlatList, Animated, TouchableHighlightComponent, TouchableWithoutFeedback, PermissionsAndroid, TextInput} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import images from 'res/images';
import AuthenticationApi from 'network/subs/auth/AuthApi';
import { CategoryList } from 'network/subs/auth/AuthResponse';
import AuthApi from 'network/subs/auth/AuthApi';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetFullCategory, GetWordByCateID, UpdateWord, WordStatus } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';
import colors from 'res/colors';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { RefreshControl } from 'react-native-gesture-handler';
import Spinner from 'react-native-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Modal, Searchbar, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { showIcon } from 'redux/storageWord/action';
import GlobalHeader from 'components/header/GlobalHeader';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import { Permissions } from 'react-native-permissions';
import { useToast } from 'hooks/useToast';



const AddWord = ({}: StackNavigationProps<
    Routes, AuthenticatedScreens.AddWord
>) => {
    const [data, setData] = React.useState([])
    const [datas, setDatas] = React.useState([])
    const [image, setImage] = React.useState("");
  
  const [cameraOptionsVisble, setCameraOptionsVisble] = React.useState(false)
  const [itemData, setItemData] = React.useState(new FormData())

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
          setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
        }
        else {
          console.log("that bai")
        }
      }

    });
  };

  const setStatusWord = async (item) => {
    const response = await RecordingAPI.SetStatusWord<WordStatus>({
      wordId: item?.id,
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
  const handleHideWord = () => {
    let maps = data.filter(item => item?.isActive === false)
    let map = maps.map((item) => {
      setStatusWord(item)
    })
  }


//Camera permission 
  const requestCameraPermission = async () => {

    if (Platform.OS === 'android') {

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
    } 
    else if (Platform.OS === 'ios') {
      const granted = await Permissions.request('camera');
      if (granted === 'authorized') {
        console.log ('Camera permission given');
        return true;
      } 
      else {
        console.log ('Camera permission denied');
        return false;
      }
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
  const handleUpImage = () => {
    setCameraOptionsVisble(!cameraOptionsVisble)
  }
  const id= useSelector(store=>store.storeReducer.categoryId)
  const loadData = async () => {
    const response: any = await RecordingAPI.GetWordByCateID<GetWordByCateID>({
        pageIndex: 1,
        pageSize: 20,
        word: '',
        categoryId: id,
        isActive: true
    });
    if (response.status === ResponseCode.SUCCESS) {

        // console.log(response.data)
        setData(response.data?.words)
        // dispatch(setStorage(response.data?.words))
    }
    else {
        console.log('that bai')
    }
}
  React.useEffect(() => {
        loadData()
        // console.log(id)

  }, [])
  
  const dispatch= useDispatch()
  const show = useSelector(store=>store.storeReducer.show)
  const handle=( )=>{
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
    setEditPopupVisivle(!editPopupVisivle)
    setVisible(!visible)
    let maps = data.map((item) => {
      if (item?.isActive === false) {
        setPersonData(item)
        setValue(item?.word)
      }
    })
  }

  // Pop up thêm hình ảnh cho từ mới
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
  const updateWord = async (item: any, data: FormData) => {
    let name = ''
    textInputRef.current
      ? name = encodeURIComponent(textInputRef.current)
      : name = encodeURIComponent(item?.word)
    console.log(item)
    const response = await RecordingAPI.UpdateWord<UpdateWord>({
      wordId: item?.id,
      categoryId: item?.category?.id,
      word: name,
      wordAudio: name,
      isActive: true,
      data: data
    })
    if (response.status === 200) {
      console.log(" Update SUCCESS")
      showToast("Thay đổi thành công", 'success')
      setEditPopupVisivle(!editPopupVisivle)
      // getCategory()
    }
    else
    {
      console.log(response.error)
    }
  }
  //block sửa từ end

  const textInputRef = React.useRef(null);
  const handleType = (e) => {
    textInputRef.current = e
    // console.log(textInputRef.current)
    // setValue(textInputRef.current)

  };
  const [searchValue, setSearchValue] = React.useState('')
  const filterData= ()=>(  
    data.filter(item=> encodeURIComponent(item?.audioWord.toLowerCase()).includes( encodeURIComponent(searchValue.toLowerCase()) ))    
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
    const handleOnclick=(item)=>{
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
          // console.log(showDoneIcon)
          // setShowDoneIcon(!showDoneIcon)
    }
    const handleDoneEdit = ()=>{
      if(textInputRef.current)
      {
        console.log(textInputRef.current)
        // console.log(image)
      
      }
      updateWord(personData, itemData)
  
       console.log(itemData)
    }
    const AddEditModal = (props) => {
      return (
        <Modal
          visible={props.visible}
          style={{
            backgroundColor: '#C1EBEA',
            borderRadius: 15,
            height: '70%',
            marginTop: sizeHeight(20),
            width: '90%',
            marginHorizontal: 20, 
          }}
          onDismiss={props.onDismiss}
        >
          <ScrollView style={{  height: '100%' }}>
            <KeyboardAvoidingView
              behavior='position'
              keyboardVerticalOffset={82}
              style={{ width: '100%', height: '100%' }}>
              {/* title */}
              <View 
                style={{ 
                  width: '90%', 
                  height: sizeHeight(8), 
                  alignSelf: 'center', 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <TouchableOpacity onPress={props.cancel}>
                  <Text style={{ fontSize: 15, color: 'red' }}>Hủy bỏ</Text>
                </TouchableOpacity>
                
                <Text
                  style={{ 
                    fontSize: 20, 
                    color: '#2D5672', 
                    fontWeight: "400", 
                    paddingRight: 20 
                  }}
                >{props.title}
                </Text>
                <TouchableOpacity 
                  isDoubleTap={true} 
                  onPress={props.handleSubmit}>
                  <Icon 
                    name="checkmark-outline" 
                    size={sizeHeight(3)}
                  />
                </TouchableOpacity>
              </View>

              {/* content */}
              <View 
                style={{ 
                  width: '90%', 
                  justifyContent: 'space-around', 
                  height: sizeHeight(63), 
                  alignSelf: 'center', 
                  paddingBottom:15, 
                  bottom:15,                 
                }}
              >
                <TouchableOpacity onPress={handleUpImage}>
                  <View 
                    style={{ 
                      borderWidth:1,
                      borderColor:'#60A2C8',
                      width: '90%',
                      borderRadius:5,
                      alignSelf: 'center', 
                      alignItems: 'center',
                      height: sizeHeight(32), 
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: 'stretch',
                        height: '85%',
                        width: '100%',
                        marginTop: '1%',
                        borderRadius: sizeWidth(3),
                      }}
                      source={props.source}
                    />
                  </View>
                </TouchableOpacity>
                <View 
                  style={{ 
                    width: '90%', 
                    alignSelf: 'center', 
                    height: sizeHeight(10) 
                  }}
                >
                  <Text style={{fontSize:15, color:'#2D5672'}}>Nội dung từ: </Text>
                  <TextInput
                    style={{ height: sizeHeight(7), width: '100%', borderRadius: 5, borderWidth: 1, borderColor:'#60A2C8', marginTop:10}}
                    defaultValue={value}
                    onChangeText={(e)=>handleType(e)}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <ModalCamera/>
        </Modal>
      )
    }
  return (
    <Container>
      <HeaderWithBack
        title={'Thêm từ'}
        titleStyle={{
          color: colors.header_title,
          marginLeft: '7%'
        }}
        outerStyle={{ backgroundColor: colors.title_blue }}
        rightIconShow={true}
        hasDone={showDoneIcon}
        handle={handle}
      />
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
        onPress={handleAddWord}
        isDoubleTap={true}
      >
        <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15, fontWeight: 'bold', color: '#2D5672' }}>Thêm từ</Text>
      </TouchableOpacity>
      <View 
        style={{ 
          height: sizeHeight(85), 
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
                height: sizeHeight(25),
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
              <Image
                style={{
                  resizeMode: 'stretch',
                  height: '80%',
                  width: '100%',
                  marginTop: '1%',
                  borderRadius: sizeWidth(3),
                }}
                source={{
                  uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                  method: 'GET',
                  headers: { Authorization: store.getState().authReducer.user.accessToken }
                }}
              />
              <Text style={{ fontSize: fontSize(5), alignSelf: 'center', fontWeight: 'bold', color: '#2D5672' }}>{item?.word}</Text>
            </TouchableOpacity>
          )}
        />
        </View>
        

      {/* Choice table */}
       <Modal
        visible={visible}
        style={{
          backgroundColor: '#ADDDDC',
          borderRadius: 15,
          height: 250,
          marginTop: sizeHeight(42),
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
            ? <Menu.Item 
              titleStyle={{ 
                fontSize: 18, 
                color: '#2D5672'  }} 
              leadingIcon="file-document-edit-outline" 
              onPress={handleEditCategory} 
              title="Chỉnh sửa từ" />

            : null
        }
        <Menu.Item 
          titleStyle={{ fontSize: 18, color: '#2D5672'  }} 
          leadingIcon="eye-off-outline" 
          onPress={handleHideWord} 
          title="Xóa từ" />
        <Menu.Item 
          titleStyle={{ fontSize: 18, color: '#2D5672' }} 
          leadingIcon="book-check" 
          onPress={() => { }} 
          title="Đánh dấu đã học" />
        <Menu.Item 
          titleStyle={{ color: 'red', fontSize: 18 }} 
          leadingIcon="archive-cancel" 
          onPress={handleCancel} 
          title="Hủy bỏ" />
      </Modal>

      {/* Popup Edit từ */}

      <AddEditModal title={"Chỉnh sửa từ"}
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
        cancel={() => { setEditPopupVisivle(!editPopupVisivle); setValue('') ; setImage('') }}
        cateName={personData?.name}
      />
      
      {/* Pop up thêm từ */}
      <AddEditModal 
        title={'Thêm từ'}
        visible={configModalvisible}
        source={image ? { uri: image }: null}
        onDismiss={() => setConfigModalvisible(!configModalvisible)}
        cancel={() => { setConfigModalvisible(!configModalvisible); setValue('') ;setImage('') }} />
    </Container>
  )
};
export default AddWord