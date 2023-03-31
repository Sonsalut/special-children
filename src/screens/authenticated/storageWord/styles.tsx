import BigCardWithShield from "components/cards/BigCardWithShield";
import { StyleSheet } from "react-native";
import { fontSize, sizeHeight, sizeWidth } from "utils/Utils";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white', flex: 1
    },
    wordListContainer: {
        // marginLeft: 10,
        // paddingTop: 15,
        alignSelf: 'center',
        height: sizeHeight(94),
        width: sizeWidth(95),
        alignItems: 'center',
        paddingBottom: sizeHeight(5),
    },
    searchbar: {
        borderWidth: 1,
        // bottom: 5,
        marginVertical: '1%',
    borderColor: '#2D5672',
   
        borderRadius: 15,
        width: sizeWidth(80),
        backgroundColor: 'white',
        height: sizeHeight(5)
    },
    titleView: {
        marginBottom: 22,
        paddingBottom: 15,
        borderRadius: 15,
        backgroundColor: '#E7F6FF',
        paddingLeft: 10,
        height: sizeHeight(26),
    },
    cateView: {
        width: sizeWidth(80),
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: -3,
        marginTop: 8,
        alignSelf: 'center',
    },
    cateText: {
        fontSize: 18,
        color: '#897666',
        fontWeight: 'bold',
        alignSelf: "center",
    },
    wordview: {
        flexDirection: 'row',
        marginTop: 8,
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
        height: sizeHeight(17.3),
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
    checkbox: {
        right: 20,
        top:2,
        height: 20

    },
    resultSearchView: {
        width: sizeWidth(90),
        paddingTop: 15,
        height: sizeHeight(85),
        alignSelf: 'center',
    },
    reusultWithCheckboxview: {

    }


})