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
          backgroundColor: '#E7F6FF',
          borderRadius: 15,
          height: sizeHeight(20),
          marginTop: sizeHeight(40),
          width: isPortrait()? sizeWidth(80): sizeHeight(60),
          marginHorizontal: isPortrait()? sizeWidth(5) : sizeHeight(10.5),
        }}
        onDismiss={onDismiss}
        dismissable={false}
      >
        <Menu.Item titleStyle={{ fontSize: checkIpad()? fontSize(2.3) : fontSize(4), color:'#2D5672' }} leadingIcon="camera" onPress={takePhoto} title="Chụp ảnh" />
        <Menu.Item titleStyle={{ fontSize: checkIpad()? fontSize(2.3) : fontSize(4), color:'#2D5672' }} leadingIcon="store-settings" onPress={chooseImage} title="Chọn ảnh từ thư viện" />
        <Menu.Item titleStyle={{ color: 'red', fontSize: checkIpad()? fontSize(2.3) : fontSize(4) }} leadingIcon="archive-cancel" onPress={cancel} title="Hủy bỏ" />
      </Modal>
      </>
  )
  
}

export default ModalCamera

const styles = StyleSheet.create({})