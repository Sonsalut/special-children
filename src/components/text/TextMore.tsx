import {Platform, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React, {useCallback, useState} from 'react';
import Text from 'components/text/Text';
import colors from 'res/colors';
import {ratioW} from 'utils/Utils';
import strings from 'res/strings';

interface TextContentProps {
  content: string;
  maxlength: number;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

const TextMore = ({
  content,
  maxlength,
  containerStyle,
  style,
}: TextContentProps) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= maxlength);
  }, []);
  return (
    <View style={containerStyle}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : maxlength}
        style={[styles.contentText, style]}>
        {content}
      </Text>
      {lengthMore && (
        <Text
          onPress={toggleNumberOfLines}
          style={[styles.contentText, styles.seeText]}>
          {textShown ? strings.hide : strings.seeMore}
        </Text>
      )}
    </View>
  );
};

export default TextMore;

const styles = StyleSheet.create({
  contentText: {
    fontSize: ratioW(16),
    lineHeight: ratioW(24),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    color: colors.text1,
    textAlign: 'left',
  },
  seeText: {
    color: colors.violet,
  },
});
