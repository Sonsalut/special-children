import { Image, ImageSourcePropType, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'
import TouchableOpacity from 'components/button/TouchableOpacity'
import Icon from 'react-native-vector-icons/Ionicons'
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils'
import ModalCamera from './ModalCamera'
import images from 'res/images'

interface AddEditModalProps {
  visible?: boolean,
  onDismiss?: () => void,
  cancel?: () => void,
  handleSubmit?: () => void,
  source?:any,
  defaultValue?: string,
  onChangeText?: (value: string) => void
  takePhoto?: () => void,
  chooseImage?: () => void,
  title?: string,
  cameraOptionsVisble?: boolean,
  handleChoiceCamera?: () => void,
  onModalCameraDismiss?: () => void,
  cancelModalCamera?: () => void,
  slogan:string
}

const AddEditModal = ({
  visible = false,
  onDismiss,
  cancel,
  handleSubmit,
  source,
  defaultValue,
  onChangeText,
  takePhoto,
  chooseImage,
  title,
  cameraOptionsVisble,
  handleChoiceCamera,
  onModalCameraDismiss,
  cancelModalCamera,
  slogan
  


}: AddEditModalProps) => {
  
  
  return (
    <Modal
      visible={visible}
      
      style={{
        backgroundColor: '#E7F6FF',
        borderRadius: sizeWidth(3),
        height: '70%',
        marginTop: sizeHeight(20),
        width: '90%',
        marginLeft: '5%',
        alignSelf:'center',
      }}
      onDismiss={onDismiss}
    >
      <ScrollView style={{ height: '100%',borderRadius:sizeWidth(3), }}>
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={82}
          style={{ width: '100%', height: '100%',  borderRadius:sizeWidth(3), alignSelf:'center' }}>
          {/* title */}
          <View style={{ width: '90%', height: sizeHeight(8), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={cancel}>
              <Text style={{ fontSize: fontSize(3.5), color: 'red' }}>Hủy bỏ</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: fontSize(4.5), color: '#2D5672', fontWeight: "400", paddingRight: 20 }}>{title}</Text>
            <TouchableOpacity isDoubleTap={true} onPress={handleSubmit}>
              <Icon name="checkmark-outline" size={sizeHeight(3)} />
            </TouchableOpacity>
          </View>
          {/* content */}
          <View style={{ width: '90%', justifyContent: 'space-around', height: sizeHeight(63), alignSelf: 'center', paddingBottom: 15, bottom: 15 }}>
            <TouchableOpacity onPress={handleChoiceCamera}>
              <View
                style={{
                  borderWidth: 1,
                  width: '90%',
                  borderRadius: sizeWidth(3),
                  alignSelf: 'center',
                  alignItems: 'center',
                  height: sizeHeight(40),
                  borderColor: '#60A2C8'
                }}>
                <Image
                  style={{
                    resizeMode: 'stretch',
                    height: '100%',
                    width: '100%',
                    borderRadius: sizeWidth(3),
                  }}
                  source={source}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: sizeHeight(10),
              }}>
              <Text
                style={{ fontSize: fontSize(3), color: '#2D5672' }}>{slogan} </Text>
              <TextInput
                style={{
                  height: sizeHeight(7),
                  width: '100%', 
                  borderWidth: 1,
                  paddingLeft: sizeWidth(3),
                  borderRadius: sizeWidth(2),
                  borderColor: '#60A2C8',
                  fontSize: fontSize(3)
                }}
                
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                maxLength={14}
                
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ModalCamera
        visible={cameraOptionsVisble}
        onDismiss={onModalCameraDismiss}
        takePhoto={takePhoto}
        chooseImage={chooseImage}
        cancel={cancelModalCamera}
      />
    </Modal>
  )
}

export default AddEditModal

const styles = StyleSheet.create({})