import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, {useRef} from 'react'
import "react-native-gesture-handler";
// import { StatusBar } from 'react-native';
import { Modal } from 'react-native-paper';
import ReactNativeModal from 'react-native-modal';
import { sizeHeight, sizeWidth } from 'utils/Utils';
import TouchableOpacity from './button/TouchableOpacity';
import Swiper from 'react-native-swiper';



interface BottomSheetProps {
  visible?: boolean,
  onDismiss?: () => void,
  editCategory?: () => void,
  deleteCategory?: () => void,
  cancel?: () => void,
  onModalHide?: () => void,
  text?: string
}

const BottomSheet = ({
  visible = false,
  onDismiss,
  cancel,
  editCategory,
  deleteCategory,
  onModalHide,
  text
}:BottomSheetProps) => {
  return (
      <ReactNativeModal
        // hasBackdrop={false}
        backdropColor='transparent'
        coverScreen={false}
        isVisible={visible}
        style={styles.container}
        onDismiss={onDismiss}
        onModalHide={onModalHide}
        // onSwipeCancel={Swiper}
        
      >
        
        <View style={styles.buttonCarrier}>
          <TouchableOpacity
            style={styles.button}
            onPress={deleteCategory}
          >
            <Image
              source={require('../assets/images/trashbin.png')}
              style={styles.imageButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonCarrier}>
          <TouchableOpacity
            style={styles.button}
            onPress={editCategory}
          >
            <Image
              source={require('../assets/images/pencil.png')}
              style={styles.imageButton}
            />
          </TouchableOpacity>
        </View>
        

        {/* <Text>BottomSheet</Text> */}
      </ReactNativeModal>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  container: {
    // borderWidth:1,
    width: '100%',
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: sizeHeight(92),
    marginBottom: sizeHeight(-20)
  },
  buttonCarrier:{
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: sizeHeight(7),
    width: sizeWidth(40),
    marginBottom: sizeHeight(20),
    // borderWidth:1,
  },
  button:{
    width: sizeWidth(30),
    height: sizeHeight(5),
    borderRadius: 15,
    justifyContent: 'center',
    // borderWidth:1,
  },
  imageButton:{
    alignSelf: 'center',
    // borderWidth:1,
    maxHeight: sizeHeight(3),
    resizeMode: 'contain'
  }
})


