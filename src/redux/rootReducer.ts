import {combineReducers} from 'redux';

import authSlice from './slice/authSlice';
import StoreReducer from './storageWord/StoreReducer';

const rootReducer = combineReducers({
  authReducer: authSlice.reducer,
  storeReducer:StoreReducer
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
