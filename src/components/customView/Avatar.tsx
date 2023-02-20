import {Image, ImageProps, StyleSheet} from 'react-native';
import React from 'react';

interface AvatarProps extends ImageProps {
  size: number;
}

const Avatar = (props: AvatarProps) => {
  return (
    <Image
      style={[
        styles.avatar,
        props.style,
        {width: props.size, height: props.size, borderRadius: props.size / 2},
      ]}
      {...props}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'cover',
  },
});
