import * as ImagePicker from 'react-native-image-picker';

export const IMAGE_LIBRARY_OPTION: any = {
    mediaType: 'photo',
    selectionLimit: 1,
    includeBase64: true
  };

  export const CAMERA_OPTION: ImagePicker.CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    includeBase64: true,
    // maxWidth: 1024,
    // maxHeight: 1024,
    quality: 0.5,
    

  };