import { Image, ImageRequireSource, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'components';
import images from 'res/images';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { store } from 'redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
interface CardProps {
    onPress?: () => void,
    isDoubleTap?: boolean,
    source?: ImageSourcePropType,
    title?: String,
    disabled?: boolean
}
const MediumCard = ({
    onPress,
    isDoubleTap,
    source,
    title,
    disabled= false
}: CardProps) => {
   
    
    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                isDoubleTap={isDoubleTap}
                activeOpacity={0.7}
                style={{...styles.cardStyle}}
            >
                <Image
                    style={[styles.imageStyle]}
                    source={source ?? images.eye_slash}
                />
                <Text style={styles.textStyle}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

export default memo(MediumCard)

const styles = StyleSheet.create({
    cardStyle: {
        width: sizeWidth(28),
        height: sizeHeight(18),
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: '#C1EBEA',
        paddingTop: 5,
    },
    imageStyle: {
        resizeMode: 'stretch',
        height: '75%',
        width: sizeWidth(24),
        alignSelf: 'center',
        borderRadius: 10,
    },
    textStyle: {
        fontSize: fontSize(3.8),
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: '3.5%',
        color: '#2D5672'
    }
})