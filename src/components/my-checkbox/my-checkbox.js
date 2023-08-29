import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FONTS} from "../../themes/constants/fonts";
import {COLORS} from "../../themes/constants/colors";
import Checkbox from "src/assets/icons/checkbox.svg"
import CheckboxEmpty from "src/assets/icons/checkboxEmpty.svg"

const MyCheckbox = ({label, value, setValue, style, onChangeFunction}) => {

    const onPress = () => {
        if (onChangeFunction) {
            onChangeFunction()
        } else {
            setValue(prev => !prev)
        }
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[styles.wrapper, style]}>
            {value ? <Checkbox /> : <CheckboxEmpty />}
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: FONTS.regular,
        color: COLORS.text1,
        fontSize: 14,
        marginLeft: 6
    }

})

export default MyCheckbox;
