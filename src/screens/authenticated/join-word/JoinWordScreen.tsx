import React from 'react';
import { Container, Text, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { FlatList, Image, View } from 'react-native';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { store } from 'redux/store';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLogicJoinWord } from './useLogicJoinWord';
import style from './style';
import { ApiConstants } from 'network/ApiConstants';

const JoinWordScreen = ({ }: StackNavigationProps<
    Routes,
    AuthenticatedScreens.RecordingScreen
>) => {
    const isFocused = useIsFocused();
    React.useEffect(() => {
        getStorageWords()
        //     if(words.length>0)
        //     {
        //         setWords([])

        //     }
        setID('')
    }, [])
    const {
        id,
        setID,
        stop,
        setStop,
        data, setData,
        words, setWords,
        addWord,
        deleteWord,
        isStop,
        setIsStop,
        playSimpleSound,
        playSound,
        getStorageWords, } = useLogicJoinWord()
    return (
        <Container isBottomTab={false} style={style.container}>
            {/* Word join board */}
            <View style={style.wordJoinView}>
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
                                    style={style.wordcard}
                                    isDoubleTap={true}
                                    onPress={() => { deleteWord(item) }}>

                                    <Image style={style.addWordImage}
                                        source={{
                                             uri: ApiConstants.HOST+ `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                                            method: 'GET',
                                            headers: { Authorization: store.getState().authReducer.user.accessToken }
                                        }}
                                    />
                                    <Text style={style.textWord}>{item.word}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
                <TouchableOpacity
                    style={style.playButton}
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
            {/* Reserve word list */}

            <FlatList
                data={data}

                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={{ alignItems: 'flex-start', width: '95%', alignSelf: 'center', justifyContent: 'space-around' }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={style.deleteWordView}>
                            <TouchableOpacity
                                style={{ borderRadius: sizeWidth(3) }}
                                isDoubleTap={true}
                                onPress={() => {
                                    addWord(item, index)
                                }}>
                                <View style={style.deleteWord}>
                                    <Image style={style.deleteWorImage}
                                        source={{
                                            uri: ApiConstants.HOST+ `ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                                            method: 'GET',
                                            headers: {
                                                Authorization: store.getState().authReducer.user.accessToken
                                            }
                                        }}
                                    />
                                    <Text style={style.deleteText}>{item.word}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </Container>
    );
};

export default JoinWordScreen;

