import {showPopUp} from 'components';
import {Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import strings from 'res/strings';

export const requestCameraPermission = async (callback: () => void) => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  const checkPermission = await check(permission!!);
  switch (checkPermission) {
    case RESULTS.UNAVAILABLE:
      showPopUp({
        title: strings.permission.titleCamera,
        description: strings.permission.unavailableCamera,
        textButton2: strings.permission.accept,
      });
      break;
    case RESULTS.DENIED:
      const requestPermission = await request(permission!!);
      switch (requestPermission) {
        case RESULTS.GRANTED:
          callback();
          break;
        default:
          showPopUp({
            title: strings.permission.titleCamera,
            description: strings.permission.notPermissionCamera,
            textButton2: strings.permission.accept,
          });
          break;
      }
      break;
    case RESULTS.LIMITED:
      callback();
      break;
    case RESULTS.GRANTED:
      callback();
      break;
    case RESULTS.BLOCKED:
      showPopUp({
        title: strings.permission.titleCamera,
        description: strings.permission.notPermissionCamera,
        textButton1: strings.permission.cancel,
        textButton2: strings.permission.goToSetting,
        actionButton2: () => openSettings(),
      });
      break;
    default:
      showPopUp({
        title: strings.permission.titleCamera,
        description: strings.permission.notPermissionCamera,
        textButton2: strings.permission.accept,
      });
      break;
  }
};

export const requestMicrophonePermission = async (callback: () => void) => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  });
  const checkPermission = await check(permission!!);
  switch (checkPermission) {
    case RESULTS.UNAVAILABLE:
      showPopUp({
        title: strings.permission.titleMicrophone,
        description: strings.permission.unavailableMicrophone,
        textButton2: strings.permission.accept,
      });
      break;
    case RESULTS.DENIED:
      const requestPermission = await request(permission!!);
      switch (requestPermission) {
        case RESULTS.GRANTED:
          callback();
          break;
        default:
          showPopUp({
            title: strings.permission.titleMicrophone,
            description: strings.permission.notPermissionMicrophone,
            textButton2: strings.permission.accept,
          });
          break;
      }
      break;
    case RESULTS.LIMITED:
      callback();
      break;
    case RESULTS.GRANTED:
      callback();
      break;
    case RESULTS.BLOCKED:
      showPopUp({
        title: strings.permission.titleMicrophone,
        description: strings.permission.notPermissionMicrophone,
        textButton1: strings.permission.cancel,
        textButton2: strings.permission.goToSetting,
        actionButton2: () => openSettings(),
      });
      break;
    default:
      showPopUp({
        title: strings.permission.titleMicrophone,
        description: strings.permission.notPermissionMicrophone,
        textButton2: strings.permission.accept,
      });
      break;
  }
};
