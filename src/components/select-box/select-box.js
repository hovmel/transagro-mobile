import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from "react-native";
import {globalStyles} from "src/themes/global_styles/global_styles";

const SelectBox = (props) => {
    const {title, subtitle, onPress} = props
    return (
        <TouchableOpacity onPress={onPress} style={styles.select_box}>
            <Text style={globalStyles.title}>{title}</Text>
            <Text style={globalStyles.description}>{subtitle}</Text>
        </TouchableOpacity>
    );
};

export default SelectBox;
const styles = StyleSheet.create({
    select_box:{
        width: '100%',
        height: 62,
        backgroundColor: '#faf7f7',
        borderRadius: 4,
        paddingHorizontal: 14,
        justifyContent: 'center',
        marginBottom: 12
    },
})
