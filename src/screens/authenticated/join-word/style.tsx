import { StyleSheet } from "react-native";
import { checkIpad, fontSize, sizeHeight, sizeWidth } from "utils/Utils";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    wordJoinView: {
        borderRadius: 10,
        width: '90%',
        height: sizeHeight(42),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#E7F6FF',
        padding: 10
    },
    wordcard: {
        backgroundColor: '#C1EBEA',
        borderRadius: sizeWidth(3),
        width: sizeWidth(23),
        height: sizeHeight(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWord: {
        color: '#2D5672', fontWeight: '600', marginTop: '10%', fontSize: fontSize(4)
    },
    addWordImage: {

        height: sizeHeight(12),
        width: sizeWidth(22),
        borderRadius: sizeWidth(3),
        marginBottom: '-20%',

    },
    playButton: {
        alignSelf: 'flex-end',
        shadowColor: 'grey',
        backgroundColor: '#FFD19A',
        height: sizeHeight(5),
        width: sizeHeight(5),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteWordView: {
        paddingTop: 15,
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: 'white'
    },
    deleteWord: {
        backgroundColor: '#C1EBEA',
        borderRadius: sizeWidth(3),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: sizeHeight(17),
        width: sizeWidth(25),
    },
    deleteWorImage: {
        height: sizeHeight(13),
        width: sizeWidth(24),
        borderRadius: sizeWidth(3),
        marginTop: '5%',
    },
    deleteText: {
        color: '#2D5672',
        fontWeight: '600',
        marginTop: sizeHeight(0.3),
        marginBottom: 5
    }
})