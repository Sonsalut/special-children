import { StyleSheet } from "react-native";
import { sizeHeight, sizeWidth } from "utils/Utils";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white', flex: 1
    },
    wordListContainer: {
        marginLeft: 10,
        paddingTop: 15,
        height: sizeHeight(94),
        width: sizeWidth(95),
        alignItems: 'center',
    },
    searchbar: {
        borderWidth: 1,
        bottom: 5,
        borderColor: '#C1EBEA',
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
        paddingLeft: 10
    },
    cateView: {
        width: sizeWidth(80),
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: -3,
        marginTop: 8,

        alignSelf: 'center'
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
        height: sizeHeight(15)
    },
    wordVsCheckboxView: {
        flexDirection: 'row',
        width: sizeWidth(30),
        height: sizeHeight(15),
        paddingTop: 3
    },

    cardView: {
        backgroundColor: '#C1EBEA',
        alignSelf: 'center',
        width: sizeWidth(23),
        marginHorizontal: 5,
        borderRadius: 10,
        height: sizeHeight(14)
    },
    wordImage: {
        resizeMode: 'stretch',
        height: sizeHeight(10), width: sizeWidth(18),
        alignSelf: 'center',
        borderRadius: 9
    },
    wordText: {
        fontSize: 15,
        color: '#2D5672',
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: '10%'
    },
    checkbox: {
        right: 25,
        bottom: 1,
        height: 20

    },
    resultSearchView: {
        width: sizeWidth(90),
        paddingTop: 15,
        height: sizeHeight(85),
        alignSelf: 'center'
    },
    reusultWithCheckboxview: {

    }


})