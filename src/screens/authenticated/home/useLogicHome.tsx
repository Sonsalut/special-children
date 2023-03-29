import React from 'react';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import { GetFullCategory } from 'network/subs/auth/recording/RecordingRequest';
import ResponseCode from 'network/ResponseCode';
import { useDispatch, useSelector } from 'react-redux';
import { showIcon } from 'redux/storageWord/action';
import { useIsFocused } from '@react-navigation/native';
import axios, { Axios } from 'axios';
import { store } from 'redux/store';


 export const useLogicHome =() => {
    const [data, setData] = React.useState([])
    // const [datas, setDatas] = React.useState([])
  
    const getCategory = async (values: any) => {
      const response = await RecordingAPI.GetFullCategory<GetFullCategory>({
        pageIndex: 1,
        pageSize: 20,
        name:null,
        isActive:true,
        // categories: {}
      });
      if (response.status === ResponseCode.SUCCESS) {
  
        setData(response.data?.categories)

        console.log(data)
        // console.log(store.getState().authReducer.user.refreshToken)
        // console.log(store.getState().authReducer.user.accessToken)

      }
      
    }
   
    const dispatch= useDispatch()
    const show= useSelector(store=>store.storeReducer.show)
  const handleShow=( )=>{
   
    dispatch(showIcon())
  
  
  }
  const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false); 
          getCategory()
        
          
        }, 2000);
      }, []);
     
   
      const [searchValue, setSearchValue] = React.useState('')
      const filterData= ()=>(
       
        data.filter(item=> encodeURIComponent(item?.audioWord.toLowerCase()).includes( encodeURIComponent(searchValue.toLowerCase()) ))
        
      )
return {
    data,
    getCategory,
    dispatch,
    show,
    handleShow,
    refreshing,
    onRefresh,
    searchValue,setSearchValue,
    filterData,
}
}
