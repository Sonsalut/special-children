import React from 'react';
import { Container, Text } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import { TouchableOpacity, View, Image } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import colors from 'res/colors';
import { store } from 'redux/store';
import { useLogicMessage } from './useLogicMessage';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { Modal, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import ConfirmModal from 'components/modal/ConfirmModal';
import { useIsFocused } from '@react-navigation/native';
import useOrientation from 'hooks/useOrientation';
import ReactNativeModal from 'react-native-modal';


const MessageScreen = ({ }: StackNavigationProps<
  Routes,
  AuthenticatedScreens.MessageScreen
>) => {
  const { logOut,
    onToggleSwitch, cancelLogOut,
    refPopUp, name, setIsSwitchOn, isSwitchOn, onPopUpClose,  show, setShow, visible, setVisible,
    handle, gendervalue, setGenderValue, regionvalue, setRegionValue,
    getVoiceInfor,
    PostVoiceInfor,
    handleChangeInfor,
    logOutvisible, setlogOutvisible,
    logOutShow, setLogOutShow,
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

  //TEST RESPONSIVE ORIENTATION

  const orientation = useOrientation();
  const [visibleConfirmModal, setVisibleConfirmModal] = React.useState(false)

  const confirmLogOut = ()=>{
    setVisibleConfirmModal(!visibleConfirmModal)
}
  const isFocused = useIsFocused()
  React.useEffect(() => {

    isFocused ? getVoiceInfor() : null;
  }, [isFocused])

  React.useEffect(() => {
    const getFingerPrint = () => {
      if (store.getState().authReducer.fingerPrint) {
        return true;
      }
      else
        return false;
    };
    setIsSwitchOn(getFingerPrint());
  }, []);

  return (
    <Container style={styles.container}>
      <View style={styles.containerView}>

{/* TOUCH ID ON/OFF */}
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

{/* VOICE SETTING */}
        <View style={styles.view}>
          <TouchableOpacity activeOpacity={0.7} onPress={handle} style={{ flexDirection: 'row' }} >
            <Image
              source={require('../../../assets/images/voice.png')}
              style={styles.iconImg}
            />
            <Text style={styles.text}>Giọng đọc</Text>
          </TouchableOpacity>
        </View>

{/* SIGN OUT BUTTON */}
        <View style={styles.view}>
          <TouchableOpacity 
            style={{ flexDirection: 'row' }} onPress={handleLogOut}>
            <Image
              source={require('../../../assets/images/logout.png')}
              style={styles.iconImg}
            />
            <Text style={styles.logText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

      </View>

{/* MODAL SHOW */}
      <ReactNativeModal
        isVisible={visible}
        style={styles.modalVoice}
        onBackdropPress={handleReturn}
        
        onDismiss={() => {
          setShow(false)
          setVisible(false)
        }}
      >
        <View style={styles.voiceView}>
          <View style={styles.voiceTitle}>
            <Text style={{fontSize: fontSize(4.8),alignSelf: 'center'}}>Giọng đọc</Text>
          </View>
          {/* <TouchableOpacity onPress={handleReturn} style={styles.returnButton}>
            <Icon name='arrow-back-outline' size={fontSize(6)}/>
          </TouchableOpacity> */}


{/* GENDER SETTING */}
          <View style={styles.genderView}>

            <Text style={styles.genderText}>Giới tính:</Text>
            <RadioButton.Group style={styles.radioButtonGroup} onValueChange={value => setGenderValue(value)} value={gendervalue}>

              <RadioButton.Item label="Nam" value="MALE" labelStyle={styles.selectedGenderText} />
              <RadioButton.Item label="Nữ" value="FEMALE" labelStyle={styles.selectedGenderText} />
            </RadioButton.Group>
          </View>
{/* REGION SETTING */}
          <View style={styles.regionView}>
            <Text style={styles.selectedRegionText}>Vùng miền:</Text>
            <RadioButton.Group style={styles.radioButtonGroup} onValueChange={value => setRegionValue(value)} value={regionvalue}>

              
              <RadioButton.Item label="Bắc" style={{height:sizeHeight(6)}} value="NORTHERN" labelStyle={styles.selectedGenderText} />
              
              <RadioButton.Item label="Trung" style={{height:sizeHeight(6)}} value="MIDDLE" labelStyle={styles.selectedGenderText} />
              <RadioButton.Item label="Nam" style={{height:sizeHeight(6)}} value="SOUTHERN" labelStyle={styles.selectedGenderText} />
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

      </ReactNativeModal>

{/* LOG OUT MODAL */}
      <ConfirmModal
        visible={logOutvisible}
        onDismiss={() => {
          setLogOutShow(false);
          setlogOutvisible(false)
        }}
        text1={"Chắc chắn muốn đăng xuất?"}
        // text2={"không?"}
        handleCancel={handleCancelLogOut}
        handleConfirm={cofirmHandleLogOut}
        confirmText={"Đăng xuất"}
      />
    </Container>
  );
};
export default MessageScreen;


