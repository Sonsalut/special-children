import * as React from 'react';
import {NavigationContainerRef, CommonActions} from '@react-navigation/native';
import {Routes} from './Navigation';

const navigationRef = React.createRef<NavigationContainerRef<Routes>>();

function navigate(routeName: any, params?: object) {
  navigationRef.current?.navigate(routeName, params);
}

function reset(routeName: string, params?: object) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
}

function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

export default {
  navigationRef,
  navigate,
  reset,
  goBack,
  
};
