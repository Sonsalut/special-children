import {ratioW, sizeHeight, sizeWidth} from 'utils/Utils';
import {Platform, StyleSheet} from 'react-native';
import colors from 'res/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center', 
    flex: 1, 
    justifyContent: 'flex-end',
    marginTop: '-15%'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  superChildren:{
    height: sizeHeight(100),
    width: sizeWidth(90),
    paddingBottom: sizeHeight(5),
    justifyContent: 'flex-end'
  },

  fingerPrintOpacity: {
    marginTop: sizeHeight(3.5),
    alignItems: 'center',
    borderRadius: 45,
    height: sizeHeight(8),
    width: sizeWidth(12),
  },
  
  viewEmptyBackground: {
    height: ratioW(332),
    backgroundColor: colors.transparent,
  },
  form: {
    top: ratioW(-20),
    width: ratioW(375),
    paddingHorizontal: ratioW(32),
    paddingVertical: ratioW(15),
    borderTopRightRadius: ratioW(20),
    borderTopLeftRadius: ratioW(20),
    height: sizeHeight(48),
    alignSelf: 'center',
  },
  viewTextInput: {
    marginBottom: ratioW(18),
  },
  viewBottom: {
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  textForgotPassword: {
    fontSize: ratioW(16),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    lineHeight: ratioW(24),
    color: colors.violet,
    marginBottom: ratioW(30),
  },
  buttonLogin: {
    marginTop: sizeHeight(2.5),
    width: sizeWidth(75),
    alignSelf: 'center'

  },
  viewLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ratioW(14),
  },
  line: {
    width: ratioW(60),
    height: ratioW(1),
    backgroundColor: colors.text1,
  },
  textLine: {
    fontSize: ratioW(14),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    lineHeight: ratioW(21),
    color: colors.violet,
    marginHorizontal: ratioW(12),
  },
  viewButtonGoogle: {
    width: ratioW(50),
    height: ratioW(50),
    borderRadius: ratioW(25),
    borderWidth: ratioW(1),
    borderColor: colors.text1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ratioW(15),
  },
  notAccountText: {
    fontSize: ratioW(16),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    lineHeight: ratioW(24),
    color: colors.text1,
  },
  registerText: {
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: colors.violet,
  },
  licenseText: {
    width: ratioW(230),
    textAlign: 'center',
    fontSize: ratioW(14),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    lineHeight: ratioW(21),
    color: colors.text2,
    marginTop: ratioW(30),
    marginBottom: ratioW(20),
  },
});
