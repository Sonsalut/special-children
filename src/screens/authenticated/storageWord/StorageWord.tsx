
import ResponseCode from 'network/ResponseCode';
import { TouchableOpacity } from 'react-native';
import { store } from 'redux/store';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Container } from 'components';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetStorageWord } from 'network/subs/auth/recording/RecordingRequest';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import colors from 'res/colors';
import NavigationService from 'routers/NavigationService';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import { ApiConstants } from 'network/ApiConstants';


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
      console.log(response.data)
      setData(response.data)

    }

  }

  
  const isFocused = useIsFocused();

  React.useEffect(() => {
    
    getStorageWords()
  
    
  }, [isFocused===true])
  
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
    <Container style={styles.container} >

      <View >
        <TouchableOpacity
          style={styles.addCategoryButton}
          onPress={handle}
        >
          <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15, fontWeight: 'bold', color: '#2D5672' }}>Thêm từ vào kho</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.storageView}>
        <FlatList
          data={data}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.blue]}
            />
          }
          renderItem={({ item }) => (



            <View style={styles.word}>
              <Image style={styles.wordImage}
                source={{
                  uri: ApiConstants.HOST+ `ext/files/download?id=${item?.pictureFileId}&file-size=ORIGINAL&`,
                  method: 'GET',
                  headers: {
                    Authorization: store.getState().authReducer.user.accessToken
                  }
                }}

              />
              <Text style={styles.wordText}>{item?.word}</Text>
            </View>


          )} />
      </View>
    </Container>
  )
}

export default StorageWord
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  addCategoryButton: {
    marginLeft: 10,
    width: '50%',
    height: sizeWidth(10),
    borderRadius: 45,
    marginTop: 15,
    marginBottom: -10,
    backgroundColor: '#FFD19A',
    alignSelf: 'center'

  },
  storageView: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  word: {
    width: sizeWidth(25),
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingTop: 5,
    height: sizeHeight(16),
    backgroundColor: '#C1EBEA'
  },
  wordImage: {
    resizeMode: 'stretch',
    height: sizeHeight(11), width: sizeWidth(18),
    alignSelf: 'center',
    borderRadius: 9
  },
  wordText: {
    fontSize: 15,
    color: '#2D5672',
    fontWeight: 'bold',
    alignSelf: "center"
  }


})
