import React, { useState } from 'react';
import { Container, TouchableOpacity } from 'components';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { FlatList, Image, View, TouchableWithoutFeedback } from 'react-native';
import styles from '../home/styles';
import { Modal, Searchbar } from 'react-native-paper';
import { RefreshControl } from 'react-native-gesture-handler';
import RecordingAPI, { AuthApis } from 'network/subs/auth/recording/RecordingAPI';
import ResponseCode from 'network/ResponseCode';
import { store } from 'redux/store';
import SoundPlayer from 'react-native-sound-player';
import Swiper from 'react-native-swiper';
import { Text } from 'react-native';
import colors from 'res/colors';
import { GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { getCateId, showIcon } from 'redux/storageWord/action';
import RNFetchBlob from 'rn-fetch-blob';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'hooks/useToast';
import { ApiConstants } from 'network/ApiConstants';
import axios from 'axios';
import BigCard from 'components/cards/BigCard';
import FastImage from 'react-native-fast-image';
import { url } from 'inspector';

const RecordingScreen = ({ route, navigation }: any) => {

    const cancel = require('.././../../../src/assets/images/goback.png')
    const [image, setImage] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [data, setData] = React.useState<any>([])
    const [animal, setAnimal] = React.useState([])
    const [imgBase64, setImgBase64] = React.useState()
    const [item, setItem] = React.useState()
    React.useEffect(() => {
        navigation.setOptions({ headerTitle: `${route?.params?.data?.name}` })
        dispatch(getCateId(route?.params?.data?.id))
        loadData();
        // FastImage.clearMemoryCache()
        // .then(res => console.log( res))
    }, [])
    const isFocused = useIsFocused()

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
            headers: {
                "Authorization": store.getState().authReducer.user.accessToken,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }


        }).then(response => {
            if (response.status === 200) {
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
                                showToast("ERROR", 'danger')
                            }
                        })
                            .finally(() => {
                                RNFetchBlob.fs.unlink('file://' + filePath)
                            })
                    })
            }



        })
            .catch(err => {
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
        // console.log(item?.updatedAt.slice())
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
    const [urlList, setUrlList] = useState([])
    const preloads=(item) =>{
        FastImage.preload([
            {
                uri:ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM&${item?.updatedAt}`,
                headers: { Authorization: store.getState().authReducer.user.accessToken },

            }
        ])
    }
      React.useEffect(() => {
        if(isFocused) {

            let masp = data.map(item=>{
                preloads(item)
                
            })
        }
      }, [isFocused])
      
   
    return (

        <Container isBottomTab={false} style={styles.container}>
            <TouchableWithoutFeedback
                // onPress={aa}
                onLongPress={handleShow}
            >
                <View style={styles.mainView}>
                    {
                        shows ?
                            <Searchbar
                                style={{
                                    borderWidth: 1,
                                    // bottom: 5,
                                    borderColor: '#C1EBEA',
                                    borderRadius: 15,
                                    width: sizeWidth(80),
                                    backgroundColor: 'white',
                                    height: sizeHeight(6),
                                    marginTop: 5,
                                }}
                                placeholder="Tìm kiếm từ"
                                placeholderTextColor={'gray'}
                                inputStyle={{ alignSelf: 'center' }}
                                value={searchValue}
                                onChangeText={(e) => setSearchValue(e)}
                                spellCheck={false}
                            />
                            : null
                    }
                    <View
                        style={{
                            width: sizeWidth(94),
                            height: sizeHeight(92),
                            alignItems: 'center',
                            alignSelf: 'center',
                            paddingTop: 20,
                        }}
                    >
                        <FlatList
                            data={filterData()}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            contentContainerStyle={{ paddingBottom: sizeHeight(10) }}
                            removeClippedSubviews={true}
                            initialNumToRender={2} // Reduce initial render amount
                            maxToRenderPerBatch={1} // Reduce number in each render batch
                            updateCellsBatchingPeriod={5}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[colors.blue]}
                                />}
                            renderItem={({ item, index }) => (
                                <BigCard
                                    onPress={() => { chooseWord(item, index) }}
                                    isDoubleTap={false}
                                    uri={ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM&${item?.updatedAt}`}

                                    title={`${item?.word}`}
                                />



                            )}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {/* Màn hình số  */}
            <Modal
                visible={visible}
                style={{
                    alignSelf: 'center',
                    backgroundColor: '#ADDDDC',
                    borderRadius: 15,
                    height: sizeHeight(70),
                    marginTop: sizeHeight(15),
                    width: sizeWidth(90),
                    // marginHorizontal: sizeHeight(10),
                    marginLeft: sizeWidth(5)
                }}
                onDismiss={() => {
                    setShow(false)
                    setVisible(false)
                }}
            >
                <View style={{
                    alignItems: 'center',
                    width: "100%",
                    height: "100%",
                    borderRadius: 15,

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
                                        <View style={{ alignItems: 'center', marginBottom: sizeHeight(-45) }}>
                                            <TouchableOpacity onPress={() => playSound(item?.audioWord)} activeOpacity={0.7}>
                                                <FastImage style={{
                                                    
                                                    height: sizeHeight(60), width: sizeWidth(80),
                                                    alignSelf: 'center',
                                                    borderRadius: sizeWidth(14),
                                                    maxHeight: sizeHeight(40)
                                                }}
                                                resizeMode='stretch'
                                                    source={{
                                                        uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM&${item?.updatedAt}`,
                                                        // method: 'GET',
                                                        headers: {
                                                            Authorization: store.getState().authReducer.user.accessToken
                                                        },
                                                        cache: FastImage.cacheControl.web,
                                                        priority: FastImage.priority.normal,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: fontSize(12), flexDirection: 'row', color: '#2D5672', justifyContent: 'center', paddingTop: 3 }}>{item?.word}</Text>
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






