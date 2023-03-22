import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";

 export const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
          return true
        } else {
          console.log("Camera permission denied");
          return false
        }
      } catch (err) {
        console.warn(err);
        return false
      }
    }
    else if (Platform.OS === 'ios') {
      const granted = await request(PERMISSIONS.IOS.CAMERA);
      console.log('granted', granted);

      if (granted === 'granted') {
        console.log('Camera permission given');
        return true;
      }
      else {
        console.log('Camera permission denied');
        return false;
      }
    }
  };