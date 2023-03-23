export const setStorage =(data)=>{
    return{

        type:'SET_STORAGE',
        payload:data
    }


}
export const filterStorage =(id)=>{
    return{

        type:'FILTER_STORAGE',
        payload:id
    }


}
export const updateStorage =(data)=>{
    return{

        type:'UPDATE_STORAGE',
        payload:data
    }




}
export const isClicked =(data)=>{
    return{

        type:'CLICKED_WORD',
        payload:data
    }

}
export const addWordToStorage =(data)=>{
    return{

        type:'ADD_WORD_TO_STORAGE',
        payload:data
    }

}
export const setCategory =(data)=>{
    return{

        type:'SET_CATEGORY',
        payload:data
    }

}
export const showIcon =()=>{
    return{

        type:'SHOW_ICON',
        
    }

}
export const resetShow =()=>{
    return{

        type:'RESET_SHOW',
        
    }

}
export const getCateId =(data)=>{
    return{
            type:'GET_CATE_ID',
            payload:data
    }
}



