import React, {useState} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from "react-native-modal";
import {getCityApi} from "../../services/API/getCityApi";
import {FONTS} from "../../themes/constants/fonts";
import {COLORS} from "../../themes/constants/colors";
import CloseIcon from "src/assets/icons/close.svg"

const MyModal = ({isVisible, closeFunction, leftButtonText, rightButtonText, onLeftButtonPress, onRightButtonPress, label, selectedLabel, children, rightButtonDisabled, justifyContent = 'space-between'}) => {

    return (
            <Modal
                isVisible={isVisible}
                onBackdropPress={closeFunction}
                onBackButtonPress={closeFunction}
                useNativeDriver={Platform.OS === 'android'}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                backdropOpacity={0.4}
            >
                <View style={styles.modalWrapper}>
                    <View style={styles.closeView}>
                        <TouchableOpacity style={styles.closeIcon} activeOpacity={0.5} onPress={closeFunction}><CloseIcon /></TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        {label && <Text style={styles.mainText}>{label}</Text>}
                        {selectedLabel && <Text style={styles.selectedText}>{selectedLabel}</Text>}
                        {children}
                    </View>
                    <View style={[styles.buttonsRow, {justifyContent}]}>
                        {leftButtonText && (
                            <TouchableOpacity style={[styles.button, styles.left]} activeOpacity={0.6} onPress={onLeftButtonPress}>
                                <Text style={styles.buttonText}>{leftButtonText}</Text>
                            </TouchableOpacity>
                        )}
                        {rightButtonText && (
                            <TouchableOpacity disabled={rightButtonDisabled} style={[styles.button, styles.right, rightButtonDisabled && styles.disabled]} activeOpacity={0.6} onPress={onRightButtonPress}>
                                <Text style={styles.buttonText}>{rightButtonText}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    modalWrapper: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 14,
        maxHeight: Dimensions.get('window').height * 0.7,
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.8,
    },
    container: {
        paddingHorizontal: 20,
    },
    closeView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: 14,
    },
    closeIcon: {
        padding: 6,
    },
    mainText: {
        fontFamily: FONTS.regular,
        color: COLORS.text1,
        fontSize: 16,
        textAlign: 'center',
    },
    selectedText: {
        fontFamily: FONTS.medium,
        color: COLORS.text1,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },
    buttonsRow: {
        flexDirection: 'row',
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 10
    },
    button: {
        width: '45%',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center'
    },
    left: {
        backgroundColor: COLORS.error,
    },
    right: {
        backgroundColor: COLORS.green,
    },
    disabled: {
        opacity: 0.6
    },
    buttonText: {
        fontFamily: FONTS.medium,
        color: COLORS.white,
        fontSize: 16,
    },
})

export default MyModal;
