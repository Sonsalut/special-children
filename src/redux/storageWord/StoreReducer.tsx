import { count } from "console";


const initialState = {
    fullStore:[

    ],
   category:[
       
   ],
   handleStore:[],

  personalStorefromApi:[],
  show: false,
    
    
}
export default  ( state= initialState, action)=>
{
    switch(action.type)
    {
        
        case'SET_STORAGE':
        return{
            ...state,
            fullStore: action.payload
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
        
            default:
                return state;
            
    }
}