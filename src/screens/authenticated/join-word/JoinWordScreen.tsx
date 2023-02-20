import React from 'react';
import { Container, Text, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import HeaderWithBack from 'components/header/HeaderWithBack';
import images from 'res/images';
import { FlatList, Image, View } from 'react-native';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { useToast } from 'hooks/useToast';
import { Button } from 'react-native-paper';
import SoundPlayer from 'react-native-sound-player';
import Sound from 'react-native-sound';
import ResponseCode from 'network/ResponseCode';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
import { store } from 'redux/store';

const JoinWordScreen = ({ }: StackNavigationProps<
    Routes,
    AuthenticatedScreens.RecordingScreen
>) => {
    const showToast = useToast();
    const MAX_IMAGE_WIDTH = 480;
    const MAX_IMAGE_HEIGHT = 480;
    const IMAGE_QUALITY = 60;
    const [image, setImage] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [id, setID] = React.useState("");
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([{}])
    const [words, setWords] = React.useState([])

    const addWord = (item: any, index: any) => {
        console.log(item?.audioFieldId)
        if (words.length < 5) {
            setWords([...words, { ...item }])
            let temp = data.filter(value => value.word != item?.word)
            setData([...temp])
            if (id) {
                setID(id + "," + item?.audioFieldId)
            }
            else {
                setID(item?.audioFieldId)
            }

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
            let tempId = id.indexOf(`,${item?.audioFieldId}`)
            console.log(id.slice(tempId,-1))
            setID(id.slice(tempId,0))
        }

    }

    React.useEffect(() => {
        loadData();
    }, [])


    const playSound = () => {
        console.log(id)
        if (id) {
            if (!stop) {
                setStop(true)
                try {
                    // or play from url
                    SoundPlayer.playUrl(`https://ais-schildren-test-api.aisolutions.com.vn/ext/files/audio-stream/${id}`)
                } catch (e) {
                    console.log(`cannot play the sound file`, e)
                }
            } else {
                setStop(false)
                SoundPlayer.stop()
            }
        }
    }


    const loadData = async () => {
        const response: any = await RecordingAPI.GetWordByCateID<RecordingResponse>({
            pageIndex: 1,
            pageSize: 20,
            word: '',
            categoryId: 3
        });
        if (response.status === ResponseCode.SUCCESS) {
            setData(response.data?.words)
        }
        else {
            console.log('that bai')
        }
    }



    return (
        <Container >
            <HeaderWithBack title={'Ghép từ'} />
            <View style={{ borderWidth: 1, height: sizeHeight(10), justifyContent: 'center' }}>
                <FlatList
                    data={words}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={5}
                    contentContainerStyle={{ alignItems: 'flex-start' }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { deleteWord(item) }}>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                    <View style={{
                                        backgroundColor: item?.name === 'add' ? '#9BA8B5' : '#8ab643',
                                        borderRadius: sizeWidth(3), justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            height: sizeHeight(6), width: sizeWidth(14),
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
                                        {item?.name !== 'add' && <Text style={{ color: 'white', fontWeight: '600', marginTop: sizeHeight(0.3), marginBottom: 5, fontSize: fontSize(2.5) }}
                                        >{item.word}</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={{ alignItems: 'flex-start' }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                            <TouchableOpacity activeOpacity={0.7}
                                onPress={() => {
                                    addWord(item, index)
                                }}>
                                <View style={{
                                    backgroundColor: item?.name === 'add' ? '#9BA8B5' : '#4AD4FF',
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
                                    >{item.word}</Text>}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <TouchableOpacity style={{
                backgroundColor: 'blue',
                position: 'absolute',
                bottom: sizeWidth(20),
                right: sizeWidth(10),
                borderRadius: sizeWidth(10)
            }} isDoubleTap={true}
                activeOpacity={0.7}
                onPress={playSound}
            >
                <Text style={{ paddingVertical: sizeWidth(5), paddingHorizontal: sizeWidth(5), color: 'white' }}>{stop ? 'Dừng' : 'Phát'}</Text>
            </TouchableOpacity>
        </Container>
    );
};

export default JoinWordScreen;

