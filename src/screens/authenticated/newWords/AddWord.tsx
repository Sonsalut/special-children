import React from 'react';
import { Container, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { Text,View, Image, ScrollView, KeyboardAvoidingView,FlatList, PermissionsAndroid, TextInput, ImageBackground} from 'react-native';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useToast } from 'hooks/useToast';
import { ApiConstants } from 'network/ApiConstants';




const AddWord = ({}: StackNavigationProps<
    Routes, AuthenticatedScreens.AddWord
>) => {
    const [data, setData] = React.useState([])
    const [datas, setDatas] = React.useState([])
    const [image, setImage] = React.useState("");
  const [random, setRandom] = React.useState(Math.random()) 
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
      id:item?.id

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
      const granted = await request(PERMISSIONS.IOS.CAMERA);
      console.log('granted',granted);
      
      if (granted === 'granted') {
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
   
    // setRandom(Math.random())
    let maps = data.map((item) => {
      if (item?.isActive === false) {
        // setPersonData(item)
        // setValue(item?.word)
        if (item?.type==="ADMIN") {
          showToast("Bạn không thể chỉnh sửa mục này",'warning')
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
      special= true
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
    else
    {
      console.log(response)
    }
  }
  //block sửa từ end
  const textInputRef = React.useRef(null);
  const handleType = (e) => {
    textInputRef.current = e

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
    }
    const handleDoneEdit = ()=>{
      updateWord(personData)
    }
    const handleDoneAdd =async  () => {
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
        word:encodeURIComponent(textInputRef.current),
        wordAudio:encodeURIComponent(textInputRef.current),
        data:imageData
      })
      if(response.status===200)
      {
        showToast("Thêm thành công", 'success')
      setConfigModalvisible(!configModalvisible)
      setImage("")
      loadData()
      }
    }

    const AddEditModal = (props) => {
      return (
        <Modal
          visible={props.visible}
          style={{
            backgroundColor: '#E7F6FF',
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
                    style={{ 
                      height: sizeHeight(7), 
                      width: '100%', 
                      borderRadius: 5, 
                      borderWidth: 1, 
                      borderColor:'#60A2C8', 
                      marginTop:10
                    }}
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
    <Container style={{backgroundColor: 'white'}}>
      <HeaderWithBack
        title={'Từ vựng'}
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
              <View>
                <View 
                  style={{
                    marginHorizontal: -10,
                    width: '100%',
                    height: sizeHeight(4),
                    alignSelf: 'flex-end',
                    paddingRight: 5,
                  }}
                >
                  {
                    item?.type === 'ADMIN'
                      ? <Icon
                        name='shield-sharp'
                        size={sizeHeight(3), sizeWidth(6)}
                        style={{alignSelf: 'flex-end', color: 'orange'}} />
                      : null
                  }
                </View>
              
              <Image
                style={{
                  height: sizeHeight(18),
                  width: sizeWidth(32),
                  resizeMode: 'contain',
                  borderRadius: sizeWidth(3),
                  alignSelf: 'center',
                  marginTop: -20,
                  padding: 15,
                }}
                source={{
                  uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&${random}`,
                  method: 'GET',
                  headers: { Authorization: store.getState().authReducer.user.accessToken }
                }}
              />
              
              <Text style={{ fontSize: fontSize(5), alignSelf: 'center', fontWeight: 'bold', color: '#2D5672' }}>{item?.word}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
        </View>
        

      {/* Choice tab */}
       <Modal
        visible={visible}
        style={{
          backgroundColor: '#E7F6FF',
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
            uri: ApiConstants.HOST + `ext/files/download?id=${personData?.pictureFileId}&file-size=ORIGINAL`,
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
        handleSubmit={handleDoneAdd}
        onDismiss={() => setConfigModalvisible(!configModalvisible)}
        cancel={() => { setConfigModalvisible(!configModalvisible); setValue('') ;setImage('') }} />
    </Container>
  )
};
export default AddWord