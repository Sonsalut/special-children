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
    alignItems: 'center',

  },
  searchBar: {
    height: 40,
    width: sizeWidth(80),
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 15

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
  }
});
