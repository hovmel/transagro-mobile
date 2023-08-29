import React from 'react';
import {Text, StyleSheet} from "react-native";
import {COLORS} from "../../themes/constants/colors";
import {FONTS} from "../../themes/constants/fonts";

const AppTitle = (props) => {
    const {title, color} = props;
    return (
        <Text style={[styles.title, {color: color}]}>
            {title}
        </Text>
    );
};

export default AppTitle;
const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        color: COLORS.text1,
        fontFamily: FONTS.regular
    }
})
