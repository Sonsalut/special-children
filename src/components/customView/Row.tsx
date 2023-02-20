import {StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';

interface RowProps extends ViewProps {}

const Row = (props: RowProps) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
