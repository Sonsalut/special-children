import * as React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
interface RowContainerProps extends ViewProps { }
const RowContainer = ({
  ...props
}: RowContainerProps) => {
  return (
    <View {...props} style={[styles.defaultRow, props?.style]}>
      {props?.children}
    </View>
  )
}
const styles = StyleSheet.create({
  defaultRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});
export default RowContainer

