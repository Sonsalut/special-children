import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from 'routers/AppNavigator';
import Toast, { ToastProvider } from 'react-native-toast-notifications';
import { toastConfig } from 'utils/Configs';

import { store, persist } from './src/redux/store';

import {
  LoadingManager,
  LoadingParents,
  LoadingParentsRef,
  PopUp,
  PopUpManager,
  PopUpRef,
} from 'components';

import ToastCustom from 'components/toast/ToastCustom';
import { ratioW } from 'utils/Utils';

const App = () => {
  const loadingRef: any = React.useRef<LoadingParentsRef>();
  const popUpRef: any = React.useRef<PopUpRef>();
  const toastRef = React.useRef(null);
  React.useEffect(() => {
    loadingRef && LoadingManager.register(loadingRef);
    popUpRef && PopUpManager.register(popUpRef);

    return () => {
      LoadingManager.unregister(loadingRef);
      PopUpManager.unregister(popUpRef);
    };
  }, []);
  return (
    <>
      <ToastProvider {...toastConfig} renderToast={(toast) => (
        <ToastCustom data={toast} type={toast?.data?.type} />
      )}>
        <Provider store={store}>
          <PersistGate persistor={persist}>
            <AppNavigator />
            <PopUp ref={popUpRef} />
            <Toast ref={toastRef} />
            <LoadingParents ref={loadingRef} spinnerSize={ratioW(60)} />
          </PersistGate>
        </Provider>
      </ToastProvider>
      <></>
    </>
  );
};

export default App;
