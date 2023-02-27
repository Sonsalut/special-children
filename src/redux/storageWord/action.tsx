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