import { StyleSheet } from 'react-native';
import colors from 'res/colors';
import { fontSize, ratioW, sizeHeight, sizeWidth } from 'utils/Utils';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    flex: 1, 
    width: '100%',
  },

  mainView: {
    height: sizeHeight(95),
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop:sizeHeight(2),
    
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
  }
});
