import React, {useState} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from "../../themes/constants/colors";
import RefreshIcon from "src/assets/icons/refresh.svg"
import {FONTS} from "../../themes/constants/fonts";

const Clean = ({style, onPress}) => {
    return (
        <View style={[styles.wrapper, style]}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.button}>
                <RefreshIcon />
                <Text style={styles.text}>Очистить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        textDecorationLine: 'underline',
        fontSize: 15
    }

})

export default Clean;
