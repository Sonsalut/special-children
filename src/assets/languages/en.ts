const CommonString = {
  hello: 'Hello',
  accept: 'Accept',
  cancel: 'Cancel',
  notification: 'Notification',
};

export default {
  hello: CommonString.hello,
  permission: {
    accept: CommonString.accept,
    cancel: CommonString.cancel,
    goToSetting: 'Go to setting',
    titleCamera: CommonString.notification,
    unavailableCamera:
      'Camera is not available. Please check your camera settings.',
    notPermissionCamera:
      'You have not permission to access camera. Please try again.',
    titleMicrophone: CommonString.notification,
    unavailableMicrophone:
      'Microphone is not available. Please check your microphone settings.',
    notPermissionMicrophone:
      'You have not permission to access microphone. Please try again.',
  },
  network: {
    notification: CommonString.notification,
    networkFail:
      'Network is not available. Please check your network settings.',
    timeOut: 'Time out. Please try again.',
    logout401: 'You have been logged out. Please login again.',
  },
};
