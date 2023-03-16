import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { Image } from 'react-native';
import { Text, View } from 'react-native';
import React from 'react';
import { store } from 'redux/store';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Container } from 'components';
import { Searchbar } from 'react-native-paper';
import HeaderWithBack from 'components/header/HeaderWithBack';
import CheckBox from '@react-native-community/checkbox';
import { useIsFocused } from '@react-navigation/native';
import colors from 'res/colors';
import { useLogicStorage } from './useLogicStorage';
import styles from './styles';
import { ApiConstants } from 'network/ApiConstants';

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

    getStorageWords()
    getCategory()
  }, [])

  return (


    <Container style={styles.container} isBottomTab={false}>

      <HeaderWithBack
        outerStyle={{
          backgroundColor: colors.title_blue
        }}
        title={'Kho từ'} handle={doneHandle} hasDone={true}
        titleStyle={{ color: '#F1F1F2' }}
      />
      {/* Word list container */}
      <View
        style={styles.wordListContainer}
      >
        {show ? <Searchbar value={searchValue}
          onChangeText={(e) => setSearchValue(e)}
          inputStyle={{ fontSize: 13 }}
          spellCheck={false} style={styles.searchbar} placeholder='Nhập từ để tìm kiếm' /> : null}
        {
          // khi hiển thị tìm kiếm sẽ mất hết catagory
          searchValue === ""
            ?
            <FlatList
              data={category}
              showsVerticalScrollIndicator={false}


              onScrollBeginDrag={() => setShow(false)}
              onScrollEndDrag={() => setShow(true)}


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


                          <View style={styles.cardView}
                          >
                            <Image
                              style={styles.wordImage}
                              source={{
                                uri: ApiConstants.HOST+ `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                                method: 'GET',
                                headers: {
                                  Authorization: store.getState().authReducer.user.accessToken
                                }
                              }}
                            />
                            <Text
                              style={styles.wordText}>{item?.word}
                            </Text>
                          </View>
                          {
                            hasDone ? <CheckBox style={styles.checkbox} value={!item?.isActive} onValueChange={() => handleChoose(item)} /> : null
                          }
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


                    <View style={styles.cardView}
                    >
                      <Image
                        style={styles.wordImage}
                        source={{
                          uri: ApiConstants.HOST+ `ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                          method: 'GET',
                          headers: {
                            Authorization: store.getState().authReducer.user.accessToken
                          }
                        }}
                      />
                      <Text
                        style={styles.wordText}>{item?.word}
                      </Text>
                    </View>
                    {
                      hasDone ? <CheckBox style={styles.checkbox} value={!item?.isActive} onValueChange={() => handleChoose(item)} /> : null
                    }
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
