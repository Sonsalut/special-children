import Text from 'components/text/Text';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
} from 'react-native';
import colors from 'res/colors';
import {ratioW} from 'utils/Utils';

interface ElementButtonProps {
  iconLeft?: ImageSourcePropType;
  styleIconLeft?: ImageStyle;
  label?: string;
  styleLabel?: TextStyle;
  iconRight?: ImageSourcePropType;
  styleIconRight?: ImageStyle;
}

const ElementButton = ({
  iconLeft,
  styleIconLeft,
  label,
  styleLabel,
  iconRight,
  styleIconRight,
}: ElementButtonProps) => {
  return (
    <>
      {iconLeft && (
        <Image
          source={iconLeft}
          style={{...styles.iconButton, ...styleIconLeft}}
        />
      )}
      {label && (
        <Text
          style={{
            ...styles.label,
            ...styleLabel,
            marginLeft: iconLeft ? ratioW(8) : 0,
            marginRight: iconRight ? ratioW(8) : 0,
          }}>
          {label}
        </Text>
      )}
      {iconRight && (
        <Image
          source={iconRight}
          style={{...styles.iconButton, ...styleIconRight}}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: ratioW(24),
    height: ratioW(24),
    resizeMode: 'contain',
  },
  label: {
    fontSize: ratioW(16),
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    lineHeight: ratioW(24),
    color: colors.white,
  },
});

export default ElementButton;
