import { Image, ImageRequireSource, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'components';
import images from 'res/images';
import { checkIpad, fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import { store } from 'redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { userInfo } from 'os';
interface CardProps {
    onPress?: () => void,
    isDoubleTap?: boolean,
    source?: ImageSourcePropType,
    title?: String,
    uri : any, 
   
  
}
const BigCard = ({
    onPress,
    isDoubleTap,
    source,
    title,
    uri, 
    

}: CardProps) => {
  
   
    
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                isDoubleTap={isDoubleTap}
                activeOpacity={0.7}
                style={[styles.categoryCards]}
            >
                
                {/* <Image
                    style={[styles.imageCategory]}
                    source={source ?? images.eye_slash}
                    // onLoadStart={()=>console.log('Loading')}
                    // onLoadEnd={()=>console.log('suuc')}    
                    // onLoad={()=>{
                    //     return<Text>LOAD</Text>
                    // }}  
                              
                /> */}
                <FastImage
                    style={[styles.imageCategory]}
                 
                    source={{
                        uri: uri,
                        // method: 'GET',
                        headers: {Authorization: store.getState().authReducer.user.accessToken ,
                            cache:'reload'
                    },
                    cache:FastImage.cacheControl.web,
                    priority: FastImage.priority.high,
                    
                  }}
                  resizeMode = {FastImage.resizeMode.stretch}
                  />
                <Text style={styles.categoryText}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

export default BigCard

const styles = StyleSheet.create({
    categoryCards: {
        width:  sizeWidth(42),
        height: checkIpad() ? sizeHeight(30) : sizeHeight(24),
        borderRadius: sizeWidth(3),
        marginHorizontal: 9,
        // alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#C1EBEA',
        paddingTop: 5,
        borderColor:'#808080',
        borderWidth:2
    },
    imageCategory: {
        height: checkIpad() ? sizeHeight(23) : sizeHeight(18),
        width: checkIpad() ? sizeWidth(32) : sizeWidth(36),
        alignSelf: 'center',
        marginTop: '1%',
        borderRadius: sizeWidth(3),
        // padding: 15,
    },
    categoryText: {
        fontSize: fontSize(4.5),
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: '3.5%',
        color: '#2D5672'
    }
})