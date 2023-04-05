import { StyleSheet } from "react-native";
import { checkIpad, fontSize, isPortrait, sizeHeight, sizeWidth } from "utils/Utils";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: isPortrait() ? 'column' : 'row'
    },
    wordJoinView: isPortrait() ? {
        borderRadius: sizeWidth(5),
        width: '95%',
        height: sizeHeight(46),
        alignSelf: 'center',
        marginTop: sizeHeight(2),
        backgroundColor: '#E7F6FF',
        borderWidth:1
    } : {
        borderRadius: sizeWidth(5),
        width: '50%',
        height: checkIpad() ? sizeHeight(60) : sizeHeight(40),
        backgroundColor: '#E7F6FF',
        borderWidth:1,
        marginTop: sizeHeight(0.5),
        marginLeft: sizeWidth(5),
        flexDirection: checkIpad() ? 'row' : 'column'
    },
    playButton: {
        alignSelf: 'flex-end',
        shadowColor: 'grey',
        backgroundColor: '#FFD19A',
        height: sizeHeight(5),
        width: sizeHeight(5),
        borderRadius: sizeWidth(2),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:sizeHeight(2),
        marginRight:sizeHeight(2),
        borderWidth:1
    },

//CARD ON BOARD VIEW
    joinWordFlatList:{
        alignItems: 'flex-start',
        marginTop: isPortrait() ? sizeHeight(2) : sizeHeight(1),
        width: sizeWidth(85),
        marginLeft: sizeWidth(6.5),
    },

//CARD STYLING
    wordcard: {
        backgroundColor: '#C1EBEA',
        borderRadius: sizeWidth(3),
        width: sizeWidth(23),
        height: sizeHeight(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWord: {
        color: '#2D5672', 
        fontWeight: '600', 
        marginTop: '10%', 
        fontSize: fontSize(4)
    },
    addWordImage: {
        height: sizeHeight(12),
        width: sizeWidth(22),
        borderRadius: sizeWidth(3),
        marginBottom: '-20%',
    },
    
//RESERVE LIST
    reserveWordFlatList: {
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'space-around',
        paddingBottom: sizeHeight(4),
        marginRight: checkIpad() ? '-2.5%' : sizeHeight(1),
    },
    
});