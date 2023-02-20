import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedScreens, AuthenticationScreens} from './ScreenNames';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type Routes = {
  //* ************************************ Authentication ************************************* *//
  [AuthenticationScreens.LoginScreen]: undefined;
  [AuthenticationScreens.RegisterScreen]: undefined;
  //* ************************************ Authenticated ************************************* *//
  [AuthenticatedScreens.BottomTabs]: undefined;
  [AuthenticatedScreens.HomeScreen]: undefined;
  [AuthenticatedScreens.RecordingScreen]: undefined;
  [AuthenticatedScreens.JoinWordScreen]: undefined;
  [AuthenticatedScreens.DiscoveryScreen]: undefined;
  [AuthenticatedScreens.CreatePostScreen]: undefined;
  [AuthenticatedScreens.MessageScreen]: undefined;
  [AuthenticatedScreens.ProfileTabScreen]: undefined;
};
