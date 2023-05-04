import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Menu, Modal } from 'react-native-paper'
import { checkIpad, fontSize, isPortrait, sizeHeight, sizeWidth } from 'utils/Utils'

interface ChoiceTabProps {
    visible?: boolean,
    onDismiss?: () => void,
    editCategory?: () => void,
    deleteCategory?: () => void,
    cancel?: () => void,
    nameChoice?: string
}
const ChoiceTab = ({
    visible = false,
    onDismiss,
    editCategory,
    deleteCategory,
    cancel,
    nameChoice = ''


}: ChoiceTabProps) => {
    return (
        <>
            {/* Choice Tab */}
            <Modal
                visible={visible}
                style={isPortrait() ? {
                    backgroundColor: 'white',
                    // backgroundColor: '#E7F6FF',
                    borderRadius: sizeWidth(3),
                    height: sizeHeight(20),
                    marginTop: sizeHeight(42),
                    width: sizeWidth(80),
                    marginLeft: sizeWidth(10),
                } : {
                    backgroundColor: 'white',
                    // backgroundColor: '#E7F6FF',
                    borderRadius: sizeWidth(3),
                    height: checkIpad() ? sizeWidth(30) : sizeWidth(30),
                    marginTop: sizeWidth(40),
                    width: checkIpad() ? sizeHeight(60) : sizeHeight(40),
                    marginLeft: checkIpad() ? sizeHeight(20) : sizeWidth(10),
                    borderWidth:1
                    
                }}
                onDismiss={onDismiss}
                dismissable={false}
            >
                <Menu.Item titleStyle={{ fontSize: checkIpad() ? fontSize(2.3) : fontSize(4), color: '#2D5672' }} leadingIcon="file-document-edit-outline" onPress={editCategory} title={`Chỉnh sửa ${nameChoice}`} />
                <Menu.Item titleStyle={{ fontSize: checkIpad() ? fontSize(2.3) : fontSize(4), color: '#2D5672' }} leadingIcon="eye-off-outline" onPress={deleteCategory} title={`Xóa ${nameChoice}`} />
                {/* <Menu.Item titleStyle={{ fontSize: 18, color: '#2D5672' }} leadingIcon="book-check" onPress={() => { showToast("Chưa hỗ trợ", 'warning') }} title="Đánh dấu đã học" /> */}
                <Menu.Item titleStyle={{ color: 'red', fontSize: checkIpad() ? fontSize(2.3) : fontSize(4) }} leadingIcon="archive-cancel" onPress={cancel} title="Hủy bỏ" />
            </Modal>

        </>
    )
}

export default ChoiceTab

const styles = StyleSheet.create({})