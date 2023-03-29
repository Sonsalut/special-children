import { Image, ImageRequireSource, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'components';
import images from 'res/images';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { store } from 'redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
interface CardProps {
    onPress?: () => void,
    isDoubleTap?: boolean,
    source?: ImageSourcePropType,
    title?: string,
    disabled?: boolean,
    uri?:any
}

const SmallCard = ({
    onPress,
    isDoubleTap,
    source,
    title,
    disabled=false,
    uri
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

            <FastImage
                    style={[styles.imageStyle]}
                 
                  source={{
                    uri: uri,
                    // method: 'GET',
                    headers: {Authorization: store.getState().authReducer.user.accessToken ,
                        
                    },
                    cache:FastImage.cacheControl.web,
                    priority: FastImage.priority.high,
                    
                  }}/>
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
