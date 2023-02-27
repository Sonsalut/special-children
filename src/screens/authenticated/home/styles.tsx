import { StyleSheet } from 'react-native';
import colors from 'res/colors';
import { ratioW, sizeHeight } from 'utils/Utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'colors.white,'
    
  },
  header: {
    borderBottomWidth: ratioW(1),
    borderColor: colors.light_violet,
    
  },
  titleHeader: {
    alignSelf: 'flex-start',
  },
  separator: {
    height: ratioW(8),
    backgroundColor: colors.light_violet,
  },
  itemView: {
    width: '30%',
    height: sizeHeight(20),
    borderRadius: sizeHeight(2),

  }
});
