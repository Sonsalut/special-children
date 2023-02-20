import React from 'react';
import { Container, Header, Text, TouchableOpacity } from 'components';
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

const RecordingScreen = ({ route }: any) => {
    const MAX_IMAGE_WIDTH = 480;
    const MAX_IMAGE_HEIGHT = 480;
    const IMAGE_QUALITY = 60;
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
        loadImage();
    }, [])


    const loadData = async () => {
        const response: any = await RecordingAPI.GetWordByCateID<RecordingResponse>({
            pageIndex: 1,
            pageSize: 20,
            word: '',
            categoryId: route?.params?.title === 'number' ? 3 : 2
        });
        if (response.status === ResponseCode.SUCCESS) {
            if (route?.params?.title === 'number') {
                setData(response.data?.words)
            }
            else {
                setAnimal(response.data?.words)
            }

        }
        else {
            console.log('that bai')
        }
    }

    const playSound = (id: any) => {
        try {
            // or play from url
            SoundPlayer.playUrl(`https://ais-schildren-test-api.aisolutions.com.vn/ext/files/audio-stream/${id}`)
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }

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
    const addImgae = (item: any) => {
        setItem(item)
        setVisible(true)
    }



    return (
        <Container >
            <HeaderWithBack title={route?.params?.title === 'number' ? 'Chữ số' : 'Con vật'} />
            <FlatList
                data={route?.params?.title === 'number' ? data : animal}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={{ alignItems: 'flex-start' }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { addImgae(item) }}>
                                <View style={{
                                    backgroundColor: item?.name === 'add' ? '#9BA8B5' : '#8ab643',
                                    borderRadius: sizeWidth(3), justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image style={{
                                        height: sizeHeight(12), width: sizeWidth(28),
                                        borderRadius: sizeWidth(3)
                                    }}
                                        source={{
                                            uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFieldId}&file-size=small`,
                                            method: 'GET',
                                            headers: {
                                                Authorization: store.getState().authReducer.user.accessToken
                                            }
                                        }}

                                    />
                                    {item?.name !== 'add' && <Text style={{ color: 'white', fontWeight: '600', marginTop: sizeHeight(0.3), marginBottom: 5 }}
                                    >{item?.word}</Text>}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <Modal
                visible={visible}
                style={{
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    height: '50%',
                    marginTop: sizeHeight(20)
                }}
                onDismiss={() => {
                    setShow(false)
                    setVisible(false)
                }}

            >
                <View style={{
                    top: 0,
                    alignItems: 'center'
                }}>
                    <View>
                        <TouchableOpacity onPress={() => { playSound(item?.audioFieldId) }} activeOpacity={0.7}>
                            <Image style={{
                                height: sizeHeight(30), width: sizeWidth(60),
                                borderRadius: sizeWidth(3)
                            }}
                                source={{
                                    uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFieldId}&file-size=small`,
                                    method: 'GET',
                                    headers: {
                                        Authorization: store.getState().authReducer.user.accessToken
                                    }
                                }}

                            />
                        </TouchableOpacity>
                        <Text style={{alignSelf:'center', color:'black',fontSize:fontSize(7),marginTop : sizeHeight(5),fontWeight:'bold'}}>{item?.word}</Text>
                    </View>



                </View>
            </Modal>
        </Container>
    );
};

export default RecordingScreen;

