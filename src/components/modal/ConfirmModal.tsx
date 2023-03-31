import { StyleProp, StyleSheet, Text, View, ViewStyle, VirtualizedList } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'
import colors from 'res/colors'
import { sizeHeight, sizeWidth } from 'utils/Utils'
import TouchableOpacity from 'components/button/TouchableOpacity'
import Icon from 'react-native-vector-icons/Ionicons'


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
        <>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                style={[styles.logoutModal, style]}
                dismissable={false}
                

            >
                <View style={styles.logOutView}>
                    <Icon name={'warning-outline'}
                        size={sizeWidth(8)}
                        color={"#FF4444"}
                        style={styles.warningIcon} />
                    <View style={{ width: '90%', height: 50 }}>
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
            </Modal>

        </>
    )
}

export default ConfirmModal

const styles = StyleSheet.create({
    logoutModal: {
        backgroundColor: '#E7F6FF',
        borderRadius: 15,
        height: sizeHeight(20),
        marginTop: sizeHeight(35),
        width: sizeWidth(80),
        marginHorizontal: sizeWidth(10),
    },
    logOutView: {
        top: 0,
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
        fontSize: 17, color: colors.black, fontWeight: '500', alignSelf: 'center'
    },
    buttonView: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    closeButton: {
        width: '30%',
        height: 40,
        borderColor: colors.blue,
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: 'center',
        
    },
    logOutButton: {
        width: '30%',
        height: 40,
        backgroundColor: 'red',
        borderRadius: 12,
        justifyContent: 'center'
    },
    logOutText: {
        alignSelf: 'center',
        fontSize: 15,
        color: 'white'
    },
    closeText: {
        alignSelf: 'center',
        fontSize: 15,
        color: colors.blue
    }
})