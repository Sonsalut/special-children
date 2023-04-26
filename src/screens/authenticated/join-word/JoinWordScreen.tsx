import React from 'react';
import { Container, Text, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { checkIpad, fontSize, isPortrait, sizeHeight, sizeWidth } from 'utils/Utils';
import { store } from 'redux/store';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLogicJoinWord } from './useLogicJoinWord';
import style from './style';
import { ApiConstants } from 'network/ApiConstants';
import { RefreshControl } from 'react-native-gesture-handler';
import colors from 'res/colors';
import MediumCard from 'components/cards/MediumCard';
import SmallCard from 'components/cards/SmallCard';
import { truncate } from 'fs';
import { FILE_SIZE } from 'utils/Constant';
import { Dimensions } from 'react-native';
import { isPlain } from '@reduxjs/toolkit';
import useOrientation from 'hooks/useOrientation';



const JoinWordScreen = ({ }: StackNavigationProps<
    Routes,
    AuthenticatedScreens.RecordingScreen
>) => {
    const isFocused = useIsFocused();
    
    //TEST RESPONSIVE ORIENTATION

    const orientation = useOrientation();
    

    React.useEffect(() => {
        if (isFocused) {
            getStorageWords()
            setID('')
            setWords([])
        }
    }, [isFocused])
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
    const [refresh, setRefresh] = React.useState(false)
    const onRefresh = () => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
            getStorageWords()

        }, 2000);
    }
    // const orientation = isPortrait () ? 'portrait' : 'landscape';
    return (
        <Container
            isBottomTab={false}
            style={style.container}
        >
            {/* Word join board */}
            <View style={isPortrait() ? {
                width: '100%',
                height: sizeHeight(50),
                alignSelf: 'center',
                marginTop: sizeHeight(2),
                backgroundColor: '#EFEFEF',
                
                // borderWidth: 1
            } : {
                borderRadius: sizeWidth(5),
                width: '50%',
                height: checkIpad() ? sizeHeight(60) : sizeHeight(40),
                backgroundColor: '#EFEFEF',
                borderWidth: 1,
                marginTop: sizeHeight(0.5),
                marginLeft: sizeWidth(5),
                flexDirection: checkIpad() ? 'row' : 'column'
            }}>
                {/* Word added to board */}
                <FlatList
                    data={words}
                    keyExtractor={(_, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                            colors={[colors.blue]}
                        />
                    }
                    numColumns={3}
                    scrollEnabled={false}
                    contentContainerStyle={style.joinWordFlatList}
                    renderItem={({ item, index }) => {
                        return (
                            <MediumCard
                                isDoubleTap={true}
                                onPress={() => { deleteWord(item) }}
                                uri={ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=${FILE_SIZE}&${item?.updatedAt}`}

                                title={`${item?.word}`}
                            />
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
                            ? <Image
                                source={require('../../../assets/images/pause-btn.png')}
                                resizeMode='contain'
                                style={{
                                    height: sizeHeight(13),
                                    width: sizeWidth(13)
                                }}
                            />
                            
                            : <Image
                                source={require('../../../assets/images/play-btn.png')}
                                resizeMode='contain'
                                style={{
                                    height: sizeHeight(13),
                                    width: sizeWidth(13)
                                }}
                            />
                            
                    }

                </TouchableOpacity>
            </View>
            {/* Reserve word list */}

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.reserveWordFlatList}
                renderItem={({ item, index }) => {
                    return (
                        <MediumCard
                            disabled={false}
                            isDoubleTap={true}
                            uri={ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=${FILE_SIZE}&${item?.updatedAt}`}
                            title={`${item?.word}`}
                            onPress={() => {
                                addWord(item, index)
                            }}
                        />
                    )
                }}
            />
        </Container>
    );
};

export default JoinWordScreen;

