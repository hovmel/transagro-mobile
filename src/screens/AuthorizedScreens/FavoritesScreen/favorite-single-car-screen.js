import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import {COLORS} from "src/themes/constants/colors";
import GoodIcon from "src/assets/icons/good.svg"
import BagIcon from "src/assets/icons/bag.svg"
import WalletIcon from "src/assets/icons/wallet.svg"
import ChatIcon from "src/assets/icons/message.svg"
import UserIcon from "src/assets/icons/user.svg"
import LocationLongIcon from "src/assets/icons/location_long.svg"
import RubleIcon from "src/assets/icons/ruble.svg"
import LocationIcon from "src/assets/icons/location.svg"
import CarIcon from "src/assets/icons/car.svg"
import CalendarIcon from "src/assets/icons/calendar.svg"
import {FONTS} from "../../../themes/constants/fonts";
import {useNavigation} from "@react-navigation/native";
import AppButton from "../../../components/button/app-button";
import GoBack from "../../../components/go-back";
import {kuzovTypes, loadingTypes, materialTypes} from "../../../themes/constants/types";
import {useSelector} from "react-redux";
import OtkudaKuda from "../../../components/otkuda-kuda/otkuda-kuda";
import MySelectCheckbox from "../../../components/my-select-checkbox/my-select-checkbox";
import AppInput from "../../../components/input/app-input";
import MySelect from "../../../components/my-select/my-select";
import MessageIcon from "../../../assets/icons/message.svg";
import Clean from "../../../components/clean/clean";
import {deleteCargo, editCargo} from "../../../services/API/getAndCreateCargo";
import MyModal from "../../../components/my-modal/my-modal";
import moment from "moment/moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectPayment from "../../../components/select-payment/select-payment";
import {duplicateArray} from "../../../services/helpers/duplicateArray";


const FavoriteSingleCarScreen = ({route}) => {
    const navigation = useNavigation();
    const {singleCar} = route.params;
    return (
        <AppWrapper>
            <GoBack navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.carItem}>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><LocationIcon /></View>
                        <View style={styles.itemMain}>
                            <Text style={styles.itemTitle}>Выезд из</Text>
                            <Text style={styles.itemText}>{singleCar?.upload_city_name}</Text>
                            <View style={styles.line} />
                            <Text style={styles.itemTitle}>Прибытие в</Text>
                            <Text style={styles.itemText}>{singleCar?.onload_city_name}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><CarIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Тип кузова</Text>
                            <Text style={styles.itemText}>{JSON.parse(singleCar?.kuzov_type || [])?.join(',  ')}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><BagIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Объем</Text>
                            <Text style={styles.itemText}>{singleCar?.max_volume} тонн</Text>
                        </View>
                    </View>
                    {singleCar?.description && (
                        <View style={styles.item}>
                            <View style={styles.itemIcon}><ChatIcon /></View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>Комментарий</Text>
                                <Text style={styles.itemText}>{singleCar?.description}</Text>
                            </View>
                        </View>
                    )}
                    {singleCar?.manager_name && (
                        <View style={[styles.item, styles.lastItem]}>
                            <View style={styles.itemIcon}><UserIcon /></View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>Менеджер</Text>
                                <Text style={styles.itemText}>{singleCar?.manager_name}</Text>
                                <Text style={styles.itemText}>{singleCar?.manager_phone_number}</Text>
                            </View>
                        </View>
                    )}

                    <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                        {moment(singleCar.created_at).format('HH:mm | DD MMM')}
                    </Text>
                </View>
            </ScrollView>
        </AppWrapper>
    );
};

export default FavoriteSingleCarScreen;

const styles = StyleSheet.create({
    /*carItem:{
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#F5FAFF',
        borderColor: COLORS.blue,
        padding: 12
    },*/
    reviewBlock: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.yellow,
        padding: 12,
        marginTop: 10,
        backgroundColor: '#FFFEF5',
        marginBottom: 30
    },
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
    },
    placeholder: {
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        fontSize: 16,
        marginBottom: 14
    },
    button: {
        height: 32,
        marginTop: 20,
        marginLeft: 'auto',
        width: '50%'
    },

    carItem: {
        width: '100%',
        backgroundColor: '#F5FAFF',
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: COLORS.blue,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        marginTop: 6,
        marginBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#C2D0E1',
        width: '100%',
    },
    item: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#C2D0E1',
        paddingBottom: 10,
        flexDirection: 'row'
    },
    lastItem: {
        marginBottom: 0,
        borderBottomWidth: 0,
    },
    itemIcon: {
        marginRight: '2%',
        width: '10%',
    },
    itemInfo: {
        width: '88%'
    },
    itemMain: {
        width: '88%',
    },
    itemTitle: {
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        fontSize: 14,
        marginBottom: 6
    },
    itemText: {
        color: COLORS.gray,
        fontFamily: FONTS.regular,
        fontSize: 16,
    },
    withMarginBottom: {
        marginBottom: 10
    },
    arrowView: {
        marginLeft: 8
    },
    buttons: {
        marginTop: 50
    },
})
