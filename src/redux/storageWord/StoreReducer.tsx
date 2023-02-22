

const initialState = {
    store:[]
    
}
export default  ( state= initialState, action)=>
{
    switch(action.type)
    {
        
        case'SET_STORAGE':
        return{
            ...state,
            store: action.payload.data
        }
        case'UPDATE_STORAGE':
        return{
            ...state,
            store:state.store.push(...action.payload.data)

        }
        
            default:
                return state;
            
    }
}