import ResponseCode from 'network/ResponseCode';
import React from "react";
import AuthenticationApi from 'network/subs/auth/AuthApi';
import { LoginResponse } from 'network/subs/auth/AuthResponse';
import NavigationService from "routers/NavigationService";
import { AuthenticationScreens, MainScreens } from "routers/ScreenNames";
import { useToast } from 'hooks/useToast';
import { useDispatch } from 'react-redux';
import authSlice from 'redux/slice/authSlice';

const useLogicLogin = () => {
    const dispatch = useDispatch();
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const showToast = useToast();
    const [hidden, setHidden] = React.useState(true)
    const changeHiddenStatus = () => {
        setHidden(!hidden)
    }

    const onPressLogin = async (values: any) => {
        const response = await AuthenticationApi.loginWithEmail<LoginResponse>({
            username: values?.username?.trim(),
            password: values?.password?.trim(),
        });
       if(response.status === ResponseCode.SUCCESS){
        dispatch(authSlice.actions.setUser({
            accessToken: response?.data?.data?.jwtToken,
            accountInfo: response?.data?.data?.accountInfo,
            refreshToken: response?.data?.data?.refreshToken,
          }));
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

    return {
        hidden,
        changeHiddenStatus,
        onPressLogin,
        onNavigateRegister
    };
};

export { useLogicLogin };
