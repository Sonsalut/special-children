import React from 'react';
import { Container, Text, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import NavigationService from 'routers/NavigationService';
import { View, Image, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styles from './styles';
import { store } from 'redux/store';
import colors from 'res/colors';
import { RefreshControl } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useLogicHome } from './useLogicHome';
import { ApiConstants } from 'network/ApiConstants';
import BigCard from 'components/cards/BigCard';



const HomeScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.HomeScreen
>) => {
  const { data, getCategory, dispatch, show, handleShow, refreshing, onRefresh, searchValue, setSearchValue, filterData, } = useLogicHome()

  const isFocused = useIsFocused()
  React.useEffect(() => {
    getCategory()
    setRandom(Math.random())
  }, [isFocused == true])
  const [random, setRandom] = React.useState(Math.random)
  const [orientation, setOrientation] = React.useState(2);
  const determineAndSetOrientation = () => {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    if (width < height) {
      setOrientation(2)
    } else {
      setOrientation(3)
    }
  }

  React.useEffect(() => {

    determineAndSetOrientation();
    Dimensions.addEventListener('change', determineAndSetOrientation);
    //  console.log(status)
    return () => {
      Dimensions.addEventListener('change', determineAndSetOrientation).remove()
    }
  });
  return (

    <Container isBottomTab={false} style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => console.log('Pressed')}
        onLongPress={handleShow}
      >

        <View style={styles.mainView}>
          {
            show ?
              <Searchbar
                style={styles.searchBar}
                placeholder="Tìm kiếm chủ đề"
                placeholderTextColor={'gray'}
                value={searchValue}
                onChangeText={(e) => setSearchValue(e)}
                spellCheck={false}
              />
              : null
          }
          {
            orientation === 2
              ? (
                <FlatList
                  data={filterData()}
                  key={'_'}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  scrollToOverflowEnabled={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={[colors.blue]}
                    />
                  }
                  renderItem={({ item }) => (

                    <BigCard
                      onPress={() => NavigationService.navigate(AuthenticatedScreens.RecordingScreen, { data: item })}
                      isDoubleTap={false}
                      source={{
                        uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                        method: 'GET',
                        headers: { Authorization: store.getState().authReducer.user.accessToken }
                      }}
                      title={`${item?.name}`}
                    />

                  )}
                />
              )

              : (

                <FlatList
                  data={filterData()}
                  key={'#'}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  scrollToOverflowEnabled={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={[colors.blue]}
                    />
                  }
                  renderItem={({ item }) => (

                    <BigCard
                      onPress={() => NavigationService.navigate(AuthenticatedScreens.RecordingScreen, { data: item })}
                      isDoubleTap={false}
                      source={{
                        uri: ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                        method: 'GET',
                        headers: { Authorization: store.getState().authReducer.user.accessToken }
                      }}
                      title={`${item?.name}`}
                    />

                  )}
                />
              )
          }

        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default HomeScreen;
