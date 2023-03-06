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
export const add =(data)=>{
    return{

        type:'ADD',
        payload:data
    }

}
export const deletes =(data)=>{
    return{

        type:'DELETE',
        payload:data
    }

}
export const getdata =(data)=>{
    return{

        type:'GET_PERSONAL_STORE_FROM_API',
        payload:data
    }

}

