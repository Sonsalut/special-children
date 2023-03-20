import { StyleSheet } from 'react-native';
import colors from 'res/colors';
import { fontSize, ratioW, sizeHeight, sizeWidth } from 'utils/Utils';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white', flex: 1, width: '100%'

  },

  mainView: {
    height: sizeHeight(90),
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center'

  },
  searchBar: {
    height: 40,
    width: sizeWidth(80),
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 2

  },
  categoryCards: {
    width: sizeWidth(40),
    height: sizeHeight(25),
    borderRadius: 10,
    marginHorizontal: 9,
    alignSelf: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#C1EBEA',
    paddingTop: 5,

  },
  imageCategory: {
    resizeMode: 'contain',
    height: '80%',
    width: '100%',
    marginTop: '1%',
    borderRadius: sizeWidth(3),
    
  },
  categoryText: {
    fontSize: fontSize(5),
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#2D5672'
  }
});
