import ResponseCode from 'network/ResponseCode';
import React from "react";
import AuthenticationApi from 'network/subs/auth/AuthApi';
import { LoginResponse } from 'network/subs/auth/AuthResponse';
import NavigationService from "routers/NavigationService";
import { AuthenticationScreens, MainScreens } from "routers/ScreenNames";
import { useToast } from 'hooks/useToast';
import { useDispatch } from 'react-redux';
import authSlice from 'redux/slice/authSlice';
import { store } from 'redux/store';
import TouchID from 'react-native-touch-id';
import { Alert } from 'react-native';

const useLogicLogin = () => {
    const dispatch = useDispatch();
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const showToast = useToast();
    const [hidden, setHidden] = React.useState(true)
    const FingerPrint = store.getState().authReducer.fingerPrint?.auth;
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      color: '#e00606', // Android,
      fallbackLabel: 'Show Passcode', // iOS
    };
    const changeHiddenStatus = () => {
        setHidden(!hidden)
    }
    const refPopUp: any = React.useRef(null);
    const showUp = () => {
      refPopUp.current?.open();
    };
    const onPressLogin = async (values: any) => {
        const response = await AuthenticationApi.loginWithEmail<LoginResponse>({
            username: values?.username?.trim(),
            password: values?.password?.trim(),
        });

       if(response.status === ResponseCode.SUCCESS){

        // dispatch(authSlice.actions.saveFingerPrint({auth: false}));
      

        dispatch(authSlice.actions.setUser({
            accessToken: response?.data?.data?.jwtToken,
            accountInfo: response?.data?.data?.accountInfo,
            refreshToken: response?.data?.data?.refreshToken,
          }));

        dispatch(
          authSlice.actions.saveAccount({
            username: values?.username?.trim(),
            password: values?.password?.trim(),
          }),
        );

        NavigationService.reset(MainScreens.AuthenticatedNavigator);
        showToast('Đăng nhập thành công!', 'success');
       }
       else {
        showToast('Tài khoản hoặc mật khẩu không chính xác!', 'warning');
       }
    }
    const onNavigateRegister =  () => {
        NavigationService.navigate(AuthenticationScreens.RegisterScreen);
    }

    //login with touch-id logic
    const loginWithBiometric = () => {
        if (FingerPrint) {
          TouchID.authenticate('', optionalConfigObject)
            .then((success: any) => {
              const account = {
                username: store.getState().authReducer.user.accountInfo.user,
                password: store.getState().authReducer.user.accountInfo.password,
              };
              handleLoginWithEmail(account);
            })
            .catch((error: any) => {
              console.log(error);
              
            });
        } else {
          showUp();
          Alert.alert('Vui lòng đăng nhập để kích hoạt tính năng');
        }
    };
    return {
        hidden,
        changeHiddenStatus,
        onPressLogin,
        loginWithBiometric,
        onNavigateRegister
    };
};

export { useLogicLogin };

  function handleLoginWithEmail(account: { username: any; password: any; }) {
    throw new Error('Function not implemented.');
  }

  function showUp() {
    throw new Error('Function not implemented.');
  }
  // function handleLoginWithEmail(account: { username: any; password: any; }) {
  //   throw new Error('Function not implemented.');
  // }

  // function showUp() {
  //   throw new Error('Function not implemented.');
  // }

