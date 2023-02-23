import {Platform, StyleSheet, View} from 'react-native';
import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import Modal from 'react-native-modal';
import {ratioW} from 'utils/Utils';
import colors from 'res/colors';
import Text from '../text/Text';
import PopUpManager from './PopUpManager';
import TouchableOpacity from 'components/button/TouchableOpacity';

export function showPopUp(infoData: InfoPopUpData) {
  const ref: any = PopUpManager.getDefault();
  if (ref) {
    ref?.current?.handleShowPopUp(infoData);
  }
}

interface InfoPopUpData {
  title?: string;
  description?: string;
  textButton1?: string;
  actionButton1?: () => void;
  textButton2: string;
  actionButton2?: () => void;
}

export interface PopUpRef {
  handleShowPopUp: (dataInfo: InfoPopUpData) => void;
}

const PopUp = forwardRef((props, ref: Ref<PopUpRef>) => {
  const [visible, setVisible] = useState(false);
  const [infoPopUp, setInfoPopUp] = useState<InfoPopUpData>({
    title: '',
    description: '',
    textButton1: '',
    actionButton1: () => {},
    textButton2: '',
    actionButton2: () => {},
  });

  useImperativeHandle(ref, () => ({
    handleShowPopUp,
  }));

  const handleShowPopUp = (infoData: InfoPopUpData) => {
    setInfoPopUp(infoData);
    setVisible(true);
  };

  const handleActionButton1 = () => {
    infoPopUp.actionButton1 && infoPopUp.actionButton1();
    setVisible(false);
  };

  const handleActionButton2 = () => {
    infoPopUp.actionButton2 && infoPopUp.actionButton2();
    setVisible(false);
  };

  return (
    <Modal
      isVisible={visible}
      statusBarTranslucent
      backdropOpacity={0.2}
      backdropColor={colors.black}>
      <View style={styles.content}>
        {infoPopUp.title && <Text style={styles.title}>{infoPopUp.title}</Text>}
        <Text style={styles.description}>{infoPopUp.description}</Text>
        {!!infoPopUp.textButton1 && !!infoPopUp.textButton2 && (
          <View style={styles.viewButtonHorizontal}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.button1Horizontal}
                onPress={handleActionButton1}>
                <Text style={[styles.textButton, {color: colors.violet}]}>
                  {infoPopUp.textButton1}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.button2Horizontal}
                onPress={handleActionButton2}>
                <Text style={[styles.textButton, {color: colors.white}]}>
                  {infoPopUp.textButton2}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!!infoPopUp.textButton1 && !infoPopUp.textButton2 && (
          <TouchableOpacity
            style={styles.viewButton}
            onPress={handleActionButton1}>
            <Text style={[styles.textButton, {color: colors.white}]}>
              {infoPopUp.textButton1}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
});

export default PopUp;

const styles = StyleSheet.create({
  content: {
    borderRadius: ratioW(15),
    marginHorizontal: ratioW(20),
    paddingVertical: ratioW(20),
    paddingHorizontal: ratioW(30),
    backgroundColor: colors.white,
  },
  title: {
    fontSize: ratioW(22),
    lineHeight: ratioW(33),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    letterSpacing: 0.25,
    marginBottom: ratioW(10),
    color: colors.text1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  description: {
    fontSize: ratioW(14),
    lineHeight: ratioW(21),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    letterSpacing: 0.25,
    color: colors.text2,
    marginBottom: ratioW(15),
    alignSelf: 'center',
    textAlign: 'center',
  },
  viewButtonHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ratioW(10),
  },
  button1Horizontal: {
    paddingVertical: ratioW(10),
    paddingHorizontal: ratioW(10),
    borderRadius: ratioW(50),
    alignSelf: 'flex-start',
  },
  button2Horizontal: {
    paddingVertical: ratioW(10),
    paddingHorizontal: ratioW(25),
    borderRadius: ratioW(50),
    alignSelf: 'flex-end',
    backgroundColor: colors.violet,
  },
  viewButton: {
    width: ratioW(120),
    paddingVertical: ratioW(10),
    borderRadius: ratioW(50),
    alignSelf: 'center',
    backgroundColor: colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: ratioW(14),
    lineHeight: ratioW(21),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    letterSpacing: 0.25,
    textAlign: 'center',
  },
});
