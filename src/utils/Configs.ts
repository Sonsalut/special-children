import { StyleSheet } from "react-native"
import { ToastOptions } from "react-native-toast-notifications/lib/typescript/toast";
import { Props } from "react-native-toast-notifications/lib/typescript/toast-container";
import colors from "res/colors"
import { sizeWidth, fontSize } from './Utils';

export const toastConfig: ToastOptions | Props = {
  type: 'normal',
  placement: 'top',
  duration: 1500,
  animationDuration: 300,
  animationType: 'slide-in',
  offset: sizeWidth(9),
  style: {
    backgroundColor: colors.grey,
    borderWidth: sizeWidth(0.3),
    borderColor: colors.violet,
    width: '90%'
  },
  textStyle: {
    color: "black",
    fontSize: fontSize(4.1),
  }
}
export const IntentSettingAndroidStrings = {
  battery: 'android.settings.BATTERY_SAVER_SETTINGS',
  loaction_source: 'android.settings.LOCATION_SOURCE_SETTINGS',
}