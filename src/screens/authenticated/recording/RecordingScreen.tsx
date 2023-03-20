import React, { useState } from 'react';
import { Container, Header, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens, MainScreens } from 'routers/ScreenNames';
import { fontSize, getExtention, getMime, sizeHeight, sizeWidth } from 'utils/Utils';
import { Button, FlatList, Image, ScrollView, View, ActivityIndicator, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import images from 'res/images';
import NavigationService from 'routers/NavigationService';
import styles from '../home/styles';
import { Modal, Searchbar } from 'react-native-paper';
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
import { getCateId, setStorage, showIcon } from 'redux/storageWord/action';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContext, useIsFocused } from '@react-navigation/native';
import { useToast } from 'hooks/useToast';
import { ApiConstants } from 'network/ApiConstants';
import axios from 'axios';

const RecordingScreen = ({ route, navigation }: any) => {
  
    const cancel = require('.././../../../src/assets/images/goback.png')
    const [image, setImage] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [data, setData] = React.useState<any>([])

    React.useEffect(() => {
        navigation.setOptions({ headerTitle: `${route?.params?.data?.name}` })
        dispatch(getCateId(route?.params?.data?.id))
        loadData();

        // console.log(route?.params?.data?.name?.id)
    }, [])
    const isFocused = useIsFocused()
    React.useEffect(() => {
        loadData();
    }, [isFocused])

    const handle = () => {
        setShow(!show)
        setVisible(!visible)
    }
    const dispatch = useDispatch()
    const shows = useSelector(store => store.storeReducer.show)
    const handleShow = () => {
        dispatch(showIcon())
    }
    const handleCancel = () => {
        setShow(!show)
        setVisible(!visible)
    }
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
    const showToast = useToast()
    const playSound = async (audioWord: any) => {
        let filePath = '';
        let isFileSucceeded = false
        let url = AuthApis.GetVoice + encodeURIComponent(audioWord);
          axios.get(url, {
            headers:{
                "Authorization": store.getState().authReducer.user.accessToken,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
            

        }).then(response => {
            if(response.status===200)
            {
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
                RNFetchBlob.fs.exists(filePath).then((exists) => {
                    try {
                    SoundPlayer.playUrl('file://' + filePath)
                        
                    } catch (error) {
                        showToast("ERROR",'danger')
                    }
                })
                .finally(() => {
                RNFetchBlob.fs.unlink('file://' + filePath)
                })
            })
            }
           
        

        })
        .catch(err=>{
            showToast("Đang load", 'warning')
            console.log(err?.message)
        })
    }
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

    const [searchValue, setSearchValue] = React.useState('')
    const filterData = () => (
        data.filter(
            item => (
                encodeURIComponent(item?.audioWord.toLowerCase()).includes(encodeURIComponent(searchValue.toLowerCase()))
            )
        )
    )

    const [visible, setVisible] = React.useState(false)
    const chooseWord = (item: any, index) => {
        setItem(item)
        setVisible(true)
        setIndex(index)
        playSound(item?.audioWord)
    }
    const [index, setIndex] = React.useState(0)
    const [refreshing, setRefreshing] = React.useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            loadData();

        }, 2000);
    }, []);

    return (

        <Container isBottomTab={false} style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
            <TouchableWithoutFeedback
                onPress={() => console.log('Pressed')}
                onLongPress={handleShow}
            >
                <View style={{ height: sizeHeight(90), width: '95%', alignSelf: 'center', alignItems: 'center' }}>
                    {
                        shows ?
                            <Searchbar
                                style={{ height: 40, width: sizeWidth(80), borderWidth: 1, borderColor: 'gray', marginTop: 5 }}
                                placeholder="Tìm kiếm"
                                placeholderTextColor={'gray'}
                                value={searchValue}
                                onChangeText={(e) => setSearchValue(e)}
                                spellCheck={false}
                            />
                            : null
                    }
                    <View style={{ width: sizeWidth(90), height: sizeHeight(90), alignItems: 'center', alignSelf: 'center' }}>
                        <FlatList
                            data={filterData()}
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

                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    style={{
                                        width: sizeWidth(38),
                                        marginVertical: 15,
                                        height: sizeHeight(23),
                                        borderRadius: 10,
                                        marginHorizontal: 12,
                                        marginTop: 10,
                                        backgroundColor: '#C1EBEA',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => { chooseWord(item, index) }}>
                                    <Image
                                        style={{
                                            resizeMode: 'stretch',
                                            height: sizeHeight(16),
                                            width: sizeWidth(36),
                                            borderRadius: sizeWidth(3),
                                            justifyContent: 'center',
                                        }}
                                        source={{
                                            uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                                            method: 'GET',
                                            headers: { Authorization: store.getState().authReducer.user.accessToken }
                                        }}
                                    />
                                    <Text style={{ marginTop: 10, fontSize: fontSize(6), alignSelf: 'center', fontWeight: 'bold', color: '#2D5672' }}>{item.word}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {/* Màn hình số  */}
            <Modal
                visible={visible}
                style={{
                    backgroundColor: '#ADDDDC',
                    borderRadius: 15,
                    height: 450,
                    marginTop: sizeHeight(15),
                    width: '90%',
                    marginHorizontal: 20
                }}
                onDismiss={() => {
                    setShow(false)
                    setVisible(false)
                }}
            >
                <View style={{
                    top: 0,
                    alignItems: 'center',
                    width: "100%",
                    height: "100%",
                    borderRadius: 15
                }}>

                    <View style={{ height: '100%' }}>

                        <Swiper showsButtons={false} index={index} onIndexChanged={(index) => playSound(data[index]?.audioWord)} >
                            {
                                data.map((item, index) => (
                                    <View key={index}>
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
                                            <TouchableOpacity onPress={handleCancel}>
                                                <Image resizeMode='contain' source={cancel} style={{ width: sizeWidth(5), height: sizeHeight(3) }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ alignItems: 'center', marginTop: '-15%' }}>
                                            <TouchableOpacity onPress={() => playSound(item?.audioWord)} activeOpacity={0.7}>
                                                <Image style={{
                                                    resizeMode: 'contain',
                                                    height: sizeHeight(60), width: sizeWidth(60),
                                                    alignSelf: 'center',
                                                    borderRadius: sizeWidth(14),
                                                    maxHeight: 300
                                                }}
                                                    source={{
                                                        uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                                                        method: 'GET',
                                                        headers: {
                                                            Authorization: store.getState().authReducer.user.accessToken
                                                        }
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 30, flexDirection: 'row', color: '#2D5672', justifyContent: 'center', paddingTop: 3 }}>{item?.word}</Text>
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






