import { StyleSheet } from 'react-native';
import colors from 'res/colors';
import { checkIpad, fontSize, sizeHeight, sizeWidth } from 'utils/Utils';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  containerView: {
    width: checkIpad() ? sizeWidth(80) : sizeWidth(90),
    height: sizeHeight(50),
    alignSelf: 'center',
    // backgroundColor: '#E7F6FF',
    backgroundColor: '#C7EAFF',
    paddingTop: sizeHeight(2),
    marginTop: sizeHeight(2.5),
    borderRadius: 25
  },

// SETTING OPTIONS
  iconImg: {
    width: sizeHeight(3), 
    height: sizeHeight(3)
  },
  text: {
    paddingLeft: sizeWidth(2.5),
    paddingTop: 2,
    fontSize: checkIpad()? fontSize(3) : fontSize(4.5),
    color: 'black',
  },
  logText: {
    paddingLeft: sizeWidth(2.5),
    paddingTop: 2,
    fontSize: checkIpad()? fontSize(3) : fontSize(4.5),
    color: 'red'
  },
  switch: checkIpad() ? {
    marginLeft: sizeWidth(28),
    
  } : {
    marginLeft: sizeWidth(9)
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizeHeight(5),
    paddingHorizontal: sizeWidth(5),
  },


// VOICE SETTING MODAL
  modalVoice: checkIpad() ? {
    backgroundColor: 'white',
    borderRadius: sizeHeight(3),
    height: sizeHeight(50),
    marginTop: sizeHeight(10),
    width: sizeWidth(70),
    marginLeft: sizeWidth(15)
  } : {
    backgroundColor: 'white',
    borderRadius: sizeHeight(3),
    width: sizeWidth(100),
    alignSelf: 'center',
    marginTop: sizeHeight(55),
    marginBottom: sizeHeight(-10),
    paddingBottom: sizeHeight(12)
  },
  voiceView: {
    alignItems: 'center',
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: 'space-around'
  },
  voiceTitle: {
    width: '90%',
    height: sizeHeight(6),
    justifyContent: 'center',
    borderBottomColor: '#1D3140',
    borderBottomWidth: 1
  },
  returnButton: {
    width: '90%',
    height: '10%',
    
    // borderWidth:1
  },
  genderView: {
    // bottom: 20,
    alignItems: 'center',
    width: "90%",
    height: "25%",
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: '15%',
    marginTop: sizeHeight(-2),
    // borderWidth:1
  },
  genderText: {
    alignSelf: 'flex-start',
    marginTop: sizeHeight(2),
    fontSize: checkIpad()? fontSize(3):fontSize(4),
    color: colors.black,
    width: '45%',
  },
  radioButtonGroup:{
    borderWidth:1,
    height: 10
  },
  selectedGenderText: {
    fontSize: checkIpad()? fontSize(3):fontSize(4),
    width: sizeWidth(30),
    height: sizeHeight(4),
    paddingTop: checkIpad() ? sizeHeight(2.3) : sizeHeight(1),
    // borderWidth:1
  },
  regionView: {
    alignItems: 'center',
    width: "90%",
    height: "35%",
    borderRadius: 15,
    // bottom:20,
    flexDirection: 'row',
    paddingHorizontal: '15%',
    marginTop: sizeHeight(-1),
    // borderWidth:1
  },
  
  selectedRegionText: {
    alignSelf: 'flex-start',
    marginTop: sizeHeight(2),
    fontSize: checkIpad()? fontSize(3):fontSize(4),
    color: colors.black,
    width: '45%',
    // borderWidth:1
  },
  changeButtonView: {
    width: sizeWidth(60),
    height: sizeHeight(5),
    alignItems: 'center',
    marginBottom: '1%',
  },
  changeButton: {
    height: '90%',
    width: checkIpad() ? '60%' : '80%',
    borderRadius: 20,
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowOpacity: 1,
    shadowColor: 'grey',
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 }

  },
  confirmText: {
    alignSelf: 'center',
    fontSize: checkIpad()? fontSize(3):fontSize(3.5),
    color: 'white',
    fontWeight: 'bold',
  },

});
