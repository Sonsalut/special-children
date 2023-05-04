import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Menu, Modal } from 'react-native-paper'
import { checkIpad, fontSize, isPortrait, sizeHeight, sizeWidth } from 'utils/Utils'


interface ModalCameraProps {
  visible?: boolean,
  onDismiss?: ()=>void,
  takePhoto?: ()=>void,
  chooseImage?: ()=>void,
  cancel?: ()=>void,

}
const ModalCamera = ({
visible=false,
onDismiss,
chooseImage,
takePhoto,
cancel

}:ModalCameraProps) => {
  return (
   <>
    <Modal

        visible={visible}
        style={{
          backgroundColor: 'transparent',
          // backgroundColor: '#E7F6FF',
          borderRadius: 10,
          height: sizeHeight(20),
          marginTop: sizeHeight(40),
          width: isPortrait()? sizeWidth(80): sizeHeight(60),
          marginHorizontal: isPortrait()? sizeWidth(5) : sizeHeight(10.5),
        }}
        onDismiss={onDismiss}
        dismissable={false}
      >
        <View 
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
            // borderWidth:1,
            marginBottom: sizeHeight(1)
            // height: sizeHeight(13),
            // marginTop: sizeHeight(40),
            // width: isPortrait()? sizeWidth(80): sizeHeight(60),
            // marginHorizontal: isPortrait()? sizeWidth(5) : sizeHeight(10.5),
          }}
        >
          <Menu.Item 
            titleStyle={{alignSelf: 'center', fontSize: checkIpad()? fontSize(2.3) : fontSize(4), fontWeight: 'bold',color:'#1D3140',  }} 
            // leadingIcon="camera" 
            onPress={takePhoto} 
            title="Chụp ảnh" 
          />
          <Menu.Item 
            titleStyle={{alignSelf: 'center', fontSize: checkIpad()? fontSize(2.3) : fontSize(4), fontWeight: 'bold',color:'#1D3140' }} 
            // leadingIcon="store-settings" 
            onPress={chooseImage} 
            title="Chọn ảnh từ bộ sưu tập" 
          />
        </View>

        <View 
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center'
            // borderWidth:1
            // height: sizeHeight(6),
            // marginTop: sizeHeight(53),
            // width: isPortrait()? sizeWidth(80): sizeHeight(60),
            // marginHorizontal: isPortrait()? sizeWidth(5) : sizeHeight(10.5),
          }}
        >
          <Menu.Item 
            titleStyle={{alignSelf: 'center', color: '#76C3FF', fontWeight: 'bold', fontSize: checkIpad()? fontSize(2.3) : fontSize(4) }} 
            // leadingIcon="archive-cancel" 
            onPress={cancel} 
            title="HỦY" 
          />
        </View>

      </Modal>

      
      </>
  )
  
}

export default ModalCamera

const styles = StyleSheet.create({})