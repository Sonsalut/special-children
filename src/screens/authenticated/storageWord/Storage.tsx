import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { Text, View, Image } from 'react-native';
import React from 'react';
import { store } from 'redux/store';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Container, TouchableOpacity } from 'components';
import { Searchbar } from 'react-native-paper';
import HeaderWithBack from 'components/header/HeaderWithBack';
import CheckBox from '@react-native-community/checkbox';
import { useIsFocused } from '@react-navigation/native';
import colors from 'res/colors';
import { useLogicStorage } from './useLogicStorage';
import styles from './styles';
import { ApiConstants } from 'network/ApiConstants';
import SmallCard from 'components/cards/SmallCard';
import FastImage from 'react-native-fast-image';
import { FILE_SIZE } from 'utils/Constant';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import MediumCard from 'components/cards/MediumCard';
import { isClicked } from 'redux/storageWord/action';

const Storage = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.StorageWord
>) => {
  const { personDataFromAPi, setPersonDataFromApi,
    category,
    fullStore,
    getCategory,
    getStorageWords,
    addWordToStorage,
    deleteWordToStorage,
    loadData,
    hasDone, setHasDone,
    testChoose,
    isClicked,
    isExits,
    doneHandle,
    filterDatas,
    searchData,
    handleChoose,
    refreshing, onRefresh,
    show, setShow,
    searchValue, setSearchValue } = useLogicStorage()
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      getStorageWords()
      getCategory()
    }

  }, [isFocused])

  return (


    <Container
      style={styles.container}
      isBottomTab={false}>

      <HeaderWithBack
        outerStyle={{
          backgroundColor: colors.title_blue
        }}
        title={'Kho từ'}
        handle={doneHandle}
        hasDone={true}
        titleStyle={{ color: colors.text_blue }}
      />
      {/* Word list container */}
      <View
        style={styles.wordListContainer}
      >
        <Searchbar
          value={searchValue}
          onChangeText={(e) => setSearchValue(e)}
          inputStyle={{ alignSelf: 'center' }}
          spellCheck={false}
          style={styles.searchbar}
          placeholder='Tìm kiếm'
          icon={require('../../../assets/images/magni.png')}
          iconColor={colors.text_blue}
          placeholderTextColor={'gray'}
          elevation={0}
        />
        {
          // khi hiển thị tìm kiếm sẽ mất hết catagory
          searchValue === ""
            ?
            <FlatList
              data={category}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: '10%' }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.blue]}
                />
              }
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  style={styles.titleView}
                >

                  <View
                    key={index + 1}
                    style={styles.cateView}
                  >
                    <Text style={styles.cateText}>{item?.name}
                    </Text>
                  </View>
                  <View
                    key={index + 2}
                    style={styles.wordview}
                  >
                    <FlatList

                      data={filterDatas(item?.id)}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (

                        <View style={styles.wordVsCheckboxView}>
                          <TouchableOpacity
                            onPress={() => handleChoose(item)}
                            style={styles.cardView}>
                            <View
                              style={{
                                width: '100%',
                                height: '18%',
                                borderRadius: sizeWidth(3),
                                flexDirection: 'row',
                                // borderWidth: 1,
                              }}
                            >
                              {item.isActive ?
                                null
                                : <View
                                  style={{
                                    height: '100%',
                                    width: '25%',
                                    borderRadius: sizeWidth(3),
                                    backgroundColor: colors.card_blue,
                                    alignSelf: 'flex-start',
                                    marginLeft: 'auto',
                                    paddingTop: '5%',
                                    // borderWidth: 1
                                  }}
                                >
                                  <Image
                                    source={require('../../../assets/images/tick.png')}
                                    style={{
                                      alignSelf: 'center',

                                    }}

                                  />
                                </View>}
                            </View>
                            <View style={{ zIndex: -99 }}>
                              <FastImage
                                style={styles.wordImage}
                                source={{
                                  uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=${FILE_SIZE}&${item?.updatedAt}`,

                                  headers: {
                                    Authorization: store.getState().authReducer.user.accessToken

                                  },
                                  cache: FastImage.cacheControl.web,
                                  priority: FastImage.priority.high,

                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                              />
                            </View>
                            <Text
                              style={styles.wordText}>{item?.word}
                            </Text>
                          </TouchableOpacity>
                          {/* {
                            hasDone ? 
                              <CheckBox 
                                style={styles.checkbox} 
                                value={!item?.isActive} 
                                onValueChange={() => handleChoose(item)} 
                              /> 
                            : null
                          } */}
                        </View>
                      )}
                    />
                  </View>
                </View>
              )}

            />
            : <View style={styles.resultSearchView}>
              <FlatList

                data={searchData()}
                numColumns={3}
                renderItem={({ item, index }) => (

                  <View style={styles.wordVsCheckboxView}>


                    
                      <MediumCard
                        disabled={true}
                        uri={ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=${FILE_SIZE}&${item?.updatedAt}`}
                        title={item?.word}
                      />
                    

                    {/* {
                      hasDone ? <CheckBox style={styles.checkbox} value={!item?.isActive} onValueChange={() => handleChoose(item)} /> : null
                    } */}
                    {item.isActive ?
                      null
                      : <View
                        style={{
                          height: '16%',
                          width: '25%',
                          borderRadius: sizeWidth(2),
                          backgroundColor: colors.card_blue,
                          alignSelf: 'flex-start',
                          marginLeft: 'auto',
                          paddingTop: '3%',
                          marginTop: '10%',
                          // borderWidth: 1
                        }}
                      >
                        <Image
                          source={require('../../../assets/images/tick.png')}
                          style={{
                            alignSelf: 'center',

                          }}

                        />
                      </View>}
                  </View>
                )}
              />
            </View>
        }
      </View>

    </Container>
  )
}
export default Storage
