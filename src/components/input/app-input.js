import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {COLORS} from "src/themes/constants/colors";
import {FONTS} from "../../themes/constants/fonts";

const AppInput = ({placeholder, icon, leftIcon, onPress, value, editable, onChangeText, inputStyles, onPressIcon, color, multiline, label, numeric, style, ...p}) => {
    return (
        onPress ? (
            <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.wrapper}>
                {label && <Text style={{marginBottom: 10}}>{label}</Text>}
                <View style={[styles.input, inputStyles]}>
                    {leftIcon && <View style={[styles.leftIcon, {marginRight: '4%', width: '12%'}]}>{leftIcon}</View>}

                    <View style={styles.borderBottom}>
                        <Text style={styles.inputField}>
                            {value || placeholder}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        ) : (
                <View style={styles.wrapper}>
                    {label && <Text style={{marginBottom: 10}}>{label}</Text>}
                    <View style={[styles.input, inputStyles]}>
                        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                        <TextInput
                            editable={editable}
                            placeholder={placeholder}
                            placeholderTextColor={color ? color : "#333"}
                            value={value}
                            onChangeText={onChangeText}
                            multiline={multiline ? multiline : false}
                            style={[styles.inputField, style]}
                            keyboardType={numeric ? 'numeric' : null}
                            {...p}
                        />
                    </View>
                </View>
            )


    );
};

export default AppInput;
const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 12,
    },
    leftIcon: {
        marginRight: '2%',
        width: '6%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
        width: '100%'
    },
    inputField: {
        height: 'auto',
        width: '100%',
        fontFamily: FONTS.light,
        color: COLORS.black,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
        paddingBottom: 10,
    }
})
