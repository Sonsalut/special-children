import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
}

class Text extends React.PureComponent<TextProps> {
  render() {
    return (
      <RNText
        allowFontScaling={false}
        style={[styles.defaultStyle, this.props?.style]}
        {...this.props}>
        {this.props.children}
      </RNText>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {},
});

export default Text;
