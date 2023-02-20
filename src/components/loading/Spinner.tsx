import React from 'react';
import {View, StyleSheet} from 'react-native';
import Loading, {SpinnerType} from 'react-native-spinkit';
import {ratioW} from 'utils/Utils';
import colors from 'res/colors';

const Mode = {default: 'default', overlay: 'overlay'};
interface SpinnerProps {
  mode?: 'default' | 'overlay';
  size?: number;
  type?: SpinnerType;
  color?: string;
}

const Spinner = ({
  mode = 'overlay',
  size = ratioW(16),
  type = 'Circle',
  color = colors.violet,
}: SpinnerProps) => {
  let containerStyle = styles.container;
  switch (mode) {
    case Mode.default:
      containerStyle = styles.container_full_stretch;
      break;
    case Mode.overlay:
      containerStyle = styles.container_overlay;
      break;
    default:
      break;
  }

  return (
    <View style={containerStyle}>
      <Loading isVisible size={size} type={type} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: undefined,
    width: undefined,
  },
  container_full_stretch: {
    flexGrow: 1,
    height: undefined,
    width: undefined,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: undefined,
    width: undefined,
    backgroundColor: colors.blackWithOpacity(0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: 'transparent',
    zIndex: 100,
  },
});

export default Spinner;
