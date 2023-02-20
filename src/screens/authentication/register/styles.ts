import { ratioW, sizeHeight } from 'utils/Utils';
import { Platform, StyleSheet } from 'react-native';
import colors from 'res/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  textInput: {
    height: sizeHeight(6),
    borderRadius:0,
    alignSelf:'center',
    width:'90%'
  }
});
