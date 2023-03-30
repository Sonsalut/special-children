import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Menu, Modal } from 'react-native-paper'
import { sizeHeight } from 'utils/Utils'

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
    nameChoice =''


}: ChoiceTabProps) => {
    return (
        <>
            {/* Choice Tab */}
            <Modal
                visible={visible}
                style={{
                    backgroundColor: '#E7F6FF',
                    borderRadius: 15,
                    height: 250,
                    marginTop: sizeHeight(42),
                    // alignSelf:'flex-start',
                    width: '90%',
                    marginHorizontal: 20,

                }}
                onDismiss={onDismiss}
                dismissable={false}
            >
                <Menu.Item titleStyle={{ fontSize: 18, color: '#2D5672' }} leadingIcon="file-document-edit-outline" onPress={editCategory} title={`Chỉnh sửa ${nameChoice}`} />
                <Menu.Item titleStyle={{ fontSize: 18, color: '#2D5672' }} leadingIcon="eye-off-outline" onPress={deleteCategory} title={`Xóa ${nameChoice}`} />
                {/* <Menu.Item titleStyle={{ fontSize: 18, color: '#2D5672' }} leadingIcon="book-check" onPress={() => { showToast("Chưa hỗ trợ", 'warning') }} title="Đánh dấu đã học" /> */}
                <Menu.Item titleStyle={{ color: 'red', fontSize: 18 }} leadingIcon="archive-cancel" onPress={cancel} title="Hủy bỏ" />
            </Modal>

        </>
    )
}

export default ChoiceTab

const styles = StyleSheet.create({})