import { StyleSheet } from 'react-native';
import { isPortrait, sizeHeight, sizeWidth } from 'utils/Utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  wordModal: isPortrait() ? {
    alignSelf: 'center',
    backgroundColor: '#ADDDDC',
    borderRadius: 15,
    height: sizeHeight(70),
    marginTop: sizeHeight(10),
    width: sizeWidth(90),
    marginLeft: sizeWidth(5)
  } : {
    alignSelf: 'center',
    backgroundColor: '#ADDDDC',
    borderRadius: 15,
    width: sizeWidth(90),
    height: sizeWidth(80)
  }
});
