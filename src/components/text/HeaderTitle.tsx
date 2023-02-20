import * as React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { fontSize } from 'utils/Utils';
import colors from 'res/colors';

interface HeaderTitleProps {
  style?: TextStyle | TextStyle[] ,
  children?: React.ReactNode,
  numberOfLines?: number | undefined,
}
const HeaderTitle = ({
  numberOfLines = 2,
  style,
  children,
  ...props
}: HeaderTitleProps) => {
  return (
    <Text numberOfLines={numberOfLines} {...props} style={[styles.defaultHeaderTitle, style]}>
      {children}
    </Text>
  )
}

export default HeaderTitle;

const styles = StyleSheet.create({
  defaultHeaderTitle: {
    color: colors.black,
    fontSize: fontSize(4.5),
    fontWeight: 'bold',
    lineHeight: fontSize(4.5) * 1.5
  },
})