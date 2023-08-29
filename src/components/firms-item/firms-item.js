import React from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity} from "react-native";
import {globalStyles} from "src/themes/global_styles/global_styles";
import {COLORS} from "src/themes/constants/colors";
import AddToFavorites from 'src/assets/icons/AddToFavorites.svg'
import LocationIcon from 'src/assets/icons/location.svg'
import SmsIcon from 'src/assets/icons/SmsIcon.svg'
import SearchIcon from 'src/assets/icons/SearchIcon.svg'
import {FONTS} from "src/themes/constants/fonts";
import FavoritesButton from "../favoritesButton";
import moment from "moment/moment";

const FirmsItem = ({item, onFavoritesPress, favoritesLoading, isInFavorites, onPressItem}) => {
    return (
        <TouchableOpacity onPress={onPressItem} activeOpacity={0.6} style={styles.item_box}>
            <FavoritesButton
                onPress={() => onFavoritesPress(item)}
                isDisabled={favoritesLoading}
                isActive={isInFavorites}
            />
            <View style={styles.item_title_box}>
                <Text style={styles.title}>{item.company_name}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 14}}>
                <Text style={styles.title}>ИНН</Text>
                <Text style={styles.subtitle}>{item.inn}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 13, alignItems: 'center'}}>
                <View style={{width: 12, marginLeft: 2}}>
                    <LocationIcon/>
                </View>
                <Text style={styles.subtitle}>{item.legal_address}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 14}}>
                    <SmsIcon/>
                </View>
                <Text style={styles.subtitle}>{item.email}</Text>
            </View>

            <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                {moment(item.created_at).format('HH:mm | DD MMM')}
            </Text>
        </TouchableOpacity>
    );
};

export default FirmsItem;

const styles = StyleSheet.create({
    item_box: {
        width: '100%',
        backgroundColor: '#F6FFF5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.green,
    },
    email: {
        color: COLORS.globalBlue,
        fontSize: 16
    },
    item_title_box: {
        flexDirection: "row",
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#C2D0E1',
        marginBottom: 12,
        paddingBottom: 6,
    },
    title: {
        marginBottom: 4,
        maxWidth: '90%',
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 20,
    },
    subtitle: {
        color: COLORS.text1,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: FONTS.regular,
        marginLeft: 12,
    }
})
