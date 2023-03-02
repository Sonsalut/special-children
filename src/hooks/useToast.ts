import * as React from 'react';
import * as NToast from 'react-native-toast-notifications';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';

const useToast = () => {

  const toast = NToast.useToast();

  const showToast = (
    msg?: string,
    type?: 'normal' | 'success' | 'warning' | 'danger' | 'info' | '',
    onPress?: () => void,
    
    options?: ToastOptions
  ) => {
    toast.show(msg ?? '', {
      data: {
        type: type ?? 'normal'
      },
      onPress: onPress,
      duration: 3000,
      
      ...options
    })
  }

  return showToast;
}

export { useToast }