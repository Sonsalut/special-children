import {combineReducers} from 'redux';

import authSlice from './slice/authSlice';

const rootReducer = combineReducers({
  authReducer: authSlice.reducer,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
