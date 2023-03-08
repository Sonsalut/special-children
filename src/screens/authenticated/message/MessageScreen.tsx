import React from 'react';
import {Container, Text, PopUp} from 'components';
import {Routes, StackNavigationProps} from 'routers/Navigation';
import {AuthenticatedScreens, AuthenticationScreens, MainScreens} from 'routers/ScreenNames';
import { DevSettings, TouchableOpacity, View, Image,} from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import colors from 'res/colors';
import {store} from 'redux/store';
import { useLogicLogin } from 'screens/authentication/login/useLogicLogin';
import { useLogicMessage } from './useLogicMessage';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import { Modal, RadioButton } from 'react-native-paper';
import RecordingAPI from 'network/subs/auth/recording/RecordingAPI';
import ResponseCode from 'network/ResponseCode';
import { useToast } from 'hooks/useToast';
import ToastCustom from 'components/toast/ToastCustom';
import NavigationService from 'routers/NavigationService';
import { useDispatch } from 'react-redux';
import authSlice from 'redux/slice/authSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const MessageScreen = ({}: StackNavigationProps<
  Routes,
  AuthenticatedScreens.MessageScreen
>) => {
  const { logOut, 
    
    onToggleSwitch, cancelLogOut,
    refPopUp, name, setIsSwitchOn, isSwitchOn, onPopUpClose, confirmLogOut, setConfirmLogOut } = useLogicMessage();
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
React.useEffect(() => {
  getVoiceInfor()

 
}, [])
const showToast= useToast()
const handleChangeInfor =()=>{
  PostVoiceInfor(gendervalue,regionvalue)
  
}
const [logOutvisible, setlogOutvisible] = React.useState(false)
const [logOutShow, setLogOutShow] = React.useState(false)

const dispatch= useDispatch()
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
  NavigationService.navigate(MainScreens.AuthenticationNavigator)
}
const handleReturn =()=>{
  setShow(false)
  setVisible(false)
}
  return (
    <Container style={{backgroundColor: 'white'}}>
      <View style={{width: '90%', height: 600, alignSelf: 'center', backgroundColor:'#E7F6FF', marginTop: 20, borderRadius: 25}}>
        {/* Touch ID on/off */}
        <View style={{flexDirection: 'row', paddingTop: 20, paddingHorizontal: 15}}>
          <Image
            source={require('../../../assets/images/fingerprint.png')}
            style={{ width: 25, height: 25}}
          />
          <Text style={{paddingLeft: 10, paddingTop: 2, fontSize: 18, color:'black'}}>Đăng nhập bằng vân tay</Text>
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
          <TouchableOpacity activeOpacity={0.7} onPress={handle} style={{flexDirection: 'row'}} >
            <Image
              source={require('../../../assets/images/voice.png')}
              style={{ width: 25, height: 25}}
            />
            <Text style={{paddingLeft: 10, paddingTop: 2, fontSize: 18, color: 'black'}}>Giọng đọc</Text>
          </TouchableOpacity>
        </View>

        {/* Sign out button */}
        <View style={{flexDirection: 'row', paddingTop: 20, paddingHorizontal: 15}}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleLogOut}>
            <Image
              source={require('../../../assets/images/logout.png')}
              style={{ width: 25, height: 25}}
            />
            <Text style={{paddingLeft: 10, paddingTop: 2, fontSize: 18, color: 'red'}}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        {/* Popups shows */}
        <Modal
                    visible={visible}
                    style={{
                        backgroundColor:'#E7F6FF',
                        borderRadius: 15,
                        height: 450,
                        marginTop: sizeHeight(10),
                        width:'90%',
                        marginHorizontal:20,
                    }}
                    onDismiss={() => {
                        setShow(false)
                        setVisible(false)
                    }}
                >            
                    <View style={{
                        top: 0,
                        alignItems: 'center',
                        width:"100%",
                        height:"100%", 
                        borderRadius: 15,
                        justifyContent:'space-around'        
                    }}>
                      <TouchableOpacity onPress={handleReturn} style={{width:'90%', height:'8%'}}>
                      <Icon name='arrow-back-outline' size={25}/>

                      </TouchableOpacity>
                      {/* gender choice */}
                      <View style={{
                        bottom:20,
                        alignItems: 'center',
                        width:"90%",
                        height:"30%", 
                        borderRadius: 15 ,
                        flexDirection:'row',
                        paddingHorizontal:'15%'            
                    }}>
                      
                      <Text style={{alignSelf:'flex-start', marginTop:20, fontSize:15, color:colors.black, width:'45%'}}>Giới tính:</Text>
 <RadioButton.Group   onValueChange={value => setGenderValue(value)} value={gendervalue}>
  
      <RadioButton.Item  label="Nam" value="MALE" labelStyle={{fontSize:15}} />
      <RadioButton.Item  label="Nữ" value="FEMALE"labelStyle={{fontSize:15}} />
    </RadioButton.Group>
                      </View>
                      {/* Regionchoice */}
                      <View style={{
                        alignItems: 'center',
                        width:"90%",
                        height:"40%", 
                        borderRadius: 15 ,
                        bottom:20,
                        flexDirection:'row',
                        paddingHorizontal: '15%'           
                    }}>
                      <Text style={{alignSelf:'flex-start', marginTop:10, fontSize:15, color:colors.black, width: '45%'}}>Vùng miền:</Text>
 <RadioButton.Group  onValueChange={value => setRegionValue(value)} value={regionvalue}>
  
      <RadioButton.Item label="Bắc" value="NORTHERN" labelStyle={{fontSize:15}} />
      <RadioButton.Item label="Trung" value="MIDDLE"labelStyle={{fontSize:15}} />
      <RadioButton.Item label="Nam" value="SOUTHERN"labelStyle={{fontSize:15}} />
    </RadioButton.Group>
                      </View>
                        
                       <View style={{width:'80%', height:50, alignItems: 'center', marginBottom: '5%'}}>
                        <TouchableOpacity 
                          style={{
                            height: '90%', 
                            width: '80%',
                            borderRadius:15,
                            backgroundColor: '#ADDDDC'}} 
                          onPress={handleChangeInfor} 
                          activeOpacity={0.7}>
                          <Text 
                            style={{alignSelf:'center', fontSize:18, color:'#2D5672', fontWeight: 'bold', paddingTop:'5%'}}>Xác nhận
                          </Text>
                        </TouchableOpacity>
                       </View>
                    </View>

                </Modal>
                <Modal
                    visible={logOutvisible}
                    style={{
                        backgroundColor:'#E7F6FF',
                        borderRadius: 15,
                        height: 200,
                        marginTop: sizeHeight(25),
                        width:'90%',
                        marginHorizontal:20,
                    }}
                    // onDismiss={() => {
                    //     setLogOutShow(false);
                    //     setlogOutvisible(false)
                    // }}
                >            
                    <View style={{
                        top: 0,
                        alignItems: 'center',
                        width:"100%",
                        height:"100%", 
                        borderRadius: 15 ,
                        
                        justifyContent:'space-around'        
                    }}>
                      <Icon name={'warning-outline'}
        size={sizeWidth(8)}
        color={"#FF4444"}
        style={{padding: sizeWidth(1),
          paddingLeft: sizeWidth(3),}} />
          <View style={{width:'90%', height:50}}>
          <Text style={{fontSize:17, alignSelf:'center', color:colors.black, fontWeight:'500'}}>Bạn có chắc chắn muốn đăng xuất</Text>
          <Text style={{fontSize:17, color:colors.black, fontWeight:'500', alignSelf:'center'}}>không?</Text>


          </View>
                      <View style={{width:'100%', height:60, flexDirection:'row', justifyContent:"space-around", alignItems:'center'}}>
                      <TouchableOpacity activeOpacity={0.7} onPress={handleCancelLogOut} style={{width:'30%', height:40,borderColor:colors.blue, borderWidth:1, borderRadius:12, justifyContent:'center'}}>
                        <Text style={{alignSelf:'center',fontSize:15, color:colors.blue}}>Đóng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} onPress={cofirmHandleLogOut} style={{width:'30%', height:40,backgroundColor:'red',borderRadius:12,justifyContent:'center'}}>
                        <Text style={{alignSelf:'center', fontSize:15, color:'white'}}>Đăng xuất</Text>
                      </TouchableOpacity>
                      </View>
                      
                      
                    </View>

                </Modal>
                
      </View>
    </Container>
  );
};

 

export default MessageScreen;
