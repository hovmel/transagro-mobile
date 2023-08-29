import React from 'react';
import {TouchableOpacity, StyleSheet, Text, ActivityIndicator, View} from "react-native";
import {COLORS} from "src/themes/constants/colors";
import {FONTS} from "../../themes/constants/fonts";

const AppButton = ({buttonTitle, isDeleteStyle, isSecondStyle, onPress, disabled, loading, loadingColor, selectButton, selectTitle, onPressSelect, noBorder, style, icon}) => {
    return (
        !selectButton ? (
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={[styles.button, isSecondStyle && styles.secondButton, disabled && styles.disabled, isDeleteStyle && styles.deleteButton, style]}
                    onPress={onPress} disabled={disabled || loading}
                >
                    {loading ? <ActivityIndicator color={loadingColor || '#fff'} size={'small'}/> : (
                        <>
                            {icon && <View style={styles.iconView}>{icon}</View>}
                            <Text style={[styles.button_title, isSecondStyle && styles.secondButtonTitle]}>{buttonTitle}</Text>
                        </>
                    )}
                </TouchableOpacity>
            )
            :
            (
                <TouchableOpacity activeOpacity={0.6} style={[styles.selectItem, noBorder && styles.noBorder, style]} onPress={onPressSelect}>
                    <Text style={styles.selectItemTitle}>
                        {selectTitle}
                    </Text>
                </TouchableOpacity>
            )
    )
};

export default AppButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 46,
        backgroundColor: COLORS.green,
        borderRadius: 73,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.green,
    },
    secondButton: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.text1,
    },
    button_title: {
        fontSize: 16,
        color: '#fff',
        fontFamily: FONTS.medium
    },
    secondButtonTitle: {
        color: COLORS.text1,
    },
    deleteButton: {
        backgroundColor: COLORS.red,
        borderColor: COLORS.red,
    },
    disabled: {
        opacity: 0.5
    },
    loading: {
        backgroundColor: 'rgba(100,184,42,0.4)'
    },
    selectItem: {
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D4D8DF',
        width: '80%',
        marginBottom: 12,
    },
    noBorder: {
        borderBottomWidth: 0
    },
    iconView: {
        marginRight: 6
    },
    selectItemTitle:{
        fontSize: 18,
        color: COLORS.text1,
        paddingBottom: 16,
        textAlign: 'center',
        fontFamily: FONTS.medium
    }
})
