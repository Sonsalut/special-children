import React from 'react';
import { Container } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import NavigationService from 'routers/NavigationService';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import colors from 'res/colors';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useLogicHome } from './useLogicHome';
import { ApiConstants } from 'network/ApiConstants';
import BigCard from 'components/cards/BigCard';
import { sizeHeight } from 'utils/Utils';
import { FILE_SIZE } from 'utils/Constant';



const HomeScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.HomeScreen
>) => {
  const { data, getCategory, dispatch, show, handleShow, refreshing, onRefresh, searchValue, setSearchValue, filterData, } = useLogicHome()

  // React.useEffect(() => {

  //   getCategory()

  // }, [])
  const isFocused = useIsFocused()

  React.useEffect(() => {
    if (isFocused) {
      getCategory()
      // setRandom(Math.random())
      // getCategory()


    }

  }, [isFocused])

  const [random, setRandom] = React.useState(Math.random)
  return (

    <Container isBottomTab={false} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}  
      >
        <TouchableWithoutFeedback
          // onPress={handleShow}
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
                  inputStyle={{ alignSelf: 'center' }}
                />
                : null
            }

            <FlatList
              data={filterData()}
              key={'_'}
              keyExtractor={(_, index) => index.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              scrollToOverflowEnabled={false}
              contentContainerStyle={{ paddingBottom: sizeHeight(10) }}

              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={5}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.blue]}
                />
              }
              renderItem={({ item, index }) => (

                <BigCard
                  onPress={() => NavigationService.navigate(AuthenticatedScreens.RecordingScreen, { data: item })}
                  isDoubleTap={false}
                  uri={ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=${FILE_SIZE}&${item?.updatedAt}`}
                  title={`${item?.name}`}
                />

              )}
            />


          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
