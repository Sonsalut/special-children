import React from 'react';
import { Container, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { Text, View, Image, ScrollView, KeyboardAvoidingView, FlatList, TextInput, PermissionsAndroid, ImageBackground } from 'react-native';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { AddCategoryForUser, CategoryStatus, DeleteCategory, GetFullCategory, UpdateCategory } from 'network/subs/auth/recording/RecordingRequest';
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
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import axios from 'axios';
import ModalCamera from './component/ModalCamera';
import { CAMERA_OPTION, IMAGE_LIBRARY_OPTION } from './constant';
import { requestCameraPermission } from './Permission';


const AddCategory = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.AddCategory
>) => {

  const [image, setImage] = React.useState("");
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [random, setRandom] = React.useState(Math.random())
  const [cameraOptionsVisble, setCameraOptionsVisble] = React.useState(false)
  const textInputRef = React.useRef(null);
  React.useEffect(() => {
    getCategory()

  }, [])
  React.useEffect(() => {
    checkDone()
    checkCount()

  }, [data])

  const chooseImage = async () => {
    ImagePicker.launchImageLibrary(IMAGE_LIBRARY_OPTION, (response?: any) => {
          
      if (response.didCancel) {
        console.log('CANCEL')
      }
      else {
        if (!response.errorMessage) {        
          setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
        }
        else {
          console.log("that bai")
        }
      }

    });
  };

  const takePhoto = async () => {
    if (await requestCameraPermission()) {
      ImagePicker.launchCamera(CAMERA_OPTION, (response?: any) => {
        if (response.didCancel) {
          console.log('CANCEL')
        }
        else {
          if (!response.errorMessage) {
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
  const [showDoneIcon, setShowDoneIcon] = React.useState(false)


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
    // console.log(item)
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
  const showToast = useToast()
  const [configModalvisible, setConfigModalvisible] = React.useState(false)
  const handleAddCategory = () => {
    setConfigModalvisible(!configModalvisible)
  }

  const deleteCategory = async (id) => {
    const response = await RecordingAPI.DeleteCategory<DeleteCategory>({
      id: id
    })
    if (response?.data.data.length === 0) {
      showToast('Bạn không có quyền xóa', 'danger')

    }
    else {
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
    
      
    let maps = data.map((item) => {
      if (item?.isActive === false) {
        if (item?.type==="ADMIN") {
          showToast("Bạn không thể chỉnh sửa mục này",'warning')
        } else {
          setEditPopupVisivle(!editPopupVisivle)
          setVisible(!visible)
          setPersonData(item)
        setValue(item?.name)
        textInputRef.current = item?.name
          
        } 
      }
    })
  }
  const handleUpImage = () => {
    setCameraOptionsVisble(!cameraOptionsVisble)
  }
  
  const handleType = (e) => {
    textInputRef.current = e

  };

  const updateCategory = async (item: any) => {
    let name = ''
    let special = false
    textInputRef.current
      ? name = encodeURIComponent(textInputRef.current)
      : name = encodeURIComponent(item?.name)
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
    //  console.log(special)
    const response = await RecordingAPI.UpdateCategory<UpdateCategory>({
      id: item?.id,
      name: name,
      isActive: special,
      description: 'EDIT',
      data: imageData
    })
    if (response.status === 200) {
      console.log(" Update SUCCESS")
      showToast("Thay đổi thành công", 'success')
      setEditPopupVisivle(!editPopupVisivle)
      getCategory()
      setImage("")
      setRandom(Math.random())
    }
    else {
      // console.log(response)
      showToast("ERROR", 'warning')


    }
  }

  const handleDoneEdit = () => {
    updateCategory(personData)
  }

  const handleDoneAddCategory = async () => {
    console.log(textInputRef.current)
    let name = encodeURIComponent(textInputRef.current)
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
    const response = await RecordingAPI.AddCategoryForUser<AddCategoryForUser>({
      name: name,
      description: 'Add',
      data: imageData,
      isActive: true,

    })
    if (response.status === 200) {
      showToast("Thêm thành công", 'success')
      setConfigModalvisible(!configModalvisible)
      setImage("")
      getCategory()
      textInputRef.current=null

    }
    else {
      showToast("Từ không hợp lệ", 'danger')
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
              <Text style={{ fontSize: 20, color:'#2D5672', fontWeight: "400", paddingRight: 20 }}>{props.title}</Text>
              <TouchableOpacity isDoubleTap={true} onPress={props.handleSubmit}>
                <Icon name="checkmark-outline" size={sizeHeight(3)} />
              </TouchableOpacity>
            </View>
            {/* content */}
            <View style={{ width: '90%', justifyContent: 'space-around', height: sizeHeight(63), alignSelf: 'center', paddingBottom: 15, bottom: 15 }}>
              <TouchableOpacity onPress={handleUpImage}>
                <View 
                  style={{ 
                    borderWidth: 1, 
                    width: '90%', 
                    borderRadius: 5, 
                    alignSelf: 'center', 
                    alignItems: 'center', 
                    height: sizeHeight(32),
                    borderColor: '#60A2C8'
                  }}>
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
              <View 
                style={{ 
                  width: '90%', 
                  alignSelf: 'center', 
                  height: sizeHeight(10)}}>
                <Text 
                  style={{ fontSize: 15, color: '#2D5672' }}>Tên chủ đề: </Text>
                <TextInput
                  style={{ 
                    height: sizeHeight(7), 
                    width: '100%', borderRadius: 5, 
                    borderWidth: 1, 
                    borderColor:'#60A2C8' 
                  }}
                  defaultValue={value}
                  onChangeText={(e) => handleType(e)}
                  maxLength={14}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <ModalCamera
  visible={cameraOptionsVisble}
  onDismiss={() => {
    setCameraOptionsVisble(!cameraOptionsVisble)

  }}
 takePhoto={takePhoto}
 chooseImage={chooseImage}
 cancel={()=>setCameraOptionsVisble(!cameraOptionsVisble)}
 />
      </Modal>
    )
  }


  return (
    <Container style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWithBack 
        title={'Chủ đề'}
        titleStyle={{
          color: colors.header_title,
          marginLeft: '7%'
        }}
        outerStyle={{ backgroundColor: colors.title_blue }}
        rightIconShow={!showDoneIcon}
        hasDone={showDoneIcon}
        handle={handle} />

      <TouchableOpacity
        style={{
          marginLeft: 10,
          width: '50%',
          height: sizeWidth(10),
          borderRadius: 45,
          marginTop: 10,
          marginBottom:10,
          backgroundColor: '#FFD19A',
          alignSelf: 'center'
        }}
        onPress={handleAddCategory}
        isDoubleTap={true}
      >
        <Text style={{ alignSelf: 'center', paddingTop:10, fontSize: 15, fontWeight: 'bold', color: '#2D5672' }}>Thêm chủ đề</Text>
      </TouchableOpacity>
      <View 
        style={{ 
          height: sizeHeight(85), 
          width: '95%', 
          alignSelf: 'center', 
          alignItems: 'center' 
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
          renderItem={({ item, index }) => (

            <TouchableOpacity
              onPress={() => handleOnclick(item)}
              isDoubleTap={true}
              activeOpacity={0.7}
              style={{
                width: sizeWidth(41),
                height: sizeHeight(25),
                borderRadius: 10,
                marginHorizontal: 9,
                alignSelf: 'center',
                marginTop: 30,
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
                  source={item?.pictureFileId !== null ? {
                    uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&${random}`,
                    method: 'GET',

                    headers: { Authorization: store.getState().authReducer.user.accessToken }
                  } :
                    require('../../.././assets/images/no.png')
                  }/>
                
                <Text style={{ fontSize: fontSize(4.5), alignSelf: 'center', fontWeight: 'bold', color: '#2D5672', marginTop: '5%' }}>{item?.name}</Text>
              </View>

            </TouchableOpacity>
          )}

        />

      </View>
      {/* Popup Edit chủ đề */}

      <AddEditModal 
        title={"Chỉnh sửa chủ đề"}
        visible={editPopupVisivle}
        onDismiss={() => {
          setEditPopupVisivle(!editPopupVisivle)

        }}
        handleSubmit={handleDoneEdit}
        source={image ? { uri: image }
          : {
            uri: ApiConstants.HOST + `ext/files/download?id=${personData?.pictureFileId}&file-size=ORIGINAL&${random}`,
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
          backgroundColor: '#C1EBEA',
          borderRadius: 15,
          height: 250,
          marginTop: sizeHeight(42),
          // alignSelf:'flex-start',
          width: '90%',
          marginHorizontal: 20,
           
        }}
        onDismiss={() => {
          
          setVisible(false)
        }}
      >
        {
          count < 2
            ? <Menu.Item titleStyle={{ fontSize: 18, color:'#2D5672' }} leadingIcon="file-document-edit-outline" onPress={handleEditCategory} title="Chỉnh sửa chủ đề" />
            : null
        }
        <Menu.Item titleStyle={{ fontSize: 18, color:'#2D5672' }} leadingIcon="eye-off-outline" onPress={handleHideCategory} title="Xóa chủ đề" />
        <Menu.Item titleStyle={{ fontSize: 18, color:'#2D5672' }} leadingIcon="book-check" onPress={() => { showToast("Chưa hỗ trợ",'warning')}} title="Đánh dấu đã học" />
        <Menu.Item titleStyle={{ color: 'red', fontSize: 18 }} leadingIcon="archive-cancel" onPress={handleCancel} title="Hủy bỏ" />
      </Modal>

    </Container>
  );
};

export default AddCategory;
