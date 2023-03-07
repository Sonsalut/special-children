import * as React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StatusBar, StatusBarStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { fontSize, sizeHeight, sizeWidth } from 'utils/Utils';
import RowContainer from 'components/container/RowContainer';
import ViewCondition from 'components/container/ViewCondition';
import NavigationService from 'routers/NavigationService';
import GlobalHeader from './GlobalHeader';
import FastImage from 'react-native-fast-image';
import images from 'res/images';
import HeaderTitle from 'components/text/HeaderTitle';

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
  rightIconSrc?:ImageSourcePropType,
  rightIconStyle?: ImageStyle,
  onCallBack?: void,
  handle?:()=> void,
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
  hasDone= false,
  rightIconShow=true,
  
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
    <GlobalHeader style={[outerStyle]}>
      <StatusBar backgroundColor={statusBarbackgroundColor} showHideTransition={'none'} />
      <RowContainer style={[styles.container, containerStyle]}>
        <ViewCondition isVisible={hasBack} >
          <TouchableOpacity onPress={onGoBack} style={leftIconStyle}>
            <Image source={leftIconSrc ?? images.navBackLeft} />
          </TouchableOpacity>
          
        </ViewCondition>
        <HeaderTitle style={[styles.title, titleStyle]}>
          {title ?? `Header title`}
        </HeaderTitle>
        {rightComponent ?? <View style={{ flex: 0.106 }} />}
        <ViewCondition isVisible={hasBack} >
          {
            rightIconShow 
            ?<TouchableOpacity onPress={handle} style={leftIconStyle}>
            <Image resizeMode='contain' style={{width:sizeWidth(4), height:sizeHeight(3)}} source={hasDone?images.done : images.action} /></TouchableOpacity> 
            : null
          }
          
          
        </ViewCondition>
      </RowContainer>
    </GlobalHeader>
  )
}

export default HeaderWithBack;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizeWidth(5),
    paddingVertical: sizeWidth(0.5),
    justifyContent: 'space-between',
    marginTop: sizeHeight(5),
    // backgroundColor: '#87C2E4'
  },
  title: {
    flex: 1.107,
    textAlign: 'center',
    fontSize: fontSize(5.1),
    lineHeight: fontSize(5.1) * 1.5,
    fontWeight: 'bold'
  },
  
})