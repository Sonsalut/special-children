import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { sizeHeight } from 'utils/Utils'
import { isClicked } from 'redux/storageWord/action'
import TouchableOpacity from 'components/button/TouchableOpacity'


interface ColorPickerProps {
    onPress?: () => void,
    isDoubleTap?: boolean,
    // source?: any,
    // title?: String,
    isClicked?: boolean,
    type?: string,
    // uri?: any
}
const ColorPicker = ({
    onPress,
    isClicked = true,
    isDoubleTap

}: ColorPickerProps) => {
    return (
        <TouchableOpacity style={styles.outterView}>
            <View style={styles.innerView}></View>
        </TouchableOpacity>
    )
}

export default ColorPicker

const styles = StyleSheet.create({
    outterView: {
        height: sizeHeight(5.5),
        width: sizeHeight(5.5),
        borderRadius: 180,
        borderWidth: 1,
        justifyContent: 'center'
    },
    innerView: {
        height: sizeHeight(4.5),
        width: sizeHeight(4.5),
        borderRadius: 180, 
        backgroundColor: '#CCF6C8',
        alignSelf: 'center'
    }
})