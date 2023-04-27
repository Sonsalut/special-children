import { Image, ImageRequireSource, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'components';
import images from 'res/images';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { store } from 'redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import colors from 'res/colors';
import { color } from 'react-native-reanimated';
interface CardProps {
    onPress?: () => void,
    isDoubleTap?: boolean,
    source?: ImageSourcePropType,
    title?: String,
    disabled?: boolean,
    uri?:any
}
const MediumCard = ({
    onPress,
    isDoubleTap,
    source,
    title,
    disabled= false,
    uri
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
                
                <FastImage
                    style={[styles.imageStyle]}
                 
                  source={{
                    uri: uri,
                    // method: 'GET',
                    headers: {Authorization: store.getState().authReducer.user.accessToken ,
                        
                    },
                    cache:FastImage.cacheControl.web,
                    priority: FastImage.priority.high,
                    
                  }}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <Text style={styles.textStyle}>{title}</Text>
                
            </TouchableOpacity>
        </>
    )
}

export default MediumCard

const styles = StyleSheet.create({
    cardStyle: {
        width: sizeWidth(28),
        height: sizeHeight(18.5),
        borderRadius: sizeWidth(3),
        marginHorizontal: sizeHeight(1),
        marginVertical: 10,
        backgroundColor: colors.card_blue,
        paddingTop: 5,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 1,
        shadowColor: '#2D5672',
        // borderColor:'#808080',
        // borderWidth:2,
        // backgroundColor: '#C1EBEA',
    },
    imageStyle: {
        resizeMode: 'contain',
        height: '75%',
        width: sizeWidth(24),
        alignSelf: 'center',
        borderRadius: 10,
    },
    textStyle: {
        fontSize: fontSize(3.8),
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginTop: '3%',
        marginLeft: '10%',
        color: colors.text_blue
        // color: '#2D5672'
    }
})