import React from 'react';
import {TouchableOpacity, StyleSheet, View, ActivityIndicator} from "react-native";
import Icon from "src/assets/icons/AddToFavorites.svg";
import IconActive from "src/assets/icons/favorites_full.svg";
import {COLORS} from "../themes/constants/colors";

const FavoritesButton = ({style, isActive, onPress, isDisabled}) => {
    return (
        <View style={[styles.wrapper, style]}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.4} style={styles.button}>
                {isDisabled ? <ActivityIndicator color={COLORS.blue} size={'small'} /> : isActive ? <IconActive /> : <Icon />}
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 10,
        zIndex: 100
    },
    button: {
        padding: 6,
        position: 'absolute',
        right: -8,
        top: -8,
        zIndex: 100
    },
})

export default FavoritesButton;
