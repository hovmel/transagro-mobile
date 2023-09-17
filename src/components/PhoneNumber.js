import React from 'react';
import {TouchableOpacity, Text} from "react-native";
import * as Linking from "expo-linking";
import {COLORS} from "../themes/constants/colors";
import {FONTS} from "../themes/constants/fonts";

const PhoneNumber = ({children, style}) => {
    const onPress = () => {
        if (children && typeof children === 'string') {
            Linking.openURL(`tel:${children}`);
        }
    }

    return (
        <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.6}>
            <Text style={{
                color: COLORS.green,
                fontFamily: FONTS.regular,
                fontSize: 16,
                marginTop: 8,
                textDecorationLine: 'underline'
            }}>{children}</Text>
        </TouchableOpacity>
    );
};

export default PhoneNumber;
