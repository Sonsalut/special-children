import * as React from 'react';
import { Image, ImageSourcePropType, ImageStyle, Platform, StatusBar, StatusBarStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { checkIpad, fontSize, ratioW, sizeHeight, sizeWidth } from 'utils/Utils';
import RowContainer from 'components/container/RowContainer';
import ViewCondition from 'components/container/ViewCondition';
import NavigationService from 'routers/NavigationService';
import GlobalHeader from './GlobalHeader';
// import FastImage from 'react-native-fast-image';
import images from 'res/images';
import HeaderTitle from 'components/text/HeaderTitle';
import colors from 'res/colors';
import { brotliDecompressSync } from 'zlib';

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


    <RowContainer style={[styles.container, containerStyle]}>
      <View
        style={{
          // marginTop: checkIpad() ? null : sizeHeight(),
          height: sizeHeight(5),
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >

        {/* left icon */}
        <View
          style={{
            // borderWidth:1,
            paddingLeft: sizeWidth(5),
            width: '20%',
          }}
        >
          <TouchableOpacity
            onPress={onGoBack}
            style={{
              width: sizeWidth(10),
              height: sizeHeight(5),
              alignItems: 'flex-start',
              justifyContent: 'center',
              // borderWidth: 1,
              marginLeft: Platform.OS === 'android' ? sizeWidth(4) : null,
            }}
          >
            <Image
              source={leftIconSrc ?? images.back}
              style={{
                resizeMode: 'contain',
                maxWidth: sizeWidth(6.5),
                maxHeight: sizeHeight(4),
              }}
            />
          </TouchableOpacity>
        </View>




        {/* title */}
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            paddingRight: Platform.OS === 'android' ? sizeWidth(50) : 0,
            right: Platform.OS === 'android' ? sizeWidth(5) : 0,
            width: '60%',
            top: Platform.OS === 'android' ? sizeHeight(1) : 0
          }}
        >
          <HeaderTitle style={[styles.title, titleStyle]}>
            {title ?? `Header title`}
          </HeaderTitle>
        </View>

      {/* right icon */}
        <View
          style={{
            width: '12%',
            justifyContent: 'flex-end',
            marginLeft: 'auto',
          }}
        >
          {
            rightIconShow
              ? <TouchableOpacity
                onPress={handle}
                style={{
                  width:sizeWidth(7), 
                  height: sizeHeight(3),
                  marginLeft: sizeWidth(0.5),
                  justifyContent: 'center',
                }}
              >
                <Image
                  resizeMode='contain'
                  style={{
                    paddingTop: sizeHeight(2),
                    maxWidth: sizeWidth(6.5),
                    maxHeight: sizeHeight(2.7),
                  }}
                  source={images.edit}
                />

              </TouchableOpacity>
              : null
          }
        </View>
      </View>
    </RowContainer>

  )
}

export default HeaderWithBack;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.title_blue,
    backgroundColor: 'white',
    // borderWidth:1,
    height: sizeHeight(10),
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize(5),
    fontWeight: 'bold',
    // borderWidth: 1,
    alignSelf: 'center',
    // marginTop: checkIpad()? null : sizeHeight(2.3),
  },

})