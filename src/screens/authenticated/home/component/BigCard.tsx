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
  
}
const BigCard = ({
    onPress,
    isDoubleTap,
    source,
    title,
}: CardProps) => {
   
    
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                isDoubleTap={isDoubleTap}
                activeOpacity={0.7}
                style={{...styles.categoryCards}}
            >
                <Image
                    style={[styles.imageCategory]}
                    source={source ?? images.eye_slash}
                />
                <Text style={styles.categoryText}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

export default memo(BigCard)

const styles = StyleSheet.create({
    categoryCards: {
        width: sizeWidth(42),
        height: sizeHeight(24),
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
})