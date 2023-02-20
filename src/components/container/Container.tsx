import {HEIGHT_BOTTOM_TAB} from 'components/customNavigation/BottomTabCustom';
import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  ViewStyle,
  View,
  StatusBarProps,
  StatusBarStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from 'res/colors';

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  style?: ViewStyle;
  statusBarProps?: StatusBarProps;
  barStyle?: StatusBarStyle;
  isBottomTab?: boolean;
}

const Container = ({
  style,
  barStyle,
  statusBarProps,
  children,
  isBottomTab = true,
}: ContainerProps) => {
  const insert = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {paddingBottom: isBottomTab ? HEIGHT_BOTTOM_TAB + insert.bottom : 0},
        style,
      ]}>
      <StatusBar
        barStyle={barStyle ?? 'dark-content'}
        translucent
        {...statusBarProps}
        backgroundColor="transparent"
      />
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
