import { StyleProp, StyleSheet, Text, View, ViewStyle, VirtualizedList } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'
import colors from 'res/colors'
import { checkIpad, fontSize, isPortrait, sizeHeight, sizeWidth } from 'utils/Utils'
import TouchableOpacity from 'components/button/TouchableOpacity'
import Icon from 'react-native-vector-icons/Ionicons'
import ReactNativeModal from 'react-native-modal';



interface ConfirmModalProps {
    visible?: boolean,
    onDismiss?: ()=>void,
    text1?: string,
    text2?: string,
    handleCancel?:()=>void,
    handleConfirm?:()=>void,
    confirmText?: string,
    style?: StyleProp<ViewStyle>


}
const ConfirmModal = ({
    visible = false,
    onDismiss,
    text1,
    text2,
    handleCancel,
    handleConfirm,
    confirmText,
    style
}: ConfirmModalProps) => {
    return (
        // <>
            <ReactNativeModal
                isVisible={visible}
                onDismiss={onDismiss}
                style={styles.logoutModal}
                backdropColor='gray'
                backdropOpacity={0.6}
            >
                <View style={styles.logOutView}>
                    {/* <Icon name={'warning-outline'}
                        size={sizeWidth(8)}
                        color={"#FF4444"}
                        style={styles.warningIcon} /> */}
                    <View style={{ marginTop: '7%',width: '100%', height: 50 }}>
                        <Text style={styles.warnText}>{text1}</Text>
                        <Text style={styles.warnText}>{text2}</Text>


                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity activeOpacity={0.7} onPress={handleCancel} style={styles.closeButton}>
                            <Text style={styles.closeText}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={handleConfirm} style={styles.logOutButton}>
                            <Text style={styles.logOutText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>

        // </>
    )
}

export default ConfirmModal

const styles = StyleSheet.create({
    logoutModal: isPortrait() ? {
        backgroundColor: 'white',
        borderRadius: 10,
        // borderWidth:1,
        marginTop: sizeHeight(85),
        marginBottom: sizeHeight(0),
        width: '100%',
        alignSelf: 'center'
        // marginHorizontal: sizeWidth(-1),
    } : {
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: sizeHeight(42),
        marginBottom: sizeHeight(45),
        width: sizeHeight(50),
        marginHorizontal: sizeHeight(25),
    },

    logOutView: {
        alignItems: 'center',
        width: "100%",
        height: "100%",
        borderRadius: 15,
        justifyContent: 'space-around'
    },
    warningIcon: {
        padding: sizeWidth(1),
        paddingLeft: sizeWidth(3),
    },
    warnText: {
        fontSize: checkIpad() ? fontSize(2) : 17, 
        color: colors.text_blue, 
        fontWeight: '500', 
        alignSelf: 'center',
        // borderWidth:1
    },
    buttonView: {
        width: '100%',
        height: sizeHeight(5),
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        marginBottom: sizeHeight(3),
        // borderWidth:1
    },
    closeButton: {
        width: '30%',
        height: sizeHeight(4),
        borderColor: colors.orange,
        borderWidth: 1,
        borderRadius: sizeHeight(1),
        justifyContent: 'center',
        
    },
    logOutButton: {
        width: '30%',
        height: sizeHeight(4),
        backgroundColor: '#DE4841',
        borderRadius: sizeHeight(1),
        justifyContent: 'center'
    },
    logOutText: {
        alignSelf: 'center',
        fontSize: checkIpad() ? fontSize(2) :15,
        color: 'white'
    },
    closeText: {
        alignSelf: 'center',
        fontSize: checkIpad() ? fontSize(2) :15,
        color: colors.orange
    }
})