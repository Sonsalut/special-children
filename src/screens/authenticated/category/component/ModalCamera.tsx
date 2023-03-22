import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Menu, Modal } from 'react-native-paper'
import { sizeHeight } from 'utils/Utils'

const ModalCamera = (props) => {
  return (
   <>
    <Modal

        visible={props.visible}
        style={{
          backgroundColor: '#E7F6FF',
          borderRadius: 15,
          height: 200,
          marginTop: sizeHeight(46),
          alignSelf: 'center',
          width: '90%',
          marginHorizontal: 20,

        }}
        onDismiss={props.onDismiss}
      >
        <Menu.Item titleStyle={{ fontSize: 18, color:'#2D5672' }} leadingIcon="camera" onPress={props.takePhoto} title="Chụp ảnh" />
        <Menu.Item titleStyle={{ fontSize: 18, color:'#2D5672' }} leadingIcon="store-settings" onPress={props.chooseImage} title="Chọn ảnh từ thư viện" />
        <Menu.Item titleStyle={{ color: 'red', fontSize: 18 }} leadingIcon="archive-cancel" onPress={props.cancel} title="Hủy bỏ" />
      </Modal>
      </>
  )
  
}

export default ModalCamera

const styles = StyleSheet.create({})