import React from 'react';
import { Container, Text } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { TouchableOpacity, View, Image } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import colors from 'res/colors';
import { store } from 'redux/store';
import { useLogicMessage } from './useLogicMessage';
import { sizeWidth } from 'utils/Utils';
import { Modal, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const MessageScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.MessageScreen
>) => {
  const { logOut, 
    onToggleSwitch, cancelLogOut,
    refPopUp, name, setIsSwitchOn, isSwitchOn, onPopUpClose, confirmLogOut,  show,setShow, visible,setVisible,
    handle,gendervalue,setGenderValue,regionvalue,setRegionValue,
    getVoiceInfor,
    PostVoiceInfor,
    handleChangeInfor,
    logOutvisible,setlogOutvisible,
    logOutShow,setLogOutShow,
    handleLogOut,
    handleCancelLogOut,
    cofirmHandleLogOut,
    handleReturn } = useLogicMessage();
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

React.useEffect(() => {
  getVoiceInfor()

 
}, [])

  return (
    <Container style={styles.container}>
      <View style={styles.containerView}>
        {/* Touch ID on/off */}
        <View style={styles.view}>
          <Image
            source={require('../../../assets/images/fingerprint.png')}
            style={styles.iconImg}
          />
          <Text style={styles.text}>Đăng nhập bằng vân tay</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            trackColor={{ false: colors.grey, true: colors.blue }}
            thumbColor={colors.white}
            style={styles.switch}
          />
        </View>

        {/* Voice setting */}
        <View style={styles.view}>
          <TouchableOpacity activeOpacity={0.7} onPress={handle} style={{flexDirection: 'row'}} >
            <Image
              source={require('../../../assets/images/voice.png')}
              style={styles.iconImg}
            />
            <Text style={styles.text}>Giọng đọc</Text>
          </TouchableOpacity>
        </View>

        {/* Sign out button */}
        <View style={styles.view}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleLogOut}>
            <Image
              source={require('../../../assets/images/logout.png')}
              style={styles.iconImg}
            />
            <Text style={styles.logText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        {/* Popups shows */}
        <Modal
                    visible={visible}
                    style={styles.modalVoice}
                    onDismiss={() => {
                        setShow(false)
                        setVisible(false)
                    }}
                >            
                    <View style={styles.voiceView}>
                      <TouchableOpacity onPress={handleReturn} style={styles.returnButton}>
                      <Icon name='arrow-back-outline' size={25}/>

                      </TouchableOpacity>
                      {/* gender choice */}
                      <View style={styles.genderView}>
                      
                      <Text style={styles.genderText}>Giới tính:</Text>
 <RadioButton.Group   onValueChange={value => setGenderValue(value)} value={gendervalue}>
  
      <RadioButton.Item  label="Nam" value="MALE" labelStyle={styles.selectedGenderText} />
      <RadioButton.Item  label="Nữ" value="FEMALE"labelStyle={styles.selectedGenderText} />
    </RadioButton.Group>
                      </View>
                      {/* Regionchoice */}
                      <View style={styles.regionView}>
                      <Text style={styles.selectedRegionText}>Vùng miền:</Text>
 <RadioButton.Group  onValueChange={value => setRegionValue(value)} value={regionvalue}>
  
      <RadioButton.Item label="Bắc" value="NORTHERN" labelStyle={styles.selectedGenderText} />
      <RadioButton.Item label="Trung" value="MIDDLE"labelStyle={styles.selectedGenderText} />
      <RadioButton.Item label="Nam" value="SOUTHERN"labelStyle={styles.selectedGenderText} />
    </RadioButton.Group>
                      </View>
                        
                       <View style={styles.changeButtonView}>
                        <TouchableOpacity 
                          style={styles.changeButton} 
                          onPress={handleChangeInfor} 
                          activeOpacity={0.7}>
                          <Text 
                            style={styles.confirmText}>Xác nhận
                          </Text>
                        </TouchableOpacity>
                       </View>
                    </View>

                </Modal>
                <Modal
                    visible={logOutvisible}
                    style={styles.logoutModal}
                    // onDismiss={() => {
                    //     setLogOutShow(false);
                    //     setlogOutvisible(false)
                    // }}
                >            
                    <View style={styles.logOutView}>
                      <Icon name={'warning-outline'}
        size={sizeWidth(8)}
        color={"#FF4444"}
        style={styles.warningIcon} />
          <View style={{width:'90%', height:50}}>
          <Text style={styles.warnText}>Bạn có chắc chắn muốn đăng xuất</Text>
          <Text style={styles.warnText}>không?</Text>


          </View>
                      <View style={styles.buttonView}>
                      <TouchableOpacity activeOpacity={0.7} onPress={handleCancelLogOut} style={styles.closeButton}>
                        <Text style={styles.closeText}>Đóng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} onPress={cofirmHandleLogOut} style={styles.logOutButton}>
                        <Text style={styles.logOutText}>Đăng xuất</Text>
                      </TouchableOpacity>
                      </View>
                      
                      
                    </View>

                </Modal>
                
      </View>
    </Container>
  );
};

 

export default MessageScreen;
