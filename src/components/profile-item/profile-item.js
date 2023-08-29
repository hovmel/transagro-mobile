import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {COLORS} from "src/themes/constants/colors";
import {FONTS} from "src/themes/constants/fonts";

const ProfileItem = ({title, subTitle}) => {
    return (
        <View style={{marginBottom: 16}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
    );
};

export default ProfileItem;
const styles = StyleSheet.create({
    title:{
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        fontSize: 15,
        lineHeight: 17,
        marginBottom: 6
    },
    subTitle:{
        color: COLORS.text1,
        fontSize: 16,
        fontFamily: FONTS.light,
        lineHeight: 20,
    }
})
