import React from 'react';
import { Container, Header, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens, MainScreens } from 'routers/ScreenNames';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { fontSize, getExtention, getMime, sizeHeight, sizeWidth } from 'utils/Utils';
import { Button, FlatList, Image, ScrollView, View, ActivityIndicator, ImageBackground } from 'react-native';
import images from 'res/images';
import NavigationService from 'routers/NavigationService';
import styles from '../home/styles';
import { Modal } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import { RefreshControl, TextInput } from 'react-native-gesture-handler';
import strings from 'res/strings';
import get from 'network/subs/auth/AuthApi';
import RecordingAPI, { AuthApis } from 'network/subs/auth/recording/RecordingAPI';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';
import SoundPlayer from 'react-native-sound-player';
import Swiper from 'react-native-swiper';
import { Text } from 'react-native';
import colors from 'res/colors';
import { GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { delay } from '@reduxjs/toolkit/dist/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setStorage } from 'redux/storageWord/action';
import RNFetchBlob from 'rn-fetch-blob';

const RecordingScreen = ({ route }: any) => {
    const MAX_IMAGE_WIDTH = 480;
    const MAX_IMAGE_HEIGHT = 480;
    const IMAGE_QUALITY = 60;
    const cancel = require('.././../../../src/assets/images/goback.png')
    const [image, setImage] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [data, setData] = React.useState<any>([])
    const [animal, setAnimal] = React.useState([])
    const [imgBase64, setImgBase64] = React.useState()
    const [item, setItem] = React.useState()
    const IMAGE_LIBRARY_OPTION: any = {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true
    };


    


    const CAMERA_OPTION: ImagePicker.CameraOptions = {
        mediaType: 'photo',
        cameraType: 'front',
        includeBase64: true,
        quality: 0.7,
        width: 500,
        height: 500,
    };

    const chooseImage = async () => {
        ImagePicker.launchImageLibrary(IMAGE_LIBRARY_OPTION, (response?: any) => {
            if (!response.errorMessage) {
                const fileExtension = getExtention(response.assets?.[0]?.fileName);
                console.log(response?.assets?.[0]?.fileName)
                setImage(response?.assets?.[0]?.base64)
                setShow(true)
            }
            else {
                console.log("that bai")
            }
        });
    };

    // const  playSong =()=> {
    //     try {
    //       SoundPlayer.playSoundFile('engagementParty', 'm4a')
    //     } catch (e) {
    //       console.log('cannot play the song file', e)
    //     }
    //   }

    React.useEffect(() => {
        loadData();

        // loadImage();
    }, [])

    const handle = () => {
        setShow(!show)
        setVisible(!visible)
    }
    const dispatch = useDispatch()
    const loadData = async () => {
        const response: any = await RecordingAPI.GetWordByCateID<GetWordByCateID>({
            pageIndex: 1,
            pageSize: 20,
            word: '',
            categoryId: route?.params?.data?.id,
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
//    const [isExist, setisExist] = useState(false)
    const playSound = async (audioWord: any) => {
        let filePath = '';
        let url = AuthApis.GetVoice + encodeURIComponent(audioWord);
        
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'mp3',
        })
            .fetch("GET", url, {
                Authorization: store.getState().authReducer.user.accessToken,
                'Accept': '*/*',
                'Content-Type': 'application/octet-stream'
            })
                .then((res) => {
                    // console.log(res);
                    // console.log("The file saved to ", res.path())
                    console.log(res.respInfo)
                        console.log("The file saved to ", res.path());
                        filePath = res.path(); 
                        RNFetchBlob.fs.exists(filePath).then((exists)=>{
                            SoundPlayer.playUrl('file://' + filePath)
                        })
                        .finally(() => {
        
                            RNFetchBlob.fs.unlink('file://' + filePath)
        
                        })

                })
               
                
        
             
      

            // if(isExist)
            // {
            //     RNFetchBlob.fs.unlink('file'+filePath).then((res)=>{
            //         console.log('tets '+ res)
            //     })
            //     setisExist(!isExist)
                    
            // }
           

    }

    // const loadImage = async () => {
    //     const response = await RecordingAPI.GetImageByID<any>({ id: 4 })
    //     if (response.status === ResponseCode.SUCCESS) {
    //         setImgBase64(response.data);
    //         console.log()
    //     }
    //     else {
    //         console.log('that bai')
    //     }
    // }

    const takePhoto = async () => {
        ImagePicker.launchCamera(CAMERA_OPTION, (response) => {
            if (!response.errorMessage) {

            }
            else {
                console.log("that bai")
            }

        });
    };

    const addNewRecording = () => {
        let temp = data;
        temp.splice(data.length - 1, 0, {
            name: content,
            test: image
        })
        setData(temp)
        setContent(""),
            setShow(false)
        setVisible(false)

    }


    const [visible, setVisible] = React.useState(false)
    const addImage = (item: any, index) => {
        setItem(item)
        setVisible(true)
        setIndex(index)
    }
    const [index, setIndex] = React.useState(0)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          loadData();

        }, 2000);
      }, []);
    
    return (

        <Container style={{ flex: 1, backgroundColor: 'white'}}  >
            <HeaderWithBack 
                title={route?.params?.data?.name} 
                outerStyle={{backgroundColor:colors.title_blue}} 
                rightIconShow={false} />
         
                <View style={{width:sizeWidth(90), height:sizeHeight(90), alignSelf:'center', paddingTop: 15,}}>
                    <FlatList
                        data={data}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[colors.blue]}
                             />}
                        renderItem={({ item, index }) => (
                        
                            <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => { addImage(item, index) }}>
                                <View 
                                    style={{ 
                                        width: sizeWidth(38), 
                                        marginVertical:15, 
                                        height:sizeHeight(23),
                                        borderRadius:10,
                                        marginHorizontal:15, 
                                        
                                        marginTop: 10,                 
                                        backgroundColor:'#99C8E4',
                                        alignItems: 'center'
                                    }}>
                                    <Image 
                                        style={{
                                            resizeMode: 'stretch',
                                            height: sizeHeight(16), width: sizeWidth(36),
                                            borderRadius: sizeWidth(3),
                                            justifyContent: 'center'
                                        }}
                                        source={{
                                        uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                                        method: 'GET',
                                        headers: {Authorization: store.getState().authReducer.user.accessToken}
                                        }}
                                    />
                                    <Text style={{ marginTop: 10, fontSize: fontSize(6), alignSelf: 'center', fontWeight:'bold', color:'#2D5672'}}>{item.word}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
{/* Màn hình số  */}
                <Modal
                    visible={visible}
                    style={{
                        backgroundColor: '#FFD19A',
                        borderRadius: 15,
                        height: 450,
                        marginTop: sizeHeight(15),
                        width:'90%',
                        marginHorizontal:20
                    }}
                    onDismiss={() => {
                        setShow(false)
                        setVisible(false)
                    }}
                >            
                    <View style={{
                        top: 0,
                        alignItems: 'center',
                        width:"100%",
                        height:"100%", 
                        borderRadius: 15              
                    }}>
                        
                        <View style={{ height:'100%'}}>
                           
                        <Swiper showsButtons={false} index={index}>
                            {
                                data.map((item, index) => (
                                    <View key={index} >
                                        <View
                                            style={{
                                                width: '93%',
                                                marginBottom: 20,
                                                paddingHorizontal: 10,
                                                paddingTop: 6,
                                                height: '15%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignSelf: 'center'
                                            }}>
                                            <TouchableOpacity onPress={handle}  >
                                                <Image resizeMode='contain' source={cancel} style={{ width: sizeWidth(5), height: sizeHeight(5) }} />
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 30, flexDirection: 'row', color: colors.white, justifyContent: 'center', paddingTop: 3 }}>{item?.word}</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => playSound(item?.audioWord)} activeOpacity={0.7}>
                                                <Image style={{
                                                    resizeMode: 'contain',
                                                    height: sizeHeight(60), width: sizeWidth(60),
                                                    alignSelf: 'center',
                                                    borderRadius: sizeWidth(14),
                                                    maxHeight: 300,
                                                    paddingBottom: 30,
                                                }}
                                                    source={{
                                                        uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                                                        method: 'GET',
                                                        headers: {
                                                            Authorization: store.getState().authReducer.user.accessToken
                                                        }
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            }
                        </Swiper>
                    </View>
                </View>
            </Modal>

        </Container>
    );
};

export default RecordingScreen;


