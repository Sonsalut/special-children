import { StyleSheet } from 'react-native';
import colors from 'res/colors';
import { fontSize, isPortrait, ratioW, sizeHeight, sizeWidth } from 'utils/Utils';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    flex: 1, 
    width: '100%',
  },

  mainView: {
    height: isPortrait() ? sizeHeight(95) : '100%',
    width: isPortrait() ? '95%' : '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderWidth: 1,
    // bottom: 5,
    borderColor: '#2D5672',
    borderRadius: 15,
    width: sizeWidth(80),
    backgroundColor: 'white',
    height: sizeHeight(6),
    marginVertical: 5,
  },
  categoryCards: {
    width: sizeWidth(42),
    height: sizeHeight(25),
    borderRadius: 10,
    marginHorizontal: 9,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#C1EBEA',
    paddingTop: 5,

  },
  imageCategory: {
    resizeMode: 'stretch',
    height: '80%',
    width: '80%',
    alignSelf: 'center',
    marginTop: '1%',
    borderRadius: sizeWidth(3),
    
  },
  categoryText: {
    fontSize: fontSize(4.5),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: '3.5%',
    color: '#2D5672'
  },
  flatListStyle: isPortrait() ? {
    paddingBottom: sizeHeight(10),
  }
  : {
    paddingBottom: sizeHeight(10),
    paddingLeft: '17%',
    width: sizeHeight(100),
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
    width: sizeHeight(70),
    height: sizeWidth(80),
    marginLeft: sizeHeight(15)
  }
});
