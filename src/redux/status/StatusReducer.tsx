const initialState = {
   
    numColumns:2


}
export default (state = initialState, action) => {
    switch (action.type) {

        case 'SET_STATUS':
            return {
                ...state,
                numColumns: action.payload ==='PORTRAIT' ? 2 : 3
            }

        default:
            return state;

    }
}