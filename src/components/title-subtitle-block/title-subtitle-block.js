import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import AppTitle from "../../components/title/app-title";
import {COLORS} from "../../themes/constants/colors";
import {FONTS} from "../../themes/constants/fonts";

const TitleSubtitleBlock = (props) => {
    const {title, subtitle, paddingRight} = props;
    return (
        <View style={{paddingRight: paddingRight, marginBottom: 20}}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.subTitle}>
                {subtitle}
            </Text>
        </View>
    );
};

export default TitleSubtitleBlock;
const styles = StyleSheet.create({
    title:{
        fontSize: 22,
        fontWeight: '400',
        fontStyle: 'normal',
        color: COLORS.text1,
        marginBottom: 6,
        textAlign: 'center',
        fontFamily: FONTS.medium
    },
    subTitle:{
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: COLORS.subTextLight
    }
})
