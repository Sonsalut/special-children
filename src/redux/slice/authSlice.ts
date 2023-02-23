import {createSlice} from '@reduxjs/toolkit';
import {DataLoginResponse,Account,FingerPrint} from 'network/subs/auth/AuthResponse';

interface AuthSliceState {
  Account: Account;
  fingerPrint:  FingerPrint;
  user: DataLoginResponse;
}

export default createSlice({
  name: 'auth',
  initialState: {
    user: {},
    fingerPrint: {},
    Account: {}
  } as AuthSliceState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = {} as DataLoginResponse;
    },
    saveAccount: (state, action) => {
      state.Account = action.payload
    },
    saveFingerPrint: (state, action) => {
      state.fingerPrint = action.payload
    }
  },
});
