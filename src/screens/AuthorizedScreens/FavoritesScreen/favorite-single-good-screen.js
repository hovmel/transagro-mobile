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


const FavoriteSingleGoodScreen = ({route}) => {
    const navigation = useNavigation();
    const {singleGood} = route.params;
    return (
        <AppWrapper>
            <GoBack navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.goodItem}>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><RubleIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Ставка</Text>
                            <Text style={styles.itemText}>{singleGood?.ruble_per_tonn} руб/т</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><LocationLongIcon /></View>
                        <View style={styles.itemMain}>
                            <Text style={styles.itemTitle}>Откуда</Text>
                            <Text style={styles.itemText}>{singleGood?.upload_city_name}</Text>
                            <View style={styles.line} />
                            <Text style={styles.itemTitle}>Куда</Text>
                            <Text style={styles.itemText}>{singleGood?.onload_city_name}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><LocationIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Адрес принимающей стороны</Text>
                            <Text style={styles.itemText}>{singleGood?.onload_loc_address}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><LocationIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Примерное расстояние</Text>
                            <Text style={styles.itemText}>{singleGood?.distance} км</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><CarIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Наименование груза</Text>
                            <Text style={styles.itemText}>{singleGood?.order_title}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><CarIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Тип кузова</Text>
                            <Text style={styles.itemText}>{JSON.parse(singleGood?.kuzov_type || [])?.join(',  ')}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><CarIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Тип загрузки</Text>
                            <Text style={styles.itemText}>{JSON.parse(singleGood?.loading_type || [])?.join(',  ')}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><BagIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Объем</Text>
                            <Text style={styles.itemText}>{singleGood?.max_volume} тонн</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><WalletIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Тип оплаты</Text>
                            <Text style={styles.itemText}>
                                {singleGood?.payment_type},
                                {singleGood?.payment_nds === 'НДС' ? ' с НДС' : ' без НДС'},
                                {singleGood?.prepaid === '1' ? ' с предоплатой' : ' без предоплаты'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemIcon}><CalendarIcon /></View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Даты погрузки</Text>
                            <Text style={styles.itemText}>
                                {singleGood?.start_date && moment(singleGood?.start_date).format('DD.MM.YY')}
                                {singleGood?.end_date && ' – ' + moment(singleGood?.end_date).format('DD.MM.YY')}
                            </Text>
                        </View>
                    </View>
                    {singleGood?.description && (
                        <View style={styles.item}>
                            <View style={styles.itemIcon}><ChatIcon /></View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>Комментарий</Text>
                                <Text style={styles.itemText}>{singleGood?.description}</Text>
                            </View>
                        </View>
                    )}
                    {singleGood?.manager_name && (
                        <View style={[styles.item, styles.lastItem]}>
                            <View style={styles.itemIcon}><UserIcon /></View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>Менеджер</Text>
                                <Text style={styles.itemText}>{singleGood?.manager_name}</Text>
                                <Text style={styles.itemText}>{singleGood?.manager_phone_number}</Text>
                            </View>
                        </View>
                    )}

                    <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                        {moment(singleGood.created_at).format('HH:mm | DD MMM')}
                    </Text>
                </View>
            </ScrollView>
        </AppWrapper>
    );
};

export default FavoriteSingleGoodScreen;

const styles = StyleSheet.create({
    goodItem: {
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
    itemInfo: {
        width: '88%'
    },
    lastItem: {
        marginBottom: 0,
        borderBottomWidth: 0,
    },
    itemIcon: {
        marginRight: '2%',
        width: '10%',
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
    dateInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateInput: {
        width: '50%'
    },


    goodgo_title: {
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'normal',
        color: '#000'
    },
    goodgo_subtitle: {
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'normal',
        color: '#1f1f1f'
    },
    modal: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingTop: 22,
        paddingHorizontal: 6
    },
    inputBlock: {
        marginBottom: 16
    },
    inputView: {
        width: '48%'
    },
    error: {
        color: COLORS.error,
        fontFamily: FONTS.medium,
        fontSize: 15,
        textAlign: 'center',
        height: 30
    },
})
