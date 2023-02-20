
import RowContainer from 'components/container/RowContainer';
import * as React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from 'res/colors';
import { sizeWidth } from 'utils/Utils';
import styles from './styles';
Icon.loadFont();
// import Icon from 'react-native-vector-icons/Ionicons'
//type:'normal' | 'success' | 'warning' | 'danger'|info
const ToastCustom = ({ data, type = '' }: any) => {
  const message = data?.message;
  const onPress = data?.onPress;
  switch (type) {
    case 'normal':
      return (<NormalToast message={message} onPress={onPress} />);
    case 'success':
      return (<SuccessToast message={message} onPress={onPress} />);
    case 'warning':
      return (<WarningToast message={message} onPress={onPress} />);
    case 'danger':
      return (<DangerToast message={message} onPress={onPress} />);
    case 'info':
      return (<InfoToast message={message} onPress={onPress} />)
    default:
      return (<NormalToast message={message} onPress={onPress} />);;
  }
}
interface ToastProps {
  message?: string | JSX.Element,
  onPress?: () => void,
}

const NormalToast = ({ message, onPress }: ToastProps) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <RowContainer style={[styles.container, styles.nomalContainer]}>
      <Icon name='checkmark-circle'
        size={sizeWidth(9)}
        color={"#787878"}
        style={styles.icon} />
      <Text style={styles.label}>{message}</Text>
    </RowContainer>
  </TouchableOpacity>
);
const SuccessToast = ({ message, onPress }: ToastProps) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <RowContainer style={[styles.container, styles.successContainer]}>
      <Icon name='checkmark-circle'
        size={sizeWidth(9)}
        color={"#28C76F"}
        style={styles.icon} />
      <Text style={styles.label}>{message}</Text>
    </RowContainer>
  </TouchableOpacity>
);
const WarningToast = ({ message, onPress }: ToastProps) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <RowContainer style={[styles.container, styles.warningContainer]}>
      <Icon name={'alert-circle'}
        size={sizeWidth(9)}
        color={"#FFBB33"}
        style={styles.icon} />
      <Text style={styles.label}>{message}</Text>
    </RowContainer>
  </TouchableOpacity>
);
const DangerToast = ({ message, onPress }: ToastProps) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <RowContainer style={[styles.container, styles.dangerContainer]}>
      <Icon name={'close-circle'}
        size={sizeWidth(9)}
        color={"#FF4444"}
        style={styles.icon} />
      <Text style={styles.label}>{message}</Text>
    </RowContainer>
  </TouchableOpacity>
);
const InfoToast = ({ message, onPress }: ToastProps) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <RowContainer style={[styles.container, styles.infoContainer]}>
      <Icon name='checkmark-circle'
        size={sizeWidth(9)}
        color={"#66A4D0"}
        style={styles.icon} />
      <Text style={styles.label}>{message}</Text>
    </RowContainer>
  </TouchableOpacity>
);
export default ToastCustom;