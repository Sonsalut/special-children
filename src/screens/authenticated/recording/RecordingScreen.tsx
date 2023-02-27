import React from 'react';
import { Container, Header, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens, MainScreens } from 'routers/ScreenNames';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { fontSize, getExtention, getMime, sizeHeight, sizeWidth } from 'utils/Utils';
import { Button, FlatList, Image, ScrollView, View, ActivityIndicator } from 'react-native';
import images from 'res/images';
import NavigationService from 'routers/NavigationService';
import styles from '../home/styles';
import { Modal } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import { TextInput } from 'react-native-gesture-handler';
import strings from 'res/strings';
// import SoundPlayer from 'react-native-sound-player';
import get from 'network/subs/auth/AuthApi';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
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
const RecordingScreen = ({ route }: any) => {
    const MAX_IMAGE_WIDTH = 480;
    const MAX_IMAGE_HEIGHT = 480;
    const IMAGE_QUALITY = 60;
    const cancel= require('.././../../../src/assets/images/cancel.png')
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

const handle=()=>{
    setShow(!show)
    setVisible(!visible)
}
const dispatch= useDispatch()
    const loadData = async () => {
        const response: any = await RecordingAPI.GetWordByCateID< GetWordByCateID>({
            pageIndex: 1,
            pageSize: 20,
            word: '',
            categoryId: route?.params?.data?.id,
            isActive:true
        });
        if (response.status === ResponseCode.SUCCESS) {
          
            console.log(response.data)
            setData(response.data?.words)
            // dispatch(setStorage(response.data?.words))
            

        }
        else {
            console.log('that bai')
        }
    }
   
 
    const playSound = async (audioWord: any) => {
     
        
        try {
          SoundPlayer.loadUrl(`https://ais-schildren-test-api.aisolutions.com.vn/ext/files/audio-stream/by-word?words=${audioWord}`)
          SoundPlayer.play()

           
        } catch (e) {
            //showToast
            console.log(`cannot play the sound file`, e)
            
        }
        // SoundPlayer.addEventListener('FinishedLoadingURL',({ success })=>(
        //     // SoundPlayer.playUrl(`https://ais-schildren-test-api.aisolutions.com.vn/ext/files/audio-stream/by-word?words=${audioWord}`)
        //         console.log( success)
        // ))
    
         
          
        
    }



    const loadImage = async () => {
        const response = await RecordingAPI.GetImageByID<any>({ id: 4 })
        if (response.status === ResponseCode.SUCCESS) {
            setImgBase64(response.data);
            console.log()
        }
        else {
            console.log('that bai')
        }
    }

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
    const addImgae = (item: any, index) => {
        setItem(item)
        setVisible(true)
        setIndex(index)
    }

const [index, setIndex] = React.useState(0)


    return (


        <Container style={{ flex: 1 }}  >
            <HeaderWithBack title={route?.params?.data?.name} rightIconShow={false} />
           <View style={{width:sizeWidth(90), height:sizeHeight(90), alignSelf:'center'}}>

          
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                numColumns={2}
                renderItem={({ item, index }) => (
                  
                    <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => { addImgae(item, index) }}>
                        <View style={{ flexDirection: 'column' ,borderWidth:1, width:sizeWidth(40), height:sizeHeight(26) ,justifyContent:'center',paddingHorizontal:8,borderRadius:10, marginHorizontal:6, marginVertical:8}}>
                            <Image style={{
                                resizeMode:'stretch',
                                height: sizeHeight(21), width: sizeWidth(39),
                                alignSelf:'center',
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
                            <Text style={{ marginTop:8,fontSize: fontSize(5), alignSelf: 'center', fontWeight:'400', color:'black' }}>{item.word}</Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
             </View>
           {/* Màn hình số  */}
            <Modal
                visible={visible}
                style={{
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    height: '65%',
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
                   
                }}>
                    <View style={{ width:'92%', marginBottom:20, height:'8%', flexDirection:'row', justifyContent:'space-between'}}>
                        
                        <TouchableOpacity  onPress={handle}>
                            <Image resizeMode='contain' source={cancel} style={{width:sizeWidth(5), height:sizeHeight(5)}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height:'90%', bottom:22 }}>
                        {/* <TouchableOpacity onPress={() => playSound(item?.audioFileId)} activeOpacity={0.7}>
                            <Image style={{
                                resizeMode:'cover',
                                height: sizeHeight(30), width: sizeWidth(60),
                                borderRadius: sizeWidth(3)
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
                        <Text style={{ alignSelf: 'center', color: 'black', fontSize: fontSize(7), marginTop: sizeHeight(5), fontWeight: 'bold' }}>{item?.word}</Text> */}
                   
                   <Swiper showsButtons={false} index={index}>
                          {

                            data.map((item, index)=>(
                                 <View key={index} > 
                                 
                                 <Text style={{fontSize:30, alignSelf:'center', color:colors.black}}>{item?.word}</Text>
                                 <View>
                                    <TouchableOpacity onPress={() => playSound(item?.audioWord)} activeOpacity={0.7}>
                                    <Image style={{
                                resizeMode:'contain',
                                height: sizeHeight(50), width: sizeWidth(80),
                                borderRadius: sizeWidth(3),
                                marginHorizontal:20,
                              
                                
        
                
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


