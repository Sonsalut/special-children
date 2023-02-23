import React from 'react';
import { Container, Text, PopUp } from 'components';
import { Routes, StackNavigationProps } from 'routers/Navigation';
import { AuthenticatedScreens } from 'routers/ScreenNames';
import TouchID from 'react-native-touch-id';
import { store } from 'redux/store';
import authSlice from 'redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import NavigationService from 'routers/NavigationService';

const useLogicMessage = () => {
    const refPopUp: any = React.useRef(null);

    const [supportedBio, setSupportedBio] = React.useState(true)
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const name = store.getState().authReducer.user.accountInfo
    const [confirmLogOut, setConfirmLogOut] = React.useState(false);
    const onPopUpClose = () => {
        console.log('closed modal')
        refPopUp.current?.close();
    }
    const showUp = () => {
        refPopUp.current?.open();
    }
    const optionalConfigObject = {
        title: "Authentication Required", // Android
        color: "#e00606", // Android,
        fallbackLabel: "Show Passcode" // iOS 
    }
    const onToggleSwitch = () => {
        if (!isSwitchOn) {
            TouchID.authenticate('', optionalConfigObject)
                .then((success: any) => {
                    dispatch(authSlice.actions.saveFingerPrint({ fingerPrint: !isSwitchOn }))
                    setIsSwitchOn(!isSwitchOn)
                    console.log(isSwitchOn)
                })
                .catch(error => {
                    console.log("test error")
                });
        }
        else {
            dispatch(authSlice.actions.saveFingerPrint({ fingerPrint: !isSwitchOn }))
            setIsSwitchOn(!isSwitchOn)
            console.log(isSwitchOn)
        }
    };
    const dispatch = useDispatch();

    const logOut = () => {
        setConfirmLogOut(true)
        showUp();
    }

    const cancelLogOut = async () => {
        setConfirmLogOut(false);
        onPopUpClose();
    }

    return {
        logOut, onToggleSwitch,
        refPopUp, name, setIsSwitchOn, isSwitchOn, onPopUpClose, confirmLogOut, cancelLogOut
    };
};

export { useLogicMessage };