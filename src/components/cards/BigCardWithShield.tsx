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
                paddingTop: 5,
                shadowOffset: {width:1, height:1},
                shadowOpacity: 1,
                shadowColor: '#2D5672',
                // borderWidth: isClicked ? 0 : 2
            }}
        >
            <View
                style={{
                    marginTop: -2,
                    width: '98%',
                    alignSelf: 'center',
                    height: sizeHeight(4),
                    paddingRight: sizeWidth(1),
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        paddingTop: sizeHeight(0.5),
                        paddingLeft: sizeWidth(1),
                        height: sizeHeight(4),
                        width: sizeWidth(7),
                        alignSelf: 'flex-start',
                    }}
                >
                {
                    type === 'ADMIN'
                        ? <Icon
                            name='shield-sharp'
                            size={fontSize(5)}
                            style={{ 
                                alignSelf: 'center', 
                                // marginLeft: sizeWidth(1.5), 
                                color: 'orange', 
                                height: sizeHeight(3), 
                            }}
                        />
                        : null
                }
                </View>
                <View
                    style={{
                        height: sizeHeight(4),
                        width: sizeWidth(7),
                        alignSelf: 'flex-start',
                        marginLeft: 'auto',
                        zIndex: 99,
                    }}
                >
                {
                    isClicked ? null : 
                    <View 
                        style={{
                            backgroundColor: colors.card_blue,
                            height: sizeHeight(4),
                            width: sizeWidth(8),
                            borderRadius: sizeWidth(3),
                            // borderWidth:1
                        }}
                    >
                    <Image
                        source={require('../../assets/images/tick.png')}
                        style={{
                            height: sizeHeight(3.5),
                            width: sizeWidth(6),
                            resizeMode: 'contain',
                            alignSelf: 'center'
                            // alignSelf: 'flex-end',
                        }}
                    />
                    </View>
                }
                </View>
                
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