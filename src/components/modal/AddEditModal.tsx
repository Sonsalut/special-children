import { Image, ImageSourcePropType, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Modal, shadow } from 'react-native-paper'
import TouchableOpacity from 'components/button/TouchableOpacity'
import Icon from 'react-native-vector-icons/Ionicons'
import { checkIpad, fontSize, isPortrait, sizeHeight, sizeWidth } from 'utils/Utils'
import ModalCamera from './ModalCamera'
import images from 'res/images'
import Spinner from 'react-native-spinkit'
import colors from 'res/colors'
import style from 'screens/authenticated/join-word/style'

interface AddEditModalProps {
  visible?: boolean,
  onDismiss?: () => void,
  cancel?: () => void,
  handleSubmit?: () => void,
  source?: any,
  defaultValue?: string,
  onChangeText?: (value: string) => void
  takePhoto?: () => void,
  chooseImage?: () => void,
  title?: string,
  cameraOptionsVisble?: boolean,
  handleChoiceCamera?: () => void,
  onModalCameraDismiss?: () => void,
  cancelModalCamera?: () => void,
  slogan: string,
  isLoading?: boolean
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
  slogan,
  isLoading = false

}: AddEditModalProps) => {

  return (
    <Modal
      visible={visible}
      style={styles.mainModal}
      onDismiss={onDismiss}
      dismissable={false}
    >
      <ScrollView
        style={{
          height: '100%',
          borderRadius: sizeWidth(3),
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* loading animation */}
        {
          isLoading
            ?
            (
              <View style={styles.modalDisableView}>
                <Spinner
                  style={styles.spinnerStyle}
                  isVisible={isLoading}
                  type='Circle'
                  color='#60A2C8'
                  size={fontSize(20)}
                />
              </View>
            )
            : null
        }
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={82}
          style={styles.keyAvoidStyle}
        >
          {/* <View 
            style={styles.modalTilteStyle}
          >
            <TouchableOpacity onPress={cancel}>
              <Text style={{ fontSize: fontSize(3.5), color: 'red' }}>Hủy bỏ</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: fontSize(4.5), color: '#2D5672', fontWeight: "400", paddingRight: 20 }}>{title}</Text>
            <TouchableOpacity isDoubleTap={true} onPress={handleSubmit}>
              <Icon name="checkmark-outline" size={sizeHeight(3)} />
            </TouchableOpacity>
          </View> */}

          <View
            style={styles.modalItemWrapper}
          >
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
              }}
              isDoubleTap={true}
              onPress={handleChoiceCamera}>
              <View
                style={styles.takePic}>
                {
                  source ?
                    (<Image
                      style={{
                        resizeMode: 'stretch',
                        height: '100%',
                        width: '100%',
                        borderRadius: 180,
                      }}
                      source={source}
                    />) : (
                      <Icon color={'#60A2C8'} style={{ alignSelf: 'center' }} name='camera-outline' size={fontSize(25)} />
                    )
                }
              </View>
            </TouchableOpacity>
            <View
              style={styles.textBoxWithTitle}
            >
              {/* <Text
                style={{ fontSize: checkIpad() ? fontSize(3) : fontSize(3.5), color: '#2D5672' }}>{slogan} </Text> */}
              <TextInput
                style={styles.textBoxStyle}
                defaultValue={defaultValue}
                placeholder={slogan}
                onChangeText={onChangeText}
                maxLength={14}

              >
                {/* <Image soure=/> */}
              </TextInput>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingTop: sizeHeight(2)
                }}>
                <TouchableOpacity
                  style={{
                    height: sizeHeight(5),
                    width: sizeHeight(5),
                    borderRadius: 180, backgroundColor: '#CCF6C8'
                  }}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: sizeHeight(5),
                    width: sizeHeight(5),
                    borderRadius: 180, backgroundColor: '#C7E9F1'
                  }}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: sizeHeight(5),
                    width: sizeHeight(5),
                    borderRadius: 180, backgroundColor: '#E6E6FA'
                  }}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: sizeHeight(5),
                    width: sizeHeight(5),
                    borderRadius: 180, backgroundColor: '#6BEEA9'
                  }}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: sizeHeight(5),
                    width: sizeHeight(5),
                    borderRadius: 180, backgroundColor: '#8D8DE8'
                  }}></TouchableOpacity>
              </View>

              <View
                style={styles.buttonView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.closeButton}
                  onPress={cancel}
                >
                  <Text style={styles.closeText}>Đóng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.confirmButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.logOutText}>Xác nhận</Text>
                </TouchableOpacity>
              </View>


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

const styles = StyleSheet.create({
  mainModal: isPortrait() ? {
    // backgroundColor: '#E7F6FF',
    backgroundColor: '#F8F8FF',
    borderRadius: sizeWidth(3),
    height: '60%',
    marginTop: sizeHeight(20),
    width: '90%',
    marginLeft: '5%',
    alignSelf: 'center',
    overflow: 'hidden',
    // borderWidth:1
  } : {
    backgroundColor: '#E7F6FF',
    borderRadius: sizeWidth(3),
    height: sizeWidth(90),
    marginTop: sizeWidth(5),
    width: '80%',
    marginLeft: '10%',
    alignSelf: 'center',
    overflow: 'hidden',
  },

  modalDisableView: {
    backgroundColor: colors.blackWithOpacity(0.2),
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinnerStyle: {
    position: 'absolute',
    top: sizeHeight(25)
  },

  modalTilteStyle: {
    width: '90%',
    height: sizeHeight(8),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalItemWrapper: isPortrait() ? {
    width: '90%',
    justifyContent: 'space-around',
    height: sizeHeight(50),
    alignSelf: 'center',
    paddingBottom: sizeHeight(5),
    paddingTop:sizeHeight(1)
    // bottom: 15 , 
    // borderWidth: 1
  } : {
    width: '90%',
    justifyContent: 'space-around',
    height: sizeHeight(60),
    alignSelf: 'center',
  },

  takePic: {
    // borderWidth: 1,
    width: sizeWidth(65),
    height: sizeWidth(65),
    borderRadius: 180,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#60A2C8',
    backgroundColor: '#C7E9F1'

    // marginBottom: isPortrait() ? null : '-10%'
  },


  textBoxWithTitle: {
    width: '100%',
    alignSelf: 'center',
    height: sizeHeight(7),
    // borderWidth:1
  },

  textBoxStyle: {
    height: sizeHeight(6),
    width: '100%',
    borderWidth: 1,
    paddingLeft: sizeWidth(3),
    borderRadius: sizeWidth(2),
    borderColor: '#60A2C8',
    fontSize: fontSize(3),
  },


  keyAvoidStyle: {
    width: '100%',
    height: isPortrait() ? '100%' : sizeWidth(90),
    borderRadius: sizeWidth(3),
    alignSelf: 'center',
  },
  buttonView: {
    width: '95%',
    height: sizeHeight(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: sizeHeight(3),
    marginTop: sizeHeight(2),
    // borderWidth:1
  },
  logOutText: {
    alignSelf: 'center',
    fontSize: checkIpad() ? fontSize(2) : 15,
    color: 'white'
  },
  closeText: {
    alignSelf: 'center',
    fontSize: checkIpad() ? fontSize(2) : 15,
    color: colors.red
  },
  closeButton: {
    width: '40%',
    marginRight: '20%',
    height: sizeHeight(4.5),
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: sizeHeight(1),
    justifyContent: 'center',

  },
  confirmButton: {
    width: '40%',
    height: sizeHeight(4.5),
    backgroundColor: 'orange',
    borderRadius: sizeHeight(1),
    justifyContent: 'center'
  },
});