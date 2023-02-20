import React, {useState} from 'react';
import {View, StyleSheet, ViewStyle, LayoutChangeEvent} from 'react-native';
import colors from 'res/colors';
import {ratioW} from 'utils/Utils';

type TypeDivider = 'DOT' | 'DASH' | 'NORMAL';

interface Props {
  type: TypeDivider;
  height?: number;
  color?: string;
  space?: number;
  style?: ViewStyle;
}

const Divider = ({type, height, color, space, style}: Props) => {
  const [widthDivider, setWidthDiver] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidthDiver(event.nativeEvent.layout.width);
  };
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          type === 'NORMAL' ? color ?? colors.light_violet : colors.transparent,
        height: height ?? ratioW(1),
        marginVertical: space,
        ...style,
      }}
      onLayout={onLayout}>
      {type !== 'NORMAL' &&
        Array.from(
          {
            length: Math.floor(
              widthDivider /
                (type === 'DASH'
                  ? ratioW(4) + ratioW(5)
                  : ratioW(4) + ratioW(1)),
            ),
          },
          (item, index) => (
            <View
              key={index.toString()}
              style={{
                ...styles.children,
                width: type === 'DASH' ? ratioW(5) : ratioW(1),
                backgroundColor: color ?? colors.light_violet,
              }}
            />
          ),
        )}
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  children: {
    height: ratioW(1),
    borderRadius: ratioW(1),
  },
});
