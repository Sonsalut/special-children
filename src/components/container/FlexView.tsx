import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
interface FlexViewProps {
  style?: ViewStyle | ViewStyle[],
  children?: React.ReactNode
}
const FlexView = ({
  style,
  children,
  ...props
}: FlexViewProps) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  )
}
export default FlexView;
const styles = StyleSheet.create({
  container: { flex: 1 },
});
