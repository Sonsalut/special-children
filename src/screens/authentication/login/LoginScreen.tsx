import React from 'react';
import { Container, TextInput, Button } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticationScreens, AuthenticatedScreens, MainScreens } from 'routers/ScreenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Controller, useForm } from 'react-hook-form';

import { View, Image, Text, TouchableOpacity } from 'react-native';
import NavigationService from 'routers/NavigationService';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import images from 'res/images';
import { useLogicLogin } from './useLogicLogin';
const LoginScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticationScreens.LoginScreen
>) => {
  const { register, setError, handleSubmit, control, reset, formState: { errors } } = useForm();
  const { hidden, changeHiddenStatus, onPressLogin ,onNavigateRegister} = useLogicLogin();

  return (
    <Container style={{ backgroundColor: '#486fbc' }}>
      <View style={{ marginTop: sizeHeight(4) }}>
        <Image source={images.Logo} />
      </View>
      <View>
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onNavigateRegister}
        >
          <Text
            style={{
              color: '#b7deff',
              textDecorationLine: 'underline',
              alignSelf: 'center',
              marginTop: sizeHeight(10),
              fontSize:fontSize(4)
            }}
          >Đăng ký tài khoản</Text>
        </TouchableOpacity>
      </View >
    </Container>
  );
};

export default LoginScreen;
