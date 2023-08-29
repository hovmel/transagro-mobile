import {StyleSheet} from "react-native";
import {COLORS} from "src/themes/constants/colors";
import {FONTS} from "src/themes/constants/fonts";

export const globalStyles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: COLORS.gray,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 20,
        fontFamily: FONTS.regular
    },
    title: {
        fontWeight: '700',
        color: COLORS.gray,
        fontStyle: 'normal',
        fontSize: 21,
        lineHeight: 26
    },
    description: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        color: '#3A3A3A'
    }
})
