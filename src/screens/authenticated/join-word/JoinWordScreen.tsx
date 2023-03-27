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
import { RefreshControl } from 'react-native-gesture-handler';
import colors from 'res/colors';
import MediumCard from 'components/cards/MediumCard';
import SmallCard from 'components/cards/SmallCard';
import { truncate } from 'fs';

const JoinWordScreen = ({ }: StackNavigationProps<
    Routes,
    AuthenticatedScreens.RecordingScreen
>) => {
    const isFocused = useIsFocused();
    
    React.useEffect(() => {    
       if(isFocused)
       {
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
        const onRefresh =()=>{
            setRefresh(true);
        setTimeout(() => {
          setRefresh(false); 
         
        getStorageWords()
          
        }, 2000);
        }
    return (
        <Container isBottomTab={false} style={style.container}>
            {/* Word join board */}
            <View style={style.wordJoinView}>
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
                    contentContainerStyle={{ 
                        alignItems: 'flex-start', 
                        marginTop: sizeHeight(2),
                        width: sizeWidth(85),
                        // alignSelf:'center',
                        marginLeft: sizeWidth(6.5),
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <SmallCard
                                isDoubleTap={true}
                                onPress={() => { deleteWord(item) }}
                                source={{
                                    uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&`,
                                    method: 'GET',
                                    headers: { Authorization: store.getState().authReducer.user.accessToken }
                                }}
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ 
                    alignItems: 'center', 
                    width: '95%', 
                    alignSelf: 'center', 
                    justifyContent: 'space-around'
                }}
                renderItem={({ item, index }) => {
                    return (
                        <MediumCard
                            disabled={false}
                            isDoubleTap={true}
                            source={{
                                uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&`,
                                method: 'GET',
                                headers: { Authorization: store.getState().authReducer.user.accessToken }
                            }}
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

