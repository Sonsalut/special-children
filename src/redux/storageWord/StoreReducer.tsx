import { count } from "console";


const initialState = {
    fullStore:[

    ],
   category:[
       
   ],
   handleStore:[],

  personalStorefromApi:[],
  show: false,
  categoryId:''
    
    
}
export default  ( state= initialState, action)=>
{
    switch(action.type)
    {
        
        case'SET_STORAGE':
        return{
            ...state,
            fullStore: state.fullStore.length===0 ? action.payload : [...state.fullStore, action.payload]
        }
        case'SET_CATEGORY':
        return{
            ...state,
         category:action.payload

        }
       
        case'CLICKED_WORD':
        return{
            ...state,
        fullStore: state.fullStore.map((item)=>{

            if(item?.id==action.payload?.id)
            {
                return{
                    ...item,
                    isActive: action.payload?.isActive
                }
            }
            return item
        }),
       
       
        }
        case 'SHOW_ICON':
            return{
                ...state,
                show:!state.show
            }
            case'GET_CATE_ID':
            return{
                ...state,
             categoryId:action.payload
    
            }
        
            default:
                return state;
            
    }
}