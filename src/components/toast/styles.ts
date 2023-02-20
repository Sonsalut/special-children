import { StyleSheet } from "react-native";
import colors from "res/colors";
import { fontSize, sizeWidth } from "utils/Utils";
export default StyleSheet.create({
  container: {
    marginVertical: sizeWidth(1),
    borderRadius: sizeWidth(2),
    width: '95%',
    shadowColor: '#AAAAAA',
    shadowOffset: {
      height: sizeWidth(1)/2,
      width: sizeWidth(1)/4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  nomalContainer: {
    backgroundColor: '#F2F2F2',
    borderLeftColor: '#787878',
    borderLeftWidth: sizeWidth(2),
  },
  successContainer: {
    backgroundColor: '#eafbf1',
    borderLeftColor: '#28C76F',
    borderLeftWidth: sizeWidth(2),
  },
  warningContainer: {
    backgroundColor: '#fff7e6',
    borderLeftColor: '#FFBB33',
    borderLeftWidth: sizeWidth(2),
  },
  dangerContainer: {
    backgroundColor: '#ffe6e6',
    borderLeftColor: '#FF4444',
    borderLeftWidth: sizeWidth(2),
  },
  infoContainer: {
    backgroundColor: '#ebf3f9',
    borderLeftColor: '#66A4D0',
    borderLeftWidth: sizeWidth(2),
  },
  icon: {
    padding: sizeWidth(1),
    paddingLeft: sizeWidth(3),
  },
  label: {
    flex: 1,
    paddingHorizontal: sizeWidth(1),
    paddingVertical: sizeWidth(1),
    fontSize: fontSize(3.5),
    color: colors.black,
    fontWeight: '500',
  }
})