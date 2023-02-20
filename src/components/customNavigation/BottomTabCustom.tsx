import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import colors from 'res/colors';
import {AuthenticatedScreens} from 'routers/ScreenNames';
import images from 'res/images';
import {ratioW} from 'utils/Utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TouchableOpacity from 'components/button/TouchableOpacity';

export const HEIGHT_BOTTOM_TAB = ratioW(64);

function BottomTabCustom({state, descriptors, navigation}: BottomTabBarProps) {
  const insert = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insert.bottom,
          height: HEIGHT_BOTTOM_TAB + insert.bottom,
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        let iconName;
        const isFocused = state.index === index;

        switch (route.name) {
          case AuthenticatedScreens.HomeScreen:
            iconName = isFocused
              ? images.ic_bottom_home_active
              : images.ic_bottom_home;
            break;
          case AuthenticatedScreens.DiscoveryScreen:
            iconName = isFocused
              ? images.ic_bottom_discovery_active
              : images.ic_bottom_discovery;
            break;
          case AuthenticatedScreens.CreatePostScreen:
            iconName = images.ic_bottom_plus;
            break;
          case AuthenticatedScreens.MessageScreen:
            iconName = isFocused
              ? images.ic_bottom_message_active
              : images.ic_bottom_message;
            break;
          case AuthenticatedScreens.ProfileTabScreen:
            iconName = isFocused
              ? images.ic_bottom_profile_active
              : images.ic_bottom_profile;
            break;
          default:
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // @ts-ignore
            navigation.navigate(route.name, {sku: undefined, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.viewItemBottomTab}>
            {route.name === AuthenticatedScreens.CreatePostScreen ? (
              <View style={styles.containerButton}>
                <View style={styles.buttonCreatePost}>
                  <Image source={iconName} />
                </View>
              </View>
            ) : (
              <Image source={iconName} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: ratioW(20),
    borderTopRightRadius: ratioW(20),
    position: 'absolute',
    width: '100%',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16.0,
    elevation: 24,
  },
  viewItemBottomTab: {
    flex: 1,
    padding: ratioW(8),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    width: ratioW(44),
    height: ratioW(44),
    borderRadius: ratioW(22),
    backgroundColor: colors.violetOpacity(0.12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCreatePost: {
    width: ratioW(22),
    height: ratioW(22),
    borderRadius: ratioW(4),
    backgroundColor: colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabCustom;
