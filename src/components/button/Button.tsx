import React, {ReactNode} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'res/colors';

import {ratioW} from 'utils/Utils';
import ElementButton from './ElementButton';
import TouchableOpacity, {TouchableOpacityProps} from './TouchableOpacity';

interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  iconLeft?: ImageSourcePropType;
  styleIconLeft?: ImageStyle;
  label?: string;
  styleLabel?: TextStyle;
  iconRight?: ImageSourcePropType;
  styleIconRight?: ImageStyle;
  backgroundColor?: string[];
  disabled?: boolean;
  children?: ReactNode;
}

const Button = ({
  style,
  contentStyle,
  iconLeft,
  styleIconLeft,
  label,
  styleLabel,
  iconRight,
  styleIconRight,
  backgroundColor = [colors.violet],
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...props}
      style={{...style, opacity: disabled ? 0.3 : 1}}>
      {backgroundColor && backgroundColor.length > 1 ? (
        <LinearGradient
          colors={backgroundColor}
          style={{borderRadius: ratioW(8), ...contentStyle}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          {children ? (
            children
          ) : (
            <View style={styles.container}>
              <ElementButton
                iconLeft={iconLeft}
                styleIconLeft={styleIconLeft}
                label={label}
                styleLabel={styleLabel}
                iconRight={iconRight}
                styleIconRight={styleIconRight}
              />
            </View>
          )}
        </LinearGradient>
      ) : (
        <View>
          {backgroundColor?.length === 1 ? (
            <View
              style={[
                styles.container,
                {backgroundColor: backgroundColor[0], ...contentStyle},
              ]}>
              {children ? (
                children
              ) : (
                <ElementButton
                  iconLeft={iconLeft}
                  styleIconLeft={styleIconLeft}
                  label={label}
                  styleLabel={styleLabel}
                  iconRight={iconRight}
                  styleIconRight={styleIconRight}
                />
              )}
            </View>
          ) : (
            <View
              style={[
                styles.container,
                {
                  ...contentStyle,
                },
              ]}>
              <ElementButton
                iconLeft={iconLeft}
                styleIconLeft={styleIconLeft}
                label={label}
                styleLabel={styleLabel}
                iconRight={iconRight}
                styleIconRight={styleIconRight}
              />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ratioW(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ratioW(25),
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Button;
