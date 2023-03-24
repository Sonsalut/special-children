import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import TouchableOpacity from './TouchableOpacity'
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils'

interface AddButtonProps {
    onpress?: () => void,
    text?: string

}
const AddButton = ({
    onpress,
    text
}: AddButtonProps) => {
    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={onpress}
                isDoubleTap={true}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </>
    )
}

export default memo(AddButton)

const styles = StyleSheet.create({
    button: {
        width: sizeWidth(45),
        height: sizeHeight(5.5),
        borderRadius: 45,
        marginTop: sizeHeight(2),
        backgroundColor: '#FFD19A',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    text: {
        alignSelf: 'center',
        fontSize: fontSize(3.5),
        fontWeight: 'bold',
        color: '#2D5672'
    }

})