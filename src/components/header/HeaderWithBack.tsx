import * as React from 'react';
import { Image, ImageSourcePropType, ImageStyle, Platform, StatusBar, StatusBarStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { fontSize, ratioW, sizeHeight, sizeWidth } from 'utils/Utils';
import RowContainer from 'components/container/RowContainer';
import ViewCondition from 'components/container/ViewCondition';
import NavigationService from 'routers/NavigationService';
import GlobalHeader from './GlobalHeader';
// import FastImage from 'react-native-fast-image';
import images from 'res/images';
import HeaderTitle from 'components/text/HeaderTitle';
import colors from 'res/colors';

interface HeaderWithBackProps {
  outerStyle?: ViewStyle | ViewStyle[],
  statusBarbackgroundColor?: StatusBarStyle,
  containerStyle?: ViewStyle,
  hasBack?: boolean,
  title?: String,
  titleStyle?: TextStyle | TextStyle[] | ViewStyle | ViewStyle[] | any,
  numberOfLine?: Number,
  rightComponent?: React.ReactNode,
  leftIconSrc?: ImageSourcePropType,
  leftIconStyle?: ImageStyle,
  rightIconSrc?: ImageSourcePropType,
  rightIconStyle?: ImageStyle,
  onCallBack?: void,
  handle?: () => void,
  hasDone?: boolean,
  rightIconShow?: boolean,


}
const HeaderWithBack = ({
  outerStyle,
  statusBarbackgroundColor,
  containerStyle,
  hasBack = true,
  title,
  titleStyle,
  numberOfLine,
  rightComponent,
  leftIconSrc,
  leftIconStyle,
  onCallBack,
  rightIconSrc,
  rightIconStyle,
  handle,
  hasDone = false,
  rightIconShow = true,

  ...props
}: HeaderWithBackProps) => {
  const onGoBack = () => {
    if (!onCallBack) {
      if (NavigationService.navigationRef.current?.canGoBack()) {
        NavigationService.navigationRef.current?.goBack();
      }
    } else {
      onCallBack;
    }
  }
  return (
    // <GlobalHeader style={[outerStyle]}>
    <>
      {/* <StatusBar 
        backgroundColor={statusBarbackgroundColor} 
        showHideTransition={'none'} 
      /> */}
      <RowContainer style={[styles.container, containerStyle]}>
        <View
          style={{
            height: sizeHeight(5),
            width: sizeWidth(100),
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: sizeHeight(1),
            // borderWidth:1,
            alignContent: 'center'
          }}
        >

          {/* left icon */}
          <ViewCondition isVisible={hasBack} >
            <TouchableOpacity
              onPress={onGoBack}
              style={{
                ...leftIconStyle,
                paddingTop: sizeHeight(2),
                width: sizeWidth(5),
                height: sizeHeight(5),
                marginRight: sizeWidth(5),
                marginLeft:Platform.OS==='android'?sizeWidth(4) :sizeWidth(1),
              }}
            >
              <Image
                source={leftIconSrc ?? images.navBackLeft}
                style={{
                  width: sizeWidth(3),
                  height: sizeHeight(3),
                }}
              />
            </TouchableOpacity>
          </ViewCondition>

          {/* title */}
          <View
            style={
{
              alignSelf: 'center',
              alignItems: 'center',
              alignContent: 'center',
             
              paddingRight: Platform.OS === 'android' ? sizeWidth(50) : 0,
              right: Platform.OS === 'android' ? sizeWidth(5) : 0,
              width: Platform.OS === 'android' ? sizeWidth(75) : 0,
              // borderWidth:1,
              top: Platform.OS === 'android' ? sizeHeight(1) : 0
              // paddingBottom: sizeHeight(2)
            }}
          >
            <HeaderTitle style={[styles.title, titleStyle]}>
              {title ?? `Header title`}
            </HeaderTitle>
          </View>

          {/* right icon */}
          {rightComponent ??
            <View
              style={{
                marginLeft: sizeWidth(8),
                // paddingTop: sizeHeight(2)
              }} />}
          <ViewCondition
            isVisible={hasBack}
          // style={{ 
          //   width: sizeWidth(5), 
          //   height: sizeHeight(4), 
          //   borderWidth:1 
          // }} 
          >
            {
              rightIconShow
                ? <TouchableOpacity
                  onPress={handle}
                  style={leftIconStyle}
                >
                  <Image
                    resizeMode='contain'
                    style={{
                      paddingTop: sizeHeight(2),
                      width: sizeWidth(5),
                      height: sizeHeight(4),
                    }}
                    source={hasDone ? images.done : images.action}
                  />

                </TouchableOpacity>
                : null
            }
          </ViewCondition>


        </View>
      </RowContainer>
    </>
  )
}

export default HeaderWithBack;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: sizeWidth(5),
    backgroundColor: colors.title_blue,
    height: sizeHeight(10),
    width: sizeWidth(100),
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // paddingTop:sizeHeight(4)
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize(5),
    fontWeight: 'bold',
    color: '#F1F1F2',
    alignSelf: 'center',
    // marginBottom: sizeHeight(2),
    // borderWidth:1
  },

})