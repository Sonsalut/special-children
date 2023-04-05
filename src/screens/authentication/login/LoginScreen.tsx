import React from 'react';
import { Container, TextInput, Button, } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticationScreens } from 'routers/ScreenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import images from 'res/images';
import { useLogicLogin } from './useLogicLogin';
import styles from './styles';
import { LogBox } from 'react-native';
import { store } from 'redux/store';

LogBox.ignoreAllLogs();
const LoginScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticationScreens.LoginScreen
>) => {
  const { register, setError, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: store.getState().authReducer.Account.username,
      password: ''
    }
  });
  const { hidden, changeHiddenStatus, onPressLogin, onNavigateRegister, loginWithBiometric } = useLogicLogin();

  const fingerPrint = store.getState().authReducer.fingerPrint
  const name = store.getState().authReducer.Account.username

  return (

    <Container isBottomTab={false}>
      <ImageBackground
        source={require('../../../assets/images/Home-bgr.png')}
        style={styles.background}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <ImageBackground
            source={require('../../../assets/images/AIS-Learning.png')}
            style={styles.superChildren}
          >
            <View style={styles.form}>
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
                    iconLeftStyle={{ marginLeft: sizeWidth(5), }}
                    iconRightStyle={{
                      marginRight: sizeWidth(5),
                      height: sizeHeight(3.5),
                      width: sizeWidth(3.5)
                    }}
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
                style={styles.buttonLogin}
                label='Đăng nhập'
                isDoubleTap={true}
                onPress={handleSubmit(onPressLogin)}
              />

              {/* create touch id*/}
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.fingerPrintOpacity}
                  onPress={handleSubmit(loginWithBiometric)}>
                  <Image
                    source={require('../../../assets/images/fingerprint.png')}
                    style={{
                      resizeMode: 'contain',
                      width: sizeWidth(12),
                      height: sizeHeight(8),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </Container>

  );
};

export default LoginScreen;
