
import { Dimensions, StatusBar } from 'react-native';
import { Constants } from 'common/Constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width: screenWidth } = Dimensions.get('window');

export const ratioW = (widthData: number) => {
  return screenWidth * (widthData / Constants.WIDTH_CONSTANT_PORTRAIT);
};

export const sizeWidth = (value: number) => {
  return wp(value);
};
export const sizeHeight = (value: number) => {
  return hp(value);
};

export const fontSize = (value: number) => {
  return wp(value);
};

export const convertNumber = (number: number) => {
  if (number < 1000) {
    return number;
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return (number / 1000000).toFixed(1) + 'M';
};
export const CONTENT_STANDARD = sizeWidth(5);
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const getMime = (extension: string) => {
  if (!extension) {
      return null;
  }
  switch (extension.toLowerCase()) {
      case '.pdf':
          return 'application/pdf';
      case '.jpeg':
          return 'image/jpeg';
      case '.jpg':
          return 'image/jpg';
      case '.png':
          return 'image/png';
      default:
          return 'image/jpeg';
  }
};
export const getExtention = (path: string) => {
  return path.substring(path.lastIndexOf('.') + 1);
};

export const checkIpad = () => {
  const { height, width } = Dimensions.get('window');
  const aspectRatio = height / width;
  return aspectRatio >1.6 ? false : true
};
export const isPortrait = () => {
  const {height, width} = Dimensions.get('window');
  const orientation = height / width;
  return orientation < 1 ? false : true;
};