import React, {ReactNode} from 'react';
import {
  View,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
  ViewStyle,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import {Text} from 'components';

import colors from 'res/colors';
import {ratioW} from 'utils/Utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TouchableOpacity from 'components/button/TouchableOpacity';

interface HeaderProps {
  styleContainer?: ViewStyle;
  iconLeft?: ImageSourcePropType;
  styleIconLeft?: ImageStyle;
  actionLeft?: () => void;
  children?: ReactNode;
  title?: string;
  styleTitle?: TextStyle;
  iconRight1?: ImageSourcePropType;
  styleIconRight1?: ImageStyle;
  actionRight1?: () => void;
  iconRight2?: ImageSourcePropType;
  styleIconRight2?: ImageStyle;
  actionRight2?: () => void;
  viewTextRightStyle?: ViewStyle;
  textActionRight?: string;
  textActionRightStyle?: TextStyle;
  actionTextRight?: () => void;
}

export const HEIGHT_HEADER = ratioW(56);

const Header = ({
  styleContainer,
  iconLeft,
  styleIconLeft,
  actionLeft,
  children,
  title,
  styleTitle,
  iconRight1,
  styleIconRight1,
  actionRight1,
  iconRight2,
  styleIconRight2,
  actionRight2,
  viewTextRightStyle,
  textActionRight,
  textActionRightStyle,
  actionTextRight,
}: HeaderProps) => {
  const insert = useSafeAreaInsets();
  const widthIconView = iconRight2 ? ratioW(60) : ratioW(30);

  return (
    <View
      style={{
        ...styles.headerContainer,
        ...styleContainer,
        height: HEIGHT_HEADER + insert.top,
        paddingTop: insert.top,
      }}>
      <View
        style={[
          styles.viewIconHorizontal,
          {alignItems: 'flex-start', width: widthIconView},
        ]}>
        {iconLeft && (
          <TouchableOpacity
            disabled={actionLeft === undefined}
            onPress={() => {
              iconLeft && actionLeft ? actionLeft() : null;
            }}>
            <View style={styles.viewIcon}>
              <Image
                source={iconLeft}
                style={{...styles.iconHeader, ...styleIconLeft}}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>
        {children ? (
          {children}
        ) : title ? (
          <Text style={[styles.titleHeader, styleTitle]} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
      <View
        style={[
          styles.viewIconHorizontal,
          {justifyContent: 'flex-end', width: widthIconView},
        ]}>
        {iconRight1 && (
          <TouchableOpacity
            style={styles.viewRow}
            onPress={() => {
              iconRight1 && actionRight1 ? actionRight1() : true;
            }}>
            <View style={styles.viewIcon}>
              <Image
                source={iconRight1}
                style={{...styles.iconHeader, ...styleIconRight1}}
              />
            </View>
          </TouchableOpacity>
        )}
        {iconRight2 && (
          <TouchableOpacity
            style={styles.viewRow}
            onPress={() => {
              iconRight2 && actionRight2 ? actionRight2() : true;
            }}>
            <View style={styles.viewIcon}>
              <Image
                source={iconRight2}
                style={{...styles.iconHeader, ...styleIconRight2}}
              />
            </View>
          </TouchableOpacity>
        )}
        {textActionRight && (
          <TouchableOpacity
            style={{...viewTextRightStyle}}
            onPress={actionTextRight}>
            <Text style={{...textActionRightStyle, ...styles.textActionRight}}>
              {textActionRight}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: ratioW(22),
    paddingRight: ratioW(22),
    backgroundColor: colors.white,
  },
  viewIconHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    width: ratioW(30),
    height: ratioW(30),
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconHeader: {
    width: ratioW(24),
    height: ratioW(24),
    resizeMode: 'contain',
  },
  textActionRight: {
    fontSize: ratioW(10),
    lineHeight: ratioW(15),
    letterSpacing: 0.25,
    color: colors.white,
  },
  titleHeader: {
    alignSelf: 'center',
    fontSize: ratioW(18),
    lineHeight: ratioW(24),
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: colors.text1,
  },
});

export default Header;
