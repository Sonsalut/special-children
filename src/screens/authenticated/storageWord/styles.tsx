import BigCardWithShield from "components/cards/BigCardWithShield";
import { StyleSheet } from "react-native";
import colors from "res/colors";
import { checkIpad, isPortrait, fontSize, sizeHeight, sizeWidth } from "utils/Utils";

export default StyleSheet.create({

//styling for "Storage screen"

    container: {
        backgroundColor: 'white', 
        flex: 1
    },
    wordListContainer: {
        alignSelf: 'center',
        height: isPortrait() ? sizeHeight(94) : '100%',
        width: '95%',
        alignItems: 'center',
        paddingBottom: sizeHeight(5),
    },
    searchbar: {
        borderWidth: 1,
        borderColor: colors.text_blue,
        borderRadius: sizeWidth(10),
        width: sizeWidth(60),
        backgroundColor: colors.search_bgr,
        height: sizeHeight(5),
        marginVertical: 5,
      },
    
    titleView: checkIpad() ? 
    {
        // marginBottom: sizeHeight(2),
        borderRadius: 25,
        // backgroundColor: '#E7F6FF',
        paddingLeft: sizeWidth(3),
        paddingRight: sizeWidth(3),
        height: sizeHeight(26),
        
    }
    :{
        // marginBottom: 22,
        // paddingBottom: 15,
        borderRadius: 15,
        // backgroundColor: '#E7F6FF',
        paddingLeft: 10,
        height: sizeHeight(26),
    },

    cateView: {
        width: sizeWidth(90),
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: -3,
        marginTop: 8,
        alignSelf: 'center',
        
    },
    cateText: {
        fontSize: checkIpad() ? fontSize(4) : 18,
        // color: '#897666',
        color: colors.text_blue,
        // fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: sizeHeight(1)
    },
    wordview: {
        flexDirection: 'row',
        height: sizeHeight(21),
        width:'100%',
        alignItems: 'center',
    },
    wordVsCheckboxView: {
        flexDirection: 'row',
        width: sizeWidth(30),
        height: sizeHeight(19),
    },

    cardView: {
        backgroundColor: '#C1EBEA',
        alignSelf: 'center',
        width: sizeWidth(25),
        marginHorizontal: 5,
        borderRadius: sizeWidth(2),
        height: checkIpad()? sizeHeight(18) : sizeHeight(17.3),
    },
    wordImage: {
        marginTop: '3.5%',
        resizeMode: 'stretch',
        height: sizeHeight(12.5), width: sizeWidth(20),
        alignSelf: 'center',
        borderRadius: 10
    },
    wordText: {
        fontSize: fontSize(3.8),
        color: '#2D5672',
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: '3%'
    },
    checkbox: checkIpad()?{
        right: 20,
        top:2,
        height: 20,
    }
    : {
        right: 20,
        top:2,
        height: 20,
    },
    resultSearchView: {
        width: sizeWidth(90),
        paddingTop: 15,
        height: sizeHeight(85),
        alignSelf: 'center',
    },

    //styling for "StorageWord Screen"

    storageView: {
        width: '100%',
        height: '92%',
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },

      flatListStyle: isPortrait() ? {
        paddingBottom: sizeHeight(8),
      }
      : {
        paddingBottom: sizeHeight(8),
        paddingLeft: '15%',
        width: sizeHeight(100),
      }
})