import { StyleSheet } from 'react-native';
import colors from 'res/colors';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';

export default StyleSheet.create({
  container: {

    backgroundColor: '#fff',
  },
  containerView: {
    width: '90%',
    height: 600,
    alignSelf: 'center',
    backgroundColor: '#E7F6FF',
    marginTop: 20,
    borderRadius: 25
  },
  iconImg: {
    width: 25, height: 25
  },
  text: {
    paddingLeft: 10,
    paddingTop: 2,
    fontSize: 18,
    color: 'black'
  },
  logText: {
    paddingLeft: 10,
    paddingTop: 2,
    fontSize: 18,
    color: 'red'
  },
  switch: {
    paddingBottom: 10,
    marginLeft: 30
  },
  view: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 15
  },
  modalVoice: {
    backgroundColor: '#E7F6FF',
    borderRadius: 15,
    height: 450,
    marginTop: sizeHeight(10),
    width: '90%',
    marginHorizontal: 20,
  },
  voiceView: {
    top: 0,
    alignItems: 'center',
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: 'space-around'
  },
  returnButton: {
    width: '90%',
    height: '8%'
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
    marginTop: 20,
    fontSize: 15,
    color: colors.black,
    width: '45%'
  },
  selectedGenderText: {
    fontSize: 15
  },
  regionView: {
    alignItems: 'center',
    width: "90%",
    height: "40%",
    borderRadius: 15,
    bottom: 20,
    flexDirection: 'row',
    paddingHorizontal: '15%'
  },
  selectedRegionText: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontSize: 15,
    color: colors.black,
    width: '45%'
  },
  changeButtonView: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    marginBottom: '5%'
  },
  changeButton: {
    height: '90%',
    width: '80%',
    borderRadius: 15,
    backgroundColor: '#ADDDDC',
    // borderWidth:1
    
  },
  confirmText: {
    alignSelf: 'center',
    fontSize: fontSize(5),
    color: '#2D5672',
    fontWeight: 'bold',
    paddingTop: '3%',
    // borderWidth:1

    
   
  },
  logoutModal: {
    backgroundColor: '#E7F6FF',
    borderRadius: 15,
    height: 200,
    marginTop: sizeHeight(25),
    width: '90%',
    marginHorizontal: 20,
  },
  logOutView: {
    top: 0,
    alignItems: 'center',
    width: "100%",
    height: "100%",
    borderRadius: 15,

    justifyContent: 'space-around'
  },
  warningIcon: {
    padding: sizeWidth(1),
    paddingLeft: sizeWidth(3)
  },
  warnText: {
    fontSize: 17, color: colors.black, fontWeight: '500', alignSelf: 'center'
  },
  buttonView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center'
  },
  closeButton: {
    width: '30%',
    height: 40,
    borderColor: colors.blue,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center'
  },
  logOutButton: {
    width: '30%',
    height: 40,
    backgroundColor: 'red',
    borderRadius: 12,
    justifyContent: 'center'
  },
  logOutText: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white'
  },
  closeText: {
    alignSelf: 'center',
    fontSize: 15,
    color:colors.blue}
  




});
