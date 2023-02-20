import * as React from 'react';
import { View, ViewStyle } from 'react-native';

interface ViewConditionProps {
  isVisible?: boolean,
  style?: ViewStyle | ViewStyle[],
  children?: React.ReactNode
  isFlex?: boolean
}
const ViewCondition = ({
  isVisible,
  children,
  style,
  isFlex,
  ...props
}: ViewConditionProps) => {
  return (
    <View
      {...props}
      style={[{ display: isVisible ? 'flex' : 'none', }, isFlex && { flex: 1 }, style]}
    >
      {children}
    </View>
  )
}
export default ViewCondition