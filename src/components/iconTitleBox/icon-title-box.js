import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import {FONTS} from "../../themes/constants/fonts";
import {COLORS} from "../../themes/constants/colors";

const IconTitleBox = ({ icon, title, center }) => {
    return (
        <View style={styles.row}>
            {icon}
            <Text style={styles.text}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        width: '80%',
    },
    text: {
        fontFamily: FONTS.light,
        color: COLORS.gray,
        fontSize: 16,
        marginLeft: 20
    }
})

export default IconTitleBox;
