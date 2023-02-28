import React from 'react';
import {Container, Text, PopUp} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity, View, Image } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import colors from 'res/colors';
import {store} from 'redux/store';
import { useLogicLogin } from 'screens/authentication/login/useLogicLogin';
import { useLogicMessage } from './useLogicMessage';

const MessageScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.MessageScreen
>) => {
  const { logOut, 
    
    onToggleSwitch, cancelLogOut,
    refPopUp, name, setIsSwitchOn, isSwitchOn, onPopUpClose, confirmLogOut } = useLogicMessage();
  React.useEffect(() => {
    const getFingerPrint = () => {
      if (store.getState().authReducer.fingerPrint?.fingerprint) {
        return true;
      }
      else
        return false;
    };
    setIsSwitchOn(getFingerPrint());
  }, []);
  return (
    <Container style={{backgroundColor: 'white'}}>
      <View style={{width: '90%', height: 300, alignSelf: 'center', backgroundColor:'#E7F6FF', marginTop: 20, borderRadius: 25}}>
        {/* Touch ID on/off */}
        <View style={{flexDirection: 'row', paddingTop: 20, paddingHorizontal: 15}}>
          <Image
            source={require('../../../assets/images/fingerprint.png')}
            style={{ width: 25, height: 25}}
          />
          <Text style={{paddingLeft: 10, paddingTop: 2, fontSize: 18, color:'colors.text_blue'}}>Đăng nhập bằng vân tay</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            trackColor={{ false: colors.grey, true: colors.blue }}
            thumbColor={colors.white}
            style={{paddingBottom: 10, marginLeft: 30, }}
          />
        </View>

        {/* Voice setting */}
        <View style={{flexDirection: 'row', paddingTop: 20, paddingHorizontal: 15}}>
          <TouchableOpacity style={{flexDirection: 'row'}} >
            <Image
              source={require('../../../assets/images/voice.png')}
              style={{ width: 25, height: 25}}
            />
            <Text style={{paddingLeft: 10, paddingTop: 2, fontSize: 18, color: 'colors.text_blue'}}>Giọng đọc</Text>
          </TouchableOpacity>
        </View>

        {/* Sign out button */}
        <View style={{flexDirection: 'row', paddingTop: 20, paddingHorizontal: 15}}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>DevSettings.reload()}>
            <Image
              source={require('../../../assets/images/logout.png')}
              style={{ width: 25, height: 25}}
            />
            <Text style={{paddingLeft: 10, paddingTop: 2, fontSize: 18, color: 'red'}}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

 

export default MessageScreen;
