import * as React from 'react';
import { StatusBar, View, StyleSheet, ViewProps } from 'react-native';
import { CONTENT_STANDARD, sizeWidth } from 'utils/Utils';

interface GlobalHeaderProps extends ViewProps { }
const GlobalHeader = ({ ...props }: GlobalHeaderProps) => {
  return (
    <View {...props} style={[styles.container, props?.style]}>
      <StatusBar barStyle={'dark-content'} showHideTransition={'none'} translucent />
      {props?.children}
    </View>
  )
}

export default GlobalHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: CONTENT_STANDARD / 1.75,
    top: 0,
  },
});