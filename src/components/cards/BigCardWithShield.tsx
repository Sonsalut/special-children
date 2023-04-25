import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TouchableOpacity from 'components/button/TouchableOpacity'
import { checkIpad, fontSize, sizeHeight, sizeWidth } from 'utils/Utils'
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import { store } from 'redux/store'
import colors from 'res/colors'



interface BigCardWithShieldProps {
    onPress?: () => void,
    isDoubleTap?: boolean,
    source?: any,
    title?: String,
    isClicked?: boolean,
    type?: string,
    uri?: any

}
const BigCardWithShield = ({
    onPress,
    isDoubleTap,
    isClicked = true,
    source,
    title,
    type,
    uri


}: BigCardWithShieldProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            isDoubleTap={isDoubleTap}
            activeOpacity={0.7}
            style={{

                width: sizeWidth(42),
                height: checkIpad() ? sizeHeight(30) : sizeHeight(24),
                borderRadius: sizeWidth(3),
                marginHorizontal: 9,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: colors.card_blue,
                // backgroundColor: '#C1EBEA',
                paddingTop: 5,
                borderWidth: isClicked ? 0 : 2
            }}
        >


            <View
                style={{
                    marginHorizontal: -10,
                    width: '100%',
                    alignSelf: 'center',
                    height: sizeHeight(4.5),
                    paddingRight: sizeWidth(1),
                }}
            >
                {
                    type === 'ADMIN'
                        ? <Icon
                            name='shield-sharp'
                            size={fontSize(5)}
                            style={{ 
                                alignSelf: 'flex-end', 
                                marginRight: sizeWidth(1), 
                                marginTop: sizeHeight(1),
                                color: 'orange', 
                                height: sizeHeight(4.5), 
                            }}
                        />
                        : null
                }
            </View>
            <View style={{zIndex:-1}}>
                <FastImage
                    style={[styles.imageStyle]}

                    source={{
                        uri: uri,
                        // method: 'GET',
                        headers: {
                            Authorization: store.getState().authReducer.user.accessToken,

                        },
                        cache: FastImage.cacheControl.web,
                        priority: FastImage.priority.high,

                    }}
                    resizeMode = {FastImage.resizeMode.stretch} 
                />
            </View>

            <Text style={{
                fontSize: fontSize(4.5),
                alignSelf: 'flex-start',
                fontWeight: 'bold',
                marginLeft: '8%',
                marginTop: checkIpad() ? '2%' : '3.5%',
                color: colors.text_blue
            }}>{title}</Text>


        </TouchableOpacity>
    )
}

export default BigCardWithShield

const styles = StyleSheet.create({

    imageStyle: {
        height: checkIpad() ? sizeHeight(23) : sizeHeight(18),
        width: checkIpad() ? sizeWidth(32) : sizeWidth(36),
        resizeMode: 'stretch',
        borderRadius: sizeWidth(3),
        alignSelf: 'center',
        marginTop: sizeHeight(-3),
        padding: 15,
    }

})