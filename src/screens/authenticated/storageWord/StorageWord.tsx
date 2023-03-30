
import ResponseCode from 'network/ResponseCode';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { useIsFocused } from '@react-navigation/native';
import { Container } from 'components';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetStorageWord } from 'network/subs/auth/recording/RecordingRequest';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import colors from 'res/colors';
import NavigationService from 'routers/NavigationService';
import { sizeHeight } from 'utils/Utils';
import { ApiConstants } from 'network/ApiConstants';
import MediumCard from '../../../components/cards/MediumCard';
import AddButton from 'components/button/AddButton';
import { FILE_SIZE } from 'utils/Constant';


const StorageWord = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.StorageWord
>) => {

  const [data, setData] = React.useState([])
  const dispatch = useDispatch()
  const personalStorage = useSelector(store => store.storeReducer.personalStore)
  const getStorageWords = async (values: any) => {

    const response = await RecordingAPI.GetStorageWord<GetStorageWord>({
      data: {}

    })
    if (response.status === ResponseCode.SUCCESS) {
      // console.log(response.data)
      setData(response.data)

    }

  }

  
  const isFocused = useIsFocused();

  
  React.useEffect(() => {
    
   isFocused === true
   ?     getStorageWords()
   : null
  
    
  }, [isFocused])
  ;
  const handle = () => {
    NavigationService.navigate(AuthenticatedScreens.Storage)

  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getStorageWords()
    }, 2000);
  }, []);
  return (
    <Container 
      isBottomTab={false}
      style={styles.container} 
    >

      <View >
        <AddButton
          onpress={handle}
          text={'Thêm từ vào kho'}
        />
      </View>
      <View style={styles.storageView}>
        <FlatList
          data={data}
          numColumns={3}
          contentContainerStyle={{paddingBottom: sizeHeight(8)}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.blue]}
            />
          }
          renderItem={({ item }) => (

            <MediumCard
              disabled={true}
  
                uri={ApiConstants.HOST + `ext/files/download?id=${item?.pictureFileId}&file-size=${FILE_SIZE}&${item?.updatedAt}`}
               
              title={`${item?.word}`}

            />
          )} />
      </View>
    </Container>
  )
}

export default StorageWord
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    
  },
  storageView: {
    width: '95%',
    height: '92%',
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
