import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import Button from './Button';
import {ratioW} from 'utils/Utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from 'res/colors';

interface BottomButtonProps {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  onPress: () => void;
}

const BottomButton = ({style, title, disabled, onPress}: BottomButtonProps) => {
  const insert = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: insert.bottom + ratioW(25),
        ...style,
      }}>
      <Button label={title} {...{onPress}} disabled={disabled} />
    </View>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ratioW(40),
    paddingTop: ratioW(25),
    borderTopWidth: ratioW(1),
    borderTopColor: colors.dark_grey,
    backgroundColor: colors.white,
  },
});
