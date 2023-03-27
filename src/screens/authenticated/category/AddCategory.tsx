import React from 'react';
import { Container } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { sizeHeight } from 'utils/Utils';
import { View, FlatList } from 'react-native';
import RecordingAPI, { AuthApis } from 'network/subs/auth/recording/RecordingAPI';
import { AddCategoryForUser, DeleteCategory, GetFullCategory, UpdateCategory } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';
import colors from 'res/colors';
import { RefreshControl } from 'react-native-gesture-handler';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { useToast } from 'hooks/useToast';
import * as ImagePicker from 'react-native-image-picker';
import { ApiConstants } from 'network/ApiConstants';
import { CAMERA_OPTION, IMAGE_LIBRARY_OPTION } from './constant';
import { requestCameraPermission } from './Permission';
import AddEditModal from '../../../components/modal/AddEditModal';
import BigCardWithShield from '../../../components/cards/BigCardWithShield';
import ChoiceTab from './component/ChoiceTab';
import AddButton from 'components/button/AddButton';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { url } from 'inspector';
import { json } from 'stream/consumers';

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
  const [dataImage, setDataImage] = React.useState()

  const chooseImage = async () => {
    ImagePicker.launchImageLibrary(IMAGE_LIBRARY_OPTION, (response?: any) => {

      if (response.didCancel) {
        console.log('CANCEL')
      }
      else {
        if (!response.errorMessage) {
          // setImage(response?.assets?.[0]?.uri)
          setCameraOptionsVisble(!cameraOptionsVisble)
          setDataImage(response?.assets?.[0])
          // console.log(response)
        }
        else {
          console.log("that bai")
        }
      }

    });
  };
  const [base64, setBase64] = React.useState()

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
            console.log(response?.assets[0])

          }

        })
        .catch(error => {

          showToast("Error", 'warning')
        })
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

    }
  }
  const handleHideCategory = () => {
    let maps = data.filter(item => item?.isActive === false)
    let map = maps.map((item) => {
      // setStatusCategory(item)
      deleteCategory(item?.id)
    })
    getCategory()

  }
  const handleCancel = () => {
    setVisible(!visible)
  }
  const [editPopupVisivle, setEditPopupVisivle] = React.useState(false)
  const [personData, setPersonData] = React.useState([])

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
            setValue(item?.name)
            textInputRef.current = item?.name

          }
        }
      })
    }
    else {
      showToast("Chỉ được chọn 1 mục để sửa", "warning")
    }

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
    //  console.log(special)
    let url = AuthApis.UpdateCategory+`?categoryId=${item?.id}&name=${name}&desscription=edit`

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
        getCategory()
        setDataImage('')
        setRandom(Math.random())
      }
      else {
        showToast("ERROR", 'warning')
      }
    })
    .catch(err => {console.log(err)})
   
  }

  const handleDoneEdit = () => {
    updateCategory(personData)
  }

  const handleDoneAddCategory = async () => {
    // console.log(textInputRef.current)
    let name = encodeURIComponent(textInputRef.current)
    const imageData = new FormData()
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

    let url = ApiConstants.HOST + 'ext/category/user' + `?name=${name}`
    // console.log('====================================');
    // console.log(imageData);
    // console.log('====================================');
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
          getCategory()
          textInputRef.current = null

        }
        else {
          console.log(res)
          showToast("ERROR", 'danger')

        }

      })
      .catch(err =>{


        showToast("ERROR", 'danger')
        console.log(err)

      })

    // const response = await RecordingAPI.AddCategoryForUser<AddCategoryForUser>({
    //   name: name,
    //   description: 'Add',
    //   // data: imageData,
    //   data: imageData,

    //   isActive: true,

    // })
    // if (response.status === 200) {
    //   showToast("Thêm thành công", 'success')
    //   setConfigModalvisible(!configModalvisible)
    //   setDataImage('')
    //   getCategory()
    //   textInputRef.current = null

    // }
    // else {
    //   showToast("Từ không hợp lệ", 'danger')

    // }

    // console.log(imageData)
    // let url = ApiConstants.HOST + 'ext/category/user' + `?name=${name}&desscription=add`
    // RNFetchBlob.fetch(
    //   "POST",
    //   url,
    //   {

    //     Authorization: store.getState().authReducer.user.accessToken,
    //     "Accept": "application/json",
    //     "Content-Type": "multipart/form-data"

    //   },
    //   [

    //     {
    //       name: dataImage?.fileName,
    //       fileName: 'image',
    //       type: dataImage?.type,
    //       data: RNFetchBlob.wrap(dataImage?.uri)
    //     },
    //     // {
    //     //   name: dataImage?.fileName,
    //     //   fileName: 'image',
    //     //   type: dataImage?.type,
    //     //   data: dataImage?.base64
    //     // }
    //   ]
    // ).then(res => console.log(res))

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
      {/* Nút thêm chủ đề */}
      <AddButton
        onpress={handleAddCategory}
        text={"Thêm chủ đề"}
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
          contentContainerStyle={{ paddingBottom: '5%' }}
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
              type={item?.type}
              title={item?.name}
              isClicked={item?.isActive}
              source={item?.pictureFileId !== null ? {
                uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&${random}`,
                method: 'GET',
                headers: { Authorization: store.getState().authReducer.user.accessToken }
              } :
                require('../../.././assets/images/no.png')
              }
            />
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
        source={dataImage ? { uri: dataImage?.uri }
          : {
            uri: ApiConstants.HOST + `ext/files/download?id=${personData?.pictureFileId}&file-size=ORIGINAL&${random}`,
            method: 'GET',

            headers: { Authorization: store.getState().authReducer.user.accessToken }
          }
        }
        slogan={"Tên chủ đề:"}

        cancel={() => { setEditPopupVisivle(!editPopupVisivle); setValue(''); setDataImage('') }}
        takePhoto={takePhoto}
        chooseImage={chooseImage}
        defaultValue={value}
        onChangeText={(e) => handleType(e)}
        cameraOptionsVisble={cameraOptionsVisble}
        handleChoiceCamera={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        cancelModalCamera={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        onModalCameraDismiss={() => setCameraOptionsVisble(!cameraOptionsVisble)}
      />
      {/* màn hình thêm chủ đề */}
      <AddEditModal title={'Thêm chủ đề'}
        visible={configModalvisible}
        source={dataImage ? { uri: dataImage?.uri }
          : null
        }
        slogan={"Tên chủ đề:"}

        onDismiss={() => setConfigModalvisible(!configModalvisible)}
        handleSubmit={handleDoneAddCategory}
        cancel={() => { setConfigModalvisible(!configModalvisible); setValue(''); setDataImage('') }}
        takePhoto={takePhoto}
        chooseImage={chooseImage}
        defaultValue={value}
        onChangeText={(e) => handleType(e)}
        cameraOptionsVisble={cameraOptionsVisble}
        handleChoiceCamera={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        cancelModalCamera={() => setCameraOptionsVisble(!cameraOptionsVisble)}
        onModalCameraDismiss={() => setCameraOptionsVisble(!cameraOptionsVisble)}
      />
      {/* Choice Tab */}
      <ChoiceTab
        visible={visible}
        onDismiss={() => {
          setVisible(false)
        }}
        editCategory={handleEditCategory}
        deleteCategory={handleHideCategory}
        cancel={handleCancel}
      />
    </Container>
  );
};

export default AddCategory;
