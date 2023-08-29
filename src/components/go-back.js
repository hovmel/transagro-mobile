import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import BackIcon from "src/assets/icons/go_back.svg";
import {FONTS} from "../themes/constants/fonts";
import {COLORS} from "../themes/constants/colors";

const GoBack = ({navigation, onBeforeGoingBack, doFunctionOnly}) => {
    const onPress = () => {
        if (onBeforeGoingBack) {
            onBeforeGoingBack();

            if (doFunctionOnly) {
                return
            }
        }

        navigation.goBack();
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.wrapper}>
            <BackIcon />
            <Text style={styles.text}>Назад</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        width: '40%'
    },
    text: {
        fontFamily: FONTS.medium,
        color: COLORS.text1,
        marginLeft: 10,
        fontSize: 16,
    },
})

export default GoBack;
