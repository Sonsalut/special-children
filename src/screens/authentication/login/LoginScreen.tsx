import React from 'react';
import { Container, TextInput, Button, ModalPopUp } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticationScreens, AuthenticatedScreens, MainScreens } from 'routers/ScreenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Controller, useForm } from 'react-hook-form';
// import TouchID from 'react-native-touch-id';

import { View, Image, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native';
import NavigationService from 'routers/NavigationService';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import images from 'res/images';
import { useLogicLogin } from './useLogicLogin';
const LoginScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticationScreens.LoginScreen
>) => {
  const { register, setError, handleSubmit, control, reset, formState: { errors } } = useForm();
  const { hidden, changeHiddenStatus, onPressLogin, onNavigateRegister, loginWithBiometric, onSubmit, error, 
    handleGoForgotPassword, onPopUpClose, refPopUp } = useLogicLogin();
  
  return (
    <Container isBottomTab={false}>
      <ImageBackground source={require('../../../assets/images/backgr.png')} style={{flex: 1}} resizeMode='stretch'/>
      <View style={{ position: 'absolute', flex: 1, width: '100%', height: '100%' }}>
        <View style={{ marginTop: sizeHeight(4), justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/Group207.png')}
            style={{ width: '70%', height: '59%', marginTop: -20, marginBottom: -70}}
          />
        </View>
        <KeyboardAvoidingView style={{ width: '80%', alignSelf: 'center', marginTop: -20}}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                iconLeftStyle={{ marginLeft: sizeWidth(5) }}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder={'Tài khoản'}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                isOnIconRightDoubleTap={true}
                iconLeftStyle={{ marginLeft: sizeWidth(5) }}
                iconRightStyle={{ marginRight: sizeWidth(5) }}
                iconRight={hidden ? images.eye_slash : images.eye}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder={"Mật khẩu"}
                onIconRight={changeHiddenStatus}
                secureTextEntry={hidden}
              />
            )}
            name="password"
          />
          
          <Button
            style={{ marginTop: 20 }}
            label='Đăng nhập'
            onPress={handleSubmit(onPressLogin)} />

          {/* create touch id */}
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
              style={{marginTop: 30, alignItems: 'center', borderRadius: 25, width: 50}} 
              onPress={loginWithBiometric}
            >
              <Image 
                source={require('../../../assets/images/touch-id.png')} 
                style={{ width: 50, height: 50}} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View> 
    </Container>
  );
};

export default LoginScreen;
