import React from 'react';
import {StyleSheet, Text, View,} from 'react-native'
import {globalStyles} from "src/themes/global_styles/global_styles";
import {COLORS} from "src/themes/constants/colors";
import {FONTS} from "src/themes/constants/fonts";
const TitleBlock = ({title, subtitle}) => {
    return (
        <View style={{marginBottom: 16}}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.subTitle}>
                {subtitle}
            </Text>
        </View>
    );
};

export default TitleBlock;

const styles = StyleSheet.create({
    title: {
        marginBottom: 4,
        maxWidth: '90%',
        color: COLORS.text1,
        fontFamily: FONTS.bold,
        fontSize: 14,
    },
    subTitle: {
        color: COLORS.text1,
        fontSize: 16,
        fontWeight: '400',
        fontFamily: FONTS.regular,
    }
})
