import {createSlice} from '@reduxjs/toolkit';
import {DataLoginResponse} from 'network/subs/auth/AuthResponse';

interface AuthSliceState {
  user: DataLoginResponse;
}

export default createSlice({
  name: 'auth',
  initialState: {
    user: {},
  } as AuthSliceState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = {} as DataLoginResponse;
    },
  },
});
