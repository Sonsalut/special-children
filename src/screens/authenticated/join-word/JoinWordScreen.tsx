import React from 'react';
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
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
import { store } from 'redux/store';
import { useSelector } from 'react-redux';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { useIsFocused } from '@react-navigation/native';

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
        console.log(item?.pictureFiledId)
        if (words.length < 5) {
            setWords([...words, { ...item }])
            let temp = data.filter(value => value.word != item?.word)
            setData([...temp])
            if (id) {
                setID(id + "," + item?.audioWord)
            }
            else {
                setID(item?.audioWord)
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
            let tempId = id.indexOf(`,${item?.audioWord}`)
            console.log(id.slice(tempId,-1))
            setID(id.slice(tempId,0))
        }

    }
    const personalStorage= useSelector(store=>store.storeReducer.personalStore)
    const isFocused = useIsFocused();

   
    React.useEffect(() => {
     
     getStorageWords()
    
      }, [isFocused])

    const playSound = () => {
        console.log(id)
        if (id) {
            if (!stop) {
                setStop(true)
                try {
                    // or play from url
                    SoundPlayer.loadUrl(`https://ais-schildren-test-api.aisolutions.com.vn/ext/files/audio-stream/by-word?words=${id}`)
                    SoundPlayer.play()
                } catch (e) {
                    console.log(`cannot play the sound file`, e)
                }
            } else {
                setStop(false)
                SoundPlayer.stop()
            }
        }
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

    const getStorageWords = async(values: any)=>{

        const response = await RecordingAPI.GetStorageWord<GetStorageWord>({
           data:{}
        
        })
        if (response.status === ResponseCode.SUCCESS) {
            console.log(response.data)
            setData(response.data)
        
          }
        
            }

    return (
        
        <Container style={{backgroundColor: 'white'}}>
            {/* <Text style={{color: '#2D5672', alignSelf: 'center', paddingTop:15, fontSize: 20}}>Bảng ghép từ</Text> */}
{/* Word join board */}
            <View style={{ 
                borderRadius:10, 
                width: '90%', 
                height: sizeHeight(35), 
                justifyContent: 'center', 
                alignSelf:'center', 
                marginTop: 20, 
                backgroundColor: '#E7F6FF',
                padding: 7
                }}>

{/* Word added to board */}
                <FlatList
                    data={words}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={{ alignItems: 'flex-start' }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} onPress={() => { deleteWord(item) }}>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                    <View style={{
                                        backgroundColor: item?.name === 'add' ? '#9BA8B5' : '#FFD19A',
                                        borderRadius: sizeWidth(3), justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            height: sizeHeight(11), width: sizeWidth(23),
                                            borderRadius: sizeWidth(3),
                                            marginBottom: -10,
                                            marginTop:10
                                        }}
                                            source={{
                                                uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                                                method: 'GET',
                                                headers: {
                                                    Authorization: store.getState().authReducer.user.accessToken
                                                }
                                            }}
                                        />
                                        {item?.name !== 'add' && <Text style={{ color: '#2D5672', fontWeight: '600', marginBottom: 5, fontSize: fontSize(4) }}
                                        >{item.word}</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                            
                        )
                    }}
                    
                />
            </View>

{/* Line between 2 rows of words */}
            <View 
                style={{
                    borderWidth:1, 
                    width:'80%',
                    bottom:165, 
                    borderColor: '#87C2E4', 
                    alignSelf: 'center', 
                    marginTop: 10}}>
            </View>


{/* Reserve word list */}
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={{ alignItems: 'flex-start', width: '95%', alignSelf: 'center', justifyContent: 'space-around'}}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ paddingVertical: 5, marginHorizontal: 12}}>
                            <TouchableOpacity activeOpacity={0.7}
                                onPress={() => {
                                    addWord(item, index)
                                }}>
                                <View style={{
                                    backgroundColor: item?.name === 'add' ? '#9BA8B5' : '#99C8E4',
                                    borderRadius: sizeWidth(3),
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    
                                }}>
                                    <Image style={{
                                        height: sizeHeight(12), width: sizeWidth(25),
                                        borderRadius: sizeWidth(3)
                                    }}
                                    source={{
                                        uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
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

{/* Generate voice button */}
            <TouchableOpacity style={{
                backgroundColor: '#FFD19A',
                position: 'absolute',
                bottom: sizeWidth(20),
                right: sizeWidth(10),
                borderRadius: sizeWidth(10),
                shadowColor: 'grey'
            }} isDoubleTap={true}
                activeOpacity={0.7}
                onPress={playSound}
            >
                <Text style={{ paddingVertical: sizeWidth(5), paddingHorizontal: sizeWidth(5), color: '#2D5672' }}>{stop ? 'Dừng' : 'Phát'}</Text>
            </TouchableOpacity>
            
        </Container>
    );
};

export default JoinWordScreen;

