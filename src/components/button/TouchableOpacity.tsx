import React, {useEffect, useRef, useState} from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native';

export interface TouchableOpacityProps extends RNTouchableOpacityProps {
  isDoubleTap?: boolean;
}

const TouchableOpacity = ({
  isDoubleTap = false,
  ...props
}: TouchableOpacityProps) => {
  const refTimeOut = useRef<any>(null);
  const [activePress, setActivePress] = useState(true);

  const handlePress = (event: GestureResponderEvent) => {
    if (isDoubleTap) {
      props.onPress && props.onPress(event);
    } else {
      if (activePress) {
        setActivePress(false);
        props.onPress && props.onPress(event);
        refTimeOut.current = setTimeout(() => {
          setActivePress(true);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(refTimeOut.current);
    };
  }, []);

  return (
    <RNTouchableOpacity {...props} onPress={event => handlePress(event)}>
      {props.children}
    </RNTouchableOpacity>
  );
};

export default TouchableOpacity;
