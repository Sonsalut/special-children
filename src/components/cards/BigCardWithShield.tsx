import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TouchableOpacity from 'components/button/TouchableOpacity'
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils'
import Icon from 'react-native-vector-icons/Ionicons'



interface BigCardWithShieldProps {
    onPress?: () => void,
    isDoubleTap?: boolean,
    source?: any,
    title?: String,
    isClicked?: boolean,
    type?: string

}
const BigCardWithShield = ({
    onPress,
    isDoubleTap,
    isClicked = true,
    source,
    title,
    type


}: BigCardWithShieldProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            isDoubleTap={isDoubleTap}
            activeOpacity={0.7}
            style={{

                width: sizeWidth(42),
                height: sizeHeight(25),
                borderRadius: 10,
                marginHorizontal: 9,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: '#C1EBEA',
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
                            size={sizeHeight(4.5), sizeWidth(6)}
                            style={{ alignSelf: 'flex-end', color: 'orange', height: sizeHeight(4.5)}} />
                        : null
                }
            </View>
            <Image
                style={{
                    height: sizeHeight(18),
                    width: sizeWidth(32),
                    resizeMode: 'stretch',
                    borderRadius: sizeWidth(3),
                    alignSelf: 'center',
                    marginTop: sizeHeight(-3),
                    padding: 15,
                }}
                source={source} />

            <Text style={{
                fontSize: fontSize(4.5),
                alignSelf: 'center',
                fontWeight: 'bold',
                marginTop: '3.5%',
                color: '#2D5672'
            }}>{title}</Text>


        </TouchableOpacity>
    )
}

export default BigCardWithShield

const styles = StyleSheet.create({})