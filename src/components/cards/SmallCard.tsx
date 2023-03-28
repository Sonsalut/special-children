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
    title?: string,
    disabled?: boolean
}

const SmallCard = ({
    onPress,
    isDoubleTap,
    source,
    title,
    disabled=false
}: CardProps) => {
  return (
    <>
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            isDoubleTap={isDoubleTap}
            activeOpacity={0.7}
            style={{ ...styles.cardStyle }}
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

export default memo(SmallCard)

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#C1EBEA',
        alignSelf: 'center',
        width: sizeWidth(25),
        marginHorizontal: 5,
        borderRadius: sizeWidth(3),
        height: sizeHeight(17.3),
        borderColor: '#808080',
        borderWidth: 2,
        marginVertical:5
    },

    imageStyle:{
        marginTop: '3.5%',
        resizeMode: 'stretch',
        height: sizeHeight(12.5), width: sizeWidth(20),
        alignSelf: 'center',
        borderRadius: 10
    },

    textStyle: {
        fontSize: fontSize(3.8),
        color: '#2D5672',
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: '3%'
    }

})
