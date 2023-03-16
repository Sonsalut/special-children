import React from 'react';
import { Container, Text, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import NavigationService from 'routers/NavigationService';
import { View, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { store } from 'redux/store';
import colors from 'res/colors';
import { RefreshControl } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useLogicHome } from './useLogicHome';
import { ApiConstants } from 'network/ApiConstants';


const HomeScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.HomeScreen
>) => {
  const { data,getCategory,dispatch,show,handleShow,refreshing,onRefresh,searchValue,filterData,} = useLogicHome()

  const isFocused = useIsFocused()
  React.useEffect(() => {
    getCategory()

  }, [isFocused])

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
          <FlatList
            data={filterData()}
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

              <TouchableOpacity
                onPress={() => NavigationService.navigate(AuthenticatedScreens.RecordingScreen, { data: item })}
                isDoubleTap={false}
                activeOpacity={0.7}
                style={styles.categoryCards}
              >
                <Image
                  style={styles.imageCategory}
                  source={item?.pictureFileId !== null ? {
                    // uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL`,
                    uri: ApiConstants.HOST+ `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&${new Date()}`,
                    
                    method: 'GET',
                    headers: { Authorization: store.getState().authReducer.user.accessToken }
                  } :
                    require('../../.././assets/images/no.png')
                  }
                />
                <Text style={styles.categoryText}>{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default HomeScreen;
