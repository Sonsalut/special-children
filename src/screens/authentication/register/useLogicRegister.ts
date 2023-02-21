import ResponseCode from 'network/ResponseCode';
import React from "react";
import AuthenticationApi from 'network/subs/auth/AuthApi';
import { LoginResponse } from 'network/subs/auth/AuthResponse';
import NavigationService from "routers/NavigationService";
import { MainScreens } from "routers/ScreenNames";
import { useToast } from 'hooks/useToast';

const useLogicRegister = () => {
    const showToast = useToast();
    const [hidden, setHidden] = React.useState(true)
    const [hidden1, setHidden1] = React.useState(true)

    const changeHiddenStatus = (values) => {
        setHidden(!hidden)
        

    }
  

    const onPressRegister = async (values: any) => {
        if(values.password!== values.Repasword)
        {
            showToast("Mật khẩu không không khớp", "danger")
        }
        else
        {
            const response = await AuthenticationApi.registerWithEmail<LoginResponse>({
                email: values?.username?.trim(),
                password: values?.password?.trim(),
                fullName: values?.fullname?.trim(),
                phone: values?.password?.trim(),
                address: values?.address?.trim(),
                genderType : 'Male'
            });
            if (response.status === ResponseCode.SUCCESS) {
                NavigationService.reset(MainScreens.AuthenticationNavigator);
                showToast('Đăng ký thành công!', 'success');
            }
            else {
                showToast('Đăng ký thất bại!', 'danger');
            }
        }
       
       
    }

    return {
        hidden,
        changeHiddenStatus,
        onPressRegister,
        hidden1,

    };
};

export { useLogicRegister };
