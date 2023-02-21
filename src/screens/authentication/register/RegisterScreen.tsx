import React from 'react';
import { Button, Container, Text, TextInput, TouchableOpacity } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticationScreens } from 'routers/ScreenNames';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import images from 'res/images';
import { Controller, useForm } from 'react-hook-form';
import { View, Image } from 'react-native';
import { useLogicRegister } from './useLogicRegister';
import styles from './styles';
import HeaderWithBack from 'components/header/HeaderWithBack';

const RegisterScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticationScreens.RegisterScreen
>) => {
  const { register, setError, handleSubmit, control, reset, formState: { errors } } = useForm();
  const { hidden,hidden1, changeHiddenStatus, onPressRegister } = useLogicRegister();

  return (
    <Container style={{ backgroundColor: '#486fbc' }}>
      <HeaderWithBack title={'Thông tin đăng ký'}
        titleStyle={{ marginTop: sizeHeight(5) }}
        leftIconStyle={{ marginTop: sizeHeight(5) }} />
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              iconLeftStyle={{ marginLeft: sizeWidth(5) }}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Email'}
              viewInputStyle={styles.textInput}
            />
          )}
          name="username"
        />
        <Divider />
    
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              isOnIconRightDoubleTap={true}
              iconLeftStyle={{ marginLeft: sizeWidth(5) }}
              iconRightStyle={{ marginRight: sizeWidth(5) }}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={"Họ và tên"}
              viewInputStyle={styles.textInput}

            />
          )}
          name="fullname"
        />
        <Divider />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              isOnIconRightDoubleTap={true}
              iconLeftStyle={{ marginLeft: sizeWidth(5) }}
              iconRightStyle={{ marginRight: sizeWidth(5) }}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={"Địa chỉ"}
              viewInputStyle={styles.textInput}

            />
          )}
          name="address"
        />
        <Divider />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              isOnIconRightDoubleTap={true}
              iconLeftStyle={{ marginLeft: sizeWidth(5) }}
              iconRightStyle={{ marginRight: sizeWidth(5) }}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={"Số điện thoại"}
              viewInputStyle={styles.textInput}

            />
          )}
          name="phone"
        />
         <Divider />
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
              viewInputStyle={styles.textInput}
            />
          )}
          name="password"
        />
       <Divider />
    <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              isOnIconRightDoubleTap={true}
              iconLeftStyle={{ marginLeft: sizeWidth(5) }}
              iconRightStyle={{ marginRight: sizeWidth(5) }}
              iconRight={hidden1 ? images.eye_slash : images.eye}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={"Nhập lại mật khẩu"}
              onIconRight={()=>changeHiddenStatus(value)}
              secureTextEntry={hidden1}
              viewInputStyle={styles.textInput}
            />
          )}
          name="Repassword"
        />
        <Button
          activeOpacity={0.5}
          style={{ marginTop: sizeHeight(7), width: '90%', alignSelf: 'center' }}
          label='Đăng ký'
          onPress={handleSubmit(onPressRegister)} />
      </View >
    </Container>
  );
};

export default RegisterScreen;

const Divider = () => {
  return (
    <View
      style={{ paddingVertical: sizeHeight(1) }}></View>
  )
}