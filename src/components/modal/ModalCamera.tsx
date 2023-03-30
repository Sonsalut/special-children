import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Menu, Modal } from 'react-native-paper'
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils'


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
          // alignSelf: 'center',
          width: sizeWidth(80),
          marginHorizontal: sizeWidth(5),

        }}
        onDismiss={onDismiss}
        dismissable={false}
      >
        <Menu.Item titleStyle={{ fontSize: fontSize(2.3), color:'#2D5672' }} leadingIcon="camera" onPress={takePhoto} title="Chụp ảnh" />
        <Menu.Item titleStyle={{ fontSize: fontSize(2.3), color:'#2D5672' }} leadingIcon="store-settings" onPress={chooseImage} title="Chọn ảnh từ thư viện" />
        <Menu.Item titleStyle={{ color: 'red', fontSize: fontSize(2.3) }} leadingIcon="archive-cancel" onPress={cancel} title="Hủy bỏ" />
      </Modal>
      </>
  )
  
}

export default ModalCamera

const styles = StyleSheet.create({})