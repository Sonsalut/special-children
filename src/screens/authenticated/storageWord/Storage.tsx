import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, Image, TouchableOpacity } from 'react-native';
import ResponseCode from 'network/ResponseCode';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetFullCategory } from 'network/subs/auth/recording/RecordingRequest';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { store } from 'redux/store';
import { GetStorageWord, GetWordByCateID } from 'network/subs/auth/recording/RecordingRequest';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header } from 'components';
import { Title } from 'react-native-paper';
import HeaderWithBack from 'components/header/HeaderWithBack';
import { RecordingResponse } from 'network/subs/auth/recording/RecordingResponse';
import Vi from 'assets/languages/vi';
import CheckBox from '@react-native-community/checkbox';
import { Value } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { filterStorage, isClicked, setCategory, setStorage, showPersonStore, updateStorage } from 'redux/storageWord/action';
const Storage = ({}: StackNavigationProps<
    Routes,
    AuthenticatedScreens.StorageWord
  >) => {
    const [data, setData] = React.useState([])
    const [dataWord , setDataWord] = React.useState([])
    const [dataWords , setDataWords] = React.useState([])
    const [personData , setPersonData] = React.useState([])


    

    const getCategory = async (values: any) => {
        const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
          pageIndex: 1,
          pageSize: 20,
          name:null,
          isActive:true,
          categories: {}
    
        });
        if (response.status === ResponseCode.SUCCESS) {
          // console.log(response.data.categories)
    
          // setData(response.data.categories)
          if(category.length<=0)
          {
            dispatch(setCategory(response.data.categories))
            loadData(response.data.categories?.id)
          } 
      
          //  dispatch(setStorage(response.data.categories))
        }
      }

      const filter= (name)=>dataWord.filter((item)=> item?.category?.id=== name)
      const handle=()=>{
        console.log(dataWord)
      }
      const category= useSelector(store=>store.storeReducer.category)
      const filterWordStore= useSelector(store=>store.storeReducer.filterCategory)
      const personalStorage= useSelector(store=>store.storeReducer.personalStore)
      const fullStore= useSelector(store=>store.storeReducer.fullStore)


      const dispatch= useDispatch()
      const loadData = async (id: any) => {
        const response: any = await RecordingAPI.GetWordByCateID< GetWordByCateID>({
            pageIndex: 1,
            pageSize: 20,
            word: '',
            categoryId: id,
            isActive:true
        });
        if (response.status === ResponseCode.SUCCESS) {
          console.log(response.data?.words)
          
             
            setDataWord(response.data?.words)
         
              dispatch(setStorage(response.data?.words))
        }
        else {
            console.log('that bai')
        }
    }
    
      React.useEffect(() => {

          getCategory()
      }, [])
  
  const [hasDone, setHasDone] = React.useState(false)
  const doneHandle= async ()=>{
       setHasDone(!hasDone)
       dispatch(showPersonStore())     
  }
  const filterDatas=(item)=>(
    fullStore.filter(word=>word?.category?.id===item)
  
  )
  const addHandle =(item)=>(
  
          console.log('test add')
  )
  const handleChoose=(item)=>{
 
    // dispatch(updateStorage({...item, isActive: true}))
    dispatch(isClicked(item))
    console.log(item)
  }
  
  return (


    <Container>
      <HeaderWithBack  title={'Kho từ'} handle={doneHandle} hasDone={hasDone}
      />
    <View style={{marginLeft:10, marginTop:10, height:sizeHeight(90), width:sizeWidth(95)}}>
      
     <FlatList 
      data={category}
      renderItem={({item, index})=>(
        <View key={index} >
         
             <View key={index+1} style={{width:sizeWidth(20),borderRadius:10, height:sizeHeight(12), borderWidth:1, marginTop:10, marginHorizontal:5}}>
             <Image style={{
                                resizeMode:'stretch',
                                height: sizeHeight(8), width: sizeWidth(18),
                                alignSelf:'center',
                                borderRadius: 9
                            }}
                                source={{
                                    uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=small`,
                                    method: 'GET',
                                    headers: {
                                        Authorization: store.getState().authReducer.user.accessToken
                                    }
                                }}

                            />
              
              <Text style={{fontSize:15, color:'black', fontWeight:"400", alignSelf:"center"}}>{item?.name}</Text>
             </View>
           
             <View key={index+2}  style={{flexDirection:'row', marginTop:10,  height:sizeHeight(15)}}>
          
            <FlatList
            
            data={filterDatas(item?.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index})=>(
              // <Text>{item?.word}</Text>
              <View style={{flexDirection:'row', borderWidth:1, width:sizeWidth(30), height: sizeHeight(15)}}>
                    
              <TouchableOpacity >
              <View style={{ alignSelf:'center', width:sizeWidth(20), marginHorizontal:5,borderRadius:10,paddingTop:5, height:sizeHeight(15), borderWidth:1}}>
                  <Image style={{
                            resizeMode:'stretch',
                            height: sizeHeight(10), width: sizeWidth(18),
                            alignSelf:'center',
                            borderRadius: 9
                        }}
                            source={{
                                uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${item?.pictureFileId}&file-size=MEDIUM`,
                                method: 'GET',
                                headers: {
                                    Authorization: store.getState().authReducer.user.accessToken
                                }
                            }}

                        />
                <Text style={{fontSize:15, color:'black', fontWeight:"400", alignSelf:"center"}}>{item?.word}</Text>
              </View>
              </TouchableOpacity>
             {
              hasDone? <CheckBox style={{right:15} } value={!item?.isActive} onValueChange={()=>handleChoose(item)}  /> : null

             }
              </View>
            )}
            />
            {/* {
              dataWord.map((its, index)=>{
                
                if (item?.id===its?.category?.id) {
                  return(
                    <View style={{flexDirection:'row'}}>
                    
                  <TouchableOpacity>
                  <View style={{ alignSelf:'center', width:sizeWidth(20), marginHorizontal:5,borderRadius:10,paddingTop:5, height:sizeHeight(15), borderWidth:1}}>
                      <Image style={{
                                resizeMode:'stretch',
                                height: sizeHeight(10), width: sizeWidth(18),
                                alignSelf:'center',
                                borderRadius: 9
                            }}
                                source={{
                                    uri: `https://ais-schildren-test-api.aisolutions.com.vn/ext/files/download?id=${its?.pictureFileId}&file-size=MEDIUM`,
                                    method: 'GET',
                                    headers: {
                                        Authorization: store.getState().authReducer.user.accessToken
                                    }
                                }}

                            />
                    <Text style={{fontSize:15, color:'black', fontWeight:"400", alignSelf:"center"}}>{its?.word}</Text>
                  </View>
                  </TouchableOpacity>
                 {
                  hasDone? <CheckBox/> : null

                 }
                  </View>
                  )
                }
              })
            } */}
            </View>
           
        </View>
      )}

     />
    </View>
   
    </Container>
  )
}

export default Storage

const styles = StyleSheet.create({})