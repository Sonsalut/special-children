import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import TouchableOpacity from './TouchableOpacity'
import { sizeWidth } from 'utils/Utils'

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
        marginLeft: 10,
        width: '50%',
        height: sizeWidth(10),
        borderRadius: 45,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFD19A',
        alignSelf: 'center'
    },
    text: {
        alignSelf: 'center',
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2D5672'
    }

})