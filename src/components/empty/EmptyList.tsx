import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import colors from 'res/colors';
import {ratioW} from 'utils/Utils';
import images from 'res/images';
import Text from 'components/text/Text';
import strings from 'res/strings';

interface EmptyListProps {
  title?: string;
  image?: ImageSourcePropType;
}

const EmptyList = ({
  title = strings.emptyText,
  image = images.img_empty_bg,
}: EmptyListProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} />
      <Text style={styles.textEmpty}>{title}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: ratioW(16),
    lineHeight: ratioW(24),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    color: colors.text1,
    textAlign: 'center',
    marginTop: ratioW(30),
  },
});
