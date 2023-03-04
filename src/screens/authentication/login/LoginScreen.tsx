import React from 'react';
import { Container, TextInput, Button, } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticationScreens, AuthenticatedScreens, MainScreens } from 'routers/ScreenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SvgUri } from 'react-native-svg';
import { Controller, useForm } from 'react-hook-form';
// import TouchID from 'react-native-touch-id';

import { View, Image, Text, TouchableOpacity, ImageBackground} from 'react-native';
import NavigationService from 'routers/NavigationService';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import images from 'res/images';
import { useLogicLogin } from './useLogicLogin';
import styles from './styles';
import { LogBox } from 'react-native';

// LogBox.ignoreAllLogs();
const LoginScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticationScreens.LoginScreen
>) => {
  const { register, setError, handleSubmit, control, reset, formState: { errors } } = useForm();
  const { hidden, changeHiddenStatus, onPressLogin, onNavigateRegister, loginWithBiometric} = useLogicLogin();
  
  return (
    
    <Container  isBottomTab={false}>
      <ImageBackground 
        source={require('../../../assets/images/Home-bgr.png')} 
        style={styles.background}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}> 


                <ImageBackground
                  source={require('../../../assets/images/AIS-Learning.png')}
                  style={{height: '95%', width: '100%', justifyContent: 'flex-end'}}
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
                      style={{ marginTop: 20,}}
                      label='Đăng nhập'
                      onPress={handleSubmit(onPressLogin)} />

                    {/* create touch id*/}
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity 
                        style={{marginTop: 30, alignItems: 'center', borderRadius: 25, width: 50}} 
                        onPress={loginWithBiometric}>
                        <Image 
                          source={require('../../../assets/images/fingerprint.png')} 
                          style={{ width: 50, height: 50, marginBottom: '8%', marginTop: '8%'}} 
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
