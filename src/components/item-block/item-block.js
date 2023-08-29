import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {COLORS} from "src/themes/constants/colors";
import {globalStyles} from "src/themes/global_styles/global_styles";
import ProfileIcon from "src/assets/icons/profile-icon";

const ItemBlock = (props) => {
    const {title, description, icon, onPress} = props
    return (
        <TouchableOpacity style={styles.item_block}>
            <View style={{marginBottom: 4}}>
                <Text style={globalStyles.title}>{title}</Text>
            </View>
            <View>
                <Text style={globalStyles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ItemBlock;

const styles = StyleSheet.create({
    item_block:{
        width: '48%',
        height: 159,
        backgroundColor: COLORS.invertLight,
        borderRadius: 12,
        padding: 12
    },
})
