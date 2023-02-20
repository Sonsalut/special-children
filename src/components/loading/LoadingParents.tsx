import Text from 'components/text/Text';
import React, {forwardRef, Ref, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Spinner, {SpinnerType} from 'react-native-spinkit';
import colors from 'res/colors';
import {ratioW} from 'utils/Utils';
import LoadingManager from './LoadingManager';

const TIME_OUT = 1 * 60 * 1000;

export function showLoading(textLoading?: string) {
  const ref: any = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.showLoading(textLoading);
  }
}

export function updateTextLoading(textLoading: string) {
  const ref: any = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.updateTextLoading(textLoading);
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.hideLoading();
  }
}

export interface LoadingParentsRef {
  hideLoading: () => void;
  showLoading: (text: string) => void;
  updateTextLoading: (text: string) => void;
}

interface LoadingParentsProps {
  spinnerSize?: number;
  spinnerType?: SpinnerType;
  spinnerColor?: string;
}

const LoadingParents = forwardRef(
  (props: LoadingParentsProps, ref: Ref<LoadingParentsRef>) => {
    const timeOutRef = useRef<any>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [textLoading, setTextLoading] = useState('');

    React.useImperativeHandle(ref, () => ({
      hideLoading: hideLoadingParents,
      showLoading: showLoadingParents,
      updateTextLoading: updateTextLoadingParents,
    }));

    useEffect(() => {
      return () => {
        clearTimeout(timeOutRef.current);
      };
    }, []);

    const hideLoadingParents = () => {
      clearTimeout(timeOutRef.current);
      setIsVisible(false);
    };

    const showLoadingParents = (text: string) => {
      timeOutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, TIME_OUT);
      setIsVisible(true);
      setTextLoading(text ?? '');
    };

    const updateTextLoadingParents = (text: string) => {
      setTextLoading(text);
    };

    if (isVisible) {
      return (
        <View style={styles.container}>
          <Spinner
            isVisible
            size={props.spinnerSize ?? ratioW(26)}
            type={props.spinnerType ?? 'Circle'}
            color={props.spinnerColor ?? colors.violet}
          />
          <Text style={styles.textLoading}>{textLoading ?? ''}</Text>
        </View>
      );
    }
    return <View />;
  },
);

export default LoadingParents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blackWithOpacity(0.25),
    position: 'absolute',
    width: '100%',
    height: '100%',
    elevation: 2,
  },
  textLoading: {
    color: colors.white,
    fontSize: 16,
    marginTop: ratioW(10),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    textAlign: 'center',
  },
});
