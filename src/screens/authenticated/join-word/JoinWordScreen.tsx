import React, { useState } from 'react';
import { Container, Text, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import HeaderWithBack from 'components/header/HeaderWithBack';
import images from 'res/images';
import { FlatList, Image, ImageBackground, View } from 'react-native';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { useToast } from 'hooks/useToast';
import { Button } from 'react-native-paper';
import SoundPlayer from 'react-native-sound-player';
import Sound from 'react-native-sound';
import ResponseCode from 'network/ResponseCode';
import RecordingAPI, { AuthApis } from 'network/subs/auth/recording/RecordingAPI';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
import { store } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';

const JoinWordScreen = ({ }: StackNavigationProps<
    Routes,
    AuthenticatedScreens.RecordingScreen
>) => {

    const showToast = useToast();
    const MAX_IMAGE_WIDTH = 480;
    const MAX_IMAGE_HEIGHT = 480;
    const IMAGE_QUALITY = 60;
    const [image, setImage] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [id, setID] = React.useState(" ");
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([{}])
    const [words, setWords] = React.useState([])



    const addWord = (item: any, index: any) => {

        // console.log(item?.pictureFiledId)
        if (words.length <= 5) {
            setWords([...words, { ...item }])
            let temp = data.filter(value => value.word != item?.word)
            setData([...temp])
            // dispatch(add(item))
            if (id) {
                setID(id + "," + item?.audioWord)
                // console.log('if---'+id)
            }
            else {
                setID(item?.audioWord)
                // console.log('el---'+id)

            }

            // console.log(data)

        }
        else {
            showToast('Quá số lượng từ cho phép!', 'warning');
        }
    }
    const deleteWord = (item: any) => {
        let temp = words.filter(value => value.word != item?.word)
        setWords([...temp])
        setData([...data, { ...item }])

        if (id.length > 1) {
            // let count= item?.audioWord.length
            // let tempId = id.indexOf(`,${item?.audioWord}`)
            // console.log(count)
            // // console.log(id.slice(tempId,0))
            // setID(id.slice(tempId,0))
            let index = id.indexOf(`${item?.audioWord}`)
            let a = item?.audioWord
            let indexs = a.length
            let strs = id.slice(0, index) + id.slice(index + indexs + 1)
            let newStr= strs.trim()
            if (newStr.charAt(newStr.length-1)==',')
            {
                          newStr= newStr.slice(0, newStr.length-1)
            }

                console.log(newStr);

            setID(newStr)

        }
    }

        const isFocused = useIsFocused();


        React.useEffect(() => {

            getStorageWords()
            //     if(words.length>0)
            //     {
            //         setWords([])

            //     }
            setID('')
        }, [])
        const [isStop, setIsStop] = React.useState('play')
        const playSimpleSound = async (id) => {
            let filePath = '';
            let url = AuthApis.GetVoice + encodeURIComponent(id)
            await RNFetchBlob.config({
                fileCache: true,
                appendExt: 'mp3',
            })
                .fetch("GET", url, {
                    Authorization: store.getState().authReducer.user.accessToken,
                    'Accept': '*/*',
                    'Content-Type': 'application/octet-stream'
                })
                .then((res) => {
                    console.log(res);
                    // console.log("The file saved to ", res.path())
                    console.log("The file saved to ", res.path());
                    filePath = res.path();
                    SoundPlayer.playUrl('file://' + filePath);
                })
        }
        const [ids, setIds] = useState('')
        const playSound = async () => {
            console.log(id)
            if (id === '') {
                showToast('Hãy cho từ vào khu ghép từ', 'warning')
                setStop(false)
            }
            
            if (id) {
                if (!stop) {
                    setStop(true)


                    try {
                        // or play from url
                        playSimpleSound(id)

                    } catch (e) {
                        console.log(`cannot play the sound file`, e)
                    }


                } else {
                    setStop(false)
                    SoundPlayer.stop()
                }

            }
            // setStop(!stop)

            SoundPlayer.addEventListener('FinishedPlaying',((res)=>{

                if(res)
                {
                    setStop(false)
                    console.log('success')

                }
            }))


        }

        // const loadData = async () => {
        //     const response: any = await RecordingAPI.GetWordByCateID< GetWordByCateID>({
        //         pageIndex: 1,                                                                                                                                                                                                                                                                                                                                  
        //         pageSize: 1,
        //         word: '',

        //         categoryId: 1,
        //         isActive: true
        // });
        //     if (response.status === ResponseCode.SUCCESS) {
        //         setData(response.data?.words)
        //     }
        //     else {
        //         console.log('that bai')
        //     }
        // }

        const dispatch = useDispatch()
        const handleStore = useSelector(store => store.storeReducer.handleStore)
        const getStorageWords = async (values: any) => {

            const response = await RecordingAPI.GetStorageWord<GetStorageWord>({
                data: {}

            })
            if (response.status === ResponseCode.SUCCESS) {
                // console.log(response.data)
                setData(response.data)
                // dispatch(getdata(response.data))

            }

        }

        return (

            <Container isBottomTab={false} style={{ backgroundColor: 'white' }}>

                {/* Word join board */}
                <View style={{
                    borderRadius: 10,
                    width: '90%',
                    height: sizeHeight(42),
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                    backgroundColor: '#E7F6FF',
                    padding: 10
                }}>

                    {/* Word added to board */}
                    <FlatList
                        // data={handleStore}
                        data={words}

                        keyExtractor={(_, index) => index.toString()}

                        numColumns={3}

                        contentContainerStyle={{ alignItems: 'flex-start' }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ paddingHorizontal: 10, paddingBottom: 10, marginTop: 5 }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#C1EBEA',
                                            borderRadius: sizeWidth(3),
                                            width: sizeWidth(23),
                                            height: sizeHeight(15),
                                            justifyContent: 'center',
                                            alignItems: 'center'}}
                                        isDoubleTap={true} 
                                        onPress={() => { deleteWord(item) }}>
                                    
                                            <Image style={{
                                                height: sizeHeight(12),
                                                width: sizeWidth(22),
                                                borderRadius: sizeWidth(3),
                                                marginBottom: '-20%',
                                            }}
                                                source={{
                                                    uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                                                    method: 'GET',
                                                    headers: { Authorization: store.getState().authReducer.user.accessToken }
                                                }}
                                            />
                                            <Text style={{ color: '#2D5672', fontWeight: '600', marginTop: '10%', fontSize: fontSize(4) }}>{item.word}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    {/* <View 
                style={{
                    borderWidth:1, 
                    width:'80%',
                   marginVertical:sizeHeight(10),
                    borderColor: '#87C2E4', 
                    alignSelf:'center'
                    }}>
            </View> */}
                    <TouchableOpacity 
                        style={{
                            alignSelf: 'flex-end',
                            shadowColor: 'grey',
                            backgroundColor: '#FFD19A',
                            height: sizeHeight(5),
                            width: sizeHeight(5),
                            borderRadius:10,
                            alignItems: 'center',
                            justifyContent: 'center'}}
                        isDoubleTap={true}
                        activeOpacity={0.7}
                        onPress={playSound}
                    >
                        {
                            stop
                                ? <Icon color={'#2D5672'} size={sizeHeight(4)} name="stop-outline"></Icon>
                                : <Icon color={'#2D5672'} size={sizeHeight(4)} name="play-outline"></Icon>

                        }


                    </TouchableOpacity>
                </View>

                {/* Line between 2 rows of words */}



                {/* Reserve word list */}

                <FlatList
                    // data={personalStorageApi}
                    data={data}

                    keyExtractor={(_, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={{ alignItems: 'flex-start', width: '95%', alignSelf: 'center', justifyContent: 'space-around'}}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ paddingTop:15, marginHorizontal: 12, borderWidth:1, borderColor: 'white'}}>
                                <TouchableOpacity
                                    style={{borderRadius: sizeWidth(3)}}
                                    isDoubleTap={true}
                                    onPress={() => {
                                    addWord(item, index)
                                    }}>
                                    <View style={{
                                        backgroundColor: '#C1EBEA',
                                        borderRadius: sizeWidth(3),
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                        height: sizeHeight(17),
                                        width: sizeWidth(25),
                                    }}>
                                        <Image style={{
                                            height: sizeHeight(13),
                                            width: sizeWidth(24),
                                            borderRadius: sizeWidth(3),
                                            marginTop: '5%',
                                            marginBottom: '-10%',
                                        }}
                                            source={{
                                                uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                                                method: 'GET',
                                                headers: {
                                                    Authorization: store.getState().authReducer.user.accessToken
                                                }
                                            }}
                                        />
                                        <Text style={{ color: '#2D5672', fontWeight: '600', marginTop: sizeHeight(0.3), marginBottom: 5 }}>{item.word}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />

                {/* Generate voice button */}


            </Container>
        );
    };

    export default JoinWordScreen;

