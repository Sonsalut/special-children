import Text from '../text/Text';
import React, { forwardRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  Image,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import colors from 'res/colors';
import { ratioW } from 'utils/Utils';
import TouchableOpacity from 'components/button/TouchableOpacity';

interface TextInputProps extends RNTextInputProps {
  style?: ViewStyle;
  label?: string;
  maxText?: string;
  labelStyle?: TextStyle;
  viewInputStyle?: ViewStyle;
  inputStyle?: ViewStyle | TextStyle;
  iconLeft?: ImageSourcePropType;
  iconLeftStyle?: ImageStyle;
  onIconLeft?: () => void;
  iconLeft2?: ImageSourcePropType;
  isOnIconRightDoubleTap?: boolean,
  iconLeft2Style?: ImageStyle;
  onIconLeft2?: () => void;
  iconRight?: ImageSourcePropType;
  onIconRight?: () => void;
  iconRightStyle?: ImageStyle;
  iconRight2?: ImageSourcePropType;
  iconRight2Style?: ImageStyle;
  onIconRight2?: () => void;
  textErrorStyle?: TextStyle;
  onBlurFormik?: (event: any) => void;
  onBlurEvent?: () => void;
  values?: string;
  touched?: boolean;
  error?: string;
  isChangeBg?: boolean;
  isChangeBorder?: boolean;
  bgDefault?: string;
  bgTouch?: string;
  bgError?: string;
  borderColorDefault?: string;
  borderColorTouch?: string;
  borderColorError?: string;
  textErrorColor?: string;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      style,
      label,
      maxText,
      labelStyle,
      viewInputStyle,
      inputStyle,
      iconLeft,
      iconLeftStyle,
      onIconLeft,
      iconLeft2,
      iconLeft2Style,
      onIconLeft2,
      iconRight,
      iconRightStyle,
      onIconRight,
      iconRight2,
      iconRight2Style,
      onIconRight2,
      textErrorStyle,
      onBlurFormik,
      isOnIconRightDoubleTap = false,
      onBlurEvent,
      values,
      touched,
      error,
      isChangeBg = false,
      isChangeBorder = true,
      bgDefault = colors.grey,
      bgTouch,
      bgError,
      borderColorDefault = colors.title_blue,
      borderColorTouch = colors.orange,
      borderColorError = colors.red,
      textErrorColor = colors.red,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    const [touch, setTouch] = useState(false);
    const [value, setValue] = useState('');

    const borderColor = isChangeBorder
      ? touch
        ? borderColorTouch
        : !touched
          ? borderColorDefault
          : error
            ? borderColorError
            : borderColorTouch
      : borderColorDefault;
    const backgroundColor = isChangeBg
      ? !touched
        ? bgDefault
        : error
          ? bgError
          : bgTouch
      : bgDefault;

    const blurTextInput = () => {
      if (touch) {
        setTouch(false);
      }

      props.onChangeText && props.onChangeText(values ? values?.trim() : '');

      setValue(values ? values?.trim() : '');
    };

    const handleOnFocus = () => {
      if (!touched) {
        setTouch(true);
      }
    };

    useEffect(() => {
      setValue(values ?? '');
    }, [values]);
    return (
      <View style={[style]}>
        <View style={styles.viewLabel}>
          {label && (
            <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
          )}
          {maxText && (
            <Text
              style={{ ...styles.maxText, ...labelStyle }}>{`(${maxText})`}</Text>
          )}
        </View>
        <View
          style={{
            ...styles.containerTextInput,
            ...viewInputStyle,
            borderColor,
            backgroundColor,
          }}>
          <View style={styles.containerIcon}>
            {iconLeft && (
              <TouchableOpacity
                onPress={onIconLeft}
                style={styles.viewIcon}
                disabled={!onIconLeft}>
                <Image
                  source={iconLeft}
                  style={{ ...styles.icon, ...iconLeftStyle }}
                />
              </TouchableOpacity>
            )}
            {iconLeft2 && (
              <TouchableOpacity
                onPress={onIconLeft2}
                style={styles.viewIcon}
                disabled={!onIconLeft2}>
                <Image
                  source={iconLeft2}
                  style={{ ...styles.icon, ...iconLeft2Style }}
                />
              </TouchableOpacity>
            )}
          </View>
          <RNTextInput
            allowFontScaling={false}
            onFocus={handleOnFocus}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={colors.text2}
            rejectResponderTermination={false}
            underlineColorAndroid="transparent"
            style={{
              ...styles.textInput,
              ...inputStyle,
              opacity: props.editable ? 0.7 : 1,
            }}
            onBlur={e => {
              onBlurFormik && onBlurFormik(e);
              blurTextInput();
              onBlurEvent && onBlurEvent();
            }}
            value={value}
            {...props}
            {...{ ref }}
          />
          <View style={styles.containerIcon}>
            {iconRight2 && (
              <TouchableOpacity
                isDoubleTap={isOnIconRightDoubleTap}
                onPress={onIconRight2}
                style={styles.viewIcon}
                disabled={!onIconRight2}>
                <Image
                  source={iconRight2}
                  style={{ ...styles.icon, ...iconRight2Style }}
                />
              </TouchableOpacity>
            )}
            {iconRight && (
              <TouchableOpacity
                isDoubleTap={isOnIconRightDoubleTap}
                onPress={onIconRight}
                style={styles.viewIcon}
                disabled={!onIconRight}>
                <Image
                  source={iconRight}
                  style={{ ...styles.icon, ...iconRightStyle }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {error && touched && (
          <Text
            style={{
              ...styles.textError,
              ...textErrorStyle,
              color: textErrorColor,
            }}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  viewLabel: {
    marginBottom: ratioW(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: ratioW(14),
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    lineHeight: ratioW(21),
    color: colors.text2,
  },
  maxText: {
    fontSize: ratioW(14),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    lineHeight: ratioW(21),
    color: colors.text2,
    alignSelf: 'flex-end',
  },
  containerTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: ratioW(1),
    height: ratioW(50),
    borderRadius: ratioW(12),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: ratioW(18),
    fontSize: ratioW(16),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    color: colors.text1,
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    width: ratioW(24),
    height: ratioW(24),
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textError: {
    fontSize: ratioW(17),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    marginTop: ratioW(3),
  },
});

export default TextInput;
