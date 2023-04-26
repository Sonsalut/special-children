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
    backgroundColor: '#E7F6FF',
    borderRadius: sizeHeight(3),
    height: sizeHeight(50),
    marginTop: sizeHeight(10),
    width: sizeWidth(70),
    marginLeft: sizeWidth(15)
  } : {
    backgroundColor: '#E7F6FF',
    borderRadius: sizeHeight(3),
    height: sizeHeight(60),
    marginTop: sizeHeight(10),
    width: sizeWidth(80),
    marginLeft: sizeWidth(10),
  },
  voiceView: {
    alignItems: 'center',
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: 'space-around'
  },
  returnButton: {
    width: '90%',
    height: '8%',
  },
  genderView: {
    bottom: 20,
    alignItems: 'center',
    width: "90%",
    height: "30%",
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: '15%'
  },
  genderText: {
    alignSelf: 'flex-start',
    marginTop: sizeHeight(2),
    fontSize: checkIpad()? fontSize(3):fontSize(4),
    color: colors.black,
    width: '45%',
  },
  selectedGenderText: {
    fontSize: checkIpad()? fontSize(3):fontSize(4),
    width: sizeWidth(12),
    height: sizeHeight(5),
    paddingTop: checkIpad() ? sizeHeight(2.3) : sizeHeight(1),

  },
  regionView: {
    alignItems: 'center',
    width: "90%",
    height: "40%",
    borderRadius: 15,
    bottom:20,
    flexDirection: 'row',
    paddingHorizontal: '15%',
  },
  
  selectedRegionText: {
    alignSelf: 'flex-start',
    marginTop: sizeHeight(2),
    fontSize: checkIpad()? fontSize(3):fontSize(4),
    color: colors.black,
    width: '45%',
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
    borderRadius: 15,
    backgroundColor: '#ADDDDC',
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
    color: '#2D5672',
    fontWeight: 'bold',
  },

});
