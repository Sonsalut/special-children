import { FingerPrint } from 'network/subs/auth/AuthResponse';
import React from 'react';
import { MainScreens } from 'routers/ScreenNames';
import TouchID from 'react-native-touch-id';
import { store } from 'redux/store';
import authSlice from 'redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import NavigationService from 'routers/NavigationService';
import { Alert } from 'react-native';
import { useToast } from 'hooks/useToast';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import ResponseCode from 'network/ResponseCode';
import { resetShow, showIcon } from 'redux/storageWord/action';
import { useIsFocused } from '@react-navigation/native';

const useLogicMessage = () => {
    const refPopUp: any = React.useRef(null);

    const [supportedBio, setSupportedBio] = React.useState(true)
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const name = store.getState().authReducer.user.accountInfo
    const [confirmLogOut, setConfirmLogOut] = React.useState(false);
    const onPopUpClose = () => {
        console.log('closed modal')
        refPopUp.current?.close();
    }
    const showUp = () => {
        refPopUp.current?.open();
    }
    const isFocuse= useIsFocused()
    React.useEffect(() => {
      const fingerPrint = store.getState().authReducer.fingerPrint
      if(fingerPrint)
    {
      setIsSwitchOn(true)
     
    }
    }, [isFocuse])
    
    const optionalConfigObject = {
        title: "Authentication Required", // Android
        color: "#e00606", // Android,
        fallbackLabel: "Show Passcode" // iOS 
    }
    const onToggleSwitch = () => {
        if (!isSwitchOn) {
            TouchID.authenticate('', optionalConfigObject)
                .then((success: any) => {
                    dispatch(authSlice.actions.saveFingerPrint({ fingerPrint: !isSwitchOn }))
                    setIsSwitchOn(!isSwitchOn)
                    // console.log(isSwitchOn)
                })
                .catch(error => {
                    console.log("test error"),
                    Alert.alert('Thiết bị không được hỗ trợ tính năng vân tay')
                });
        }
        else {
            dispatch(authSlice.actions.saveFingerPrint({ fingerPrint: !isSwitchOn }))
            setIsSwitchOn(!isSwitchOn)
            // console.log(isSwitchOn)
        }
    };
    const dispatch = useDispatch();
    const showToast= useToast()

    const logOut = () => {
        setConfirmLogOut(true)
        showUp();
    }

    const cancelLogOut = async () => {
        setConfirmLogOut(false);
        onPopUpClose();
    }
    const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const handle =()=>{
    setVisible(!visible)
    setShow(!show);
  }
  const [gendervalue, setGenderValue] = React.useState();
  const [regionvalue, setRegionValue] = React.useState();
const getVoiceInfor= async()=>{
  const response= await RecordingAPI.GetVoiceInfor({

  })
  if(response.status === ResponseCode.SUCCESS)
  {
    console.log(response.data)
    setGenderValue(response.data?.voiceGender)
    setRegionValue(response.data?.voiceLocation)

  }
}
const PostVoiceInfor= async(gender, region)=>{
  const response= await RecordingAPI.PostVoiceInfor({
    voiceGender: gender,
    voiceLocation:region

  })
  if(response.status === ResponseCode.SUCCESS)
  {
   showToast("Thay đổi thành công","success")
   
   setVisible(!visible)
  setShow(!show);

  }
  else
  {
    showToast("ERROR","danger")
  }
}

const handleChangeInfor =()=>{
  PostVoiceInfor(gendervalue,regionvalue)
  
}
const [logOutvisible, setlogOutvisible] = React.useState(false)
const [logOutShow, setLogOutShow] = React.useState(false)


const [confirmsLogOut, setConfirmsLogOut] = React.useState(false);
const handleLogOut=()=>{
 
 setLogOutShow(true)
 setlogOutvisible(true)
}
const handleCancelLogOut=()=>{
       setLogOutShow(false);
      setlogOutvisible(false)
}
const cofirmHandleLogOut =()=>{
  dispatch(authSlice.actions.logout())
  dispatch(resetShow())
  NavigationService.navigate(MainScreens.AuthenticationNavigator)
  setlogOutvisible(false)
}
const handleReturn =()=>{
  setShow(false)
  setVisible(false)
}

    return {
        logOut, onToggleSwitch,
        refPopUp, name, setIsSwitchOn, isSwitchOn, onPopUpClose, confirmLogOut, cancelLogOut,
        show,setShow, visible,setVisible,
        handle,gendervalue,setGenderValue,regionvalue,setRegionValue,
        getVoiceInfor,
        PostVoiceInfor,
        handleChangeInfor,
        logOutvisible,setlogOutvisible,
        logOutShow,setLogOutShow,
        handleLogOut,
        handleCancelLogOut,
        cofirmHandleLogOut,
        handleReturn

    };
};

export { useLogicMessage };