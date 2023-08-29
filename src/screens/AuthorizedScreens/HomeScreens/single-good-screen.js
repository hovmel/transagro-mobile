import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import {COLORS} from "src/themes/constants/colors";
import CarIcon from "src/assets/icons/car.svg"
import BagIcon from "src/assets/icons/bag.svg"
import ChatIcon from "src/assets/icons/message.svg"
import UserIcon from "src/assets/icons/user.svg"
import LocationIcon from "src/assets/icons/location.svg"
import {FONTS} from "../../../themes/constants/fonts";
import GoBack from "../../../components/go-back";
import RubleIcon from "../../../assets/icons/ruble.svg";
import LocationLongIcon from "../../../assets/icons/location_long.svg";
import WalletIcon from "../../../assets/icons/wallet.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";
import moment from "moment";
import FavoritesButton from "../../../components/favoritesButton";
import {addGoodToFavorites, deleteFromFavorites, getFavorites} from "../../../services/API/favorites_api";
import {setFavorites} from "../../../store/actions/favorites";
import {useDispatch, useSelector} from "react-redux";
import FirmIcon from "../../../assets/icons/firm.svg";
import AppButton from "../../../components/button/app-button";

const SingleGoodScreen = ({route, navigation}) => {
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const favoritesIds = useSelector((store) => store.favorites.favoritesIds)

    const dispatch = useDispatch();
    const {singleGood} = route.params;

    const [favoritesLoading, setFavoritesLoading] = useState(false);


    const onFavoritesPress = async (item) => {
        try {
            setFavoritesLoading(true);

            let res;
            if (favoritesIds?.goods?.includes(item.id)) {
                res = await deleteFromFavorites(tokenFromReducer, {order_id: item.id, order_type: 'goods'});
            } else {
                res = await addGoodToFavorites(tokenFromReducer, {goods_id: item.id});
            }
            if (res.success) {
                const favs = await getFavorites(tokenFromReducer);
                if (favs.success) {
                    dispatch(setFavorites(favs))
                }
            }
            console.log(res)
        } catch (e) {
            console.log(e)
        } finally {
            setFavoritesLoading(false);
        }
    }

    return (
        <AppWrapper>
            <GoBack navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.goodItem}>
                        <FavoritesButton
                            onPress={() => onFavoritesPress(singleGood)}
                            isActive={favoritesIds?.goods?.includes(singleGood?.id)}
                            isDisabled={favoritesLoading}
                        />
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
                        <View style={[styles.item, !singleGood?.manager_name && !singleGood?.description && styles.lastItem]}>
                            <View style={styles.itemIcon}><FirmIcon /></View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>Фирма</Text>
                                {singleGood?.company_name ? (
                                    <Text style={styles.itemText}>{singleGood?.company_name}</Text>
                                ) : (
                                    <AppButton onPress={() => navigation.navigate('Подписка')} style={{marginTop: 20, width: '84%', height: 40}} buttonTitle={'Получить доступ'} />
                                )}
                            </View>
                        </View>
                        {singleGood?.order_description && (
                            <View style={styles.item}>
                                <View style={styles.itemIcon}><ChatIcon /></View>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle}>Комментарий</Text>
                                    <Text style={styles.itemText}>{singleGood?.order_description}</Text>
                                </View>
                            </View>
                        )}
                        {!!singleGood?.manager_name && (
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
                            {moment(singleGood?.created_at).format('HH:mm | DD MMM')}
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </AppWrapper>
    );
};

export default SingleGoodScreen;

const styles = StyleSheet.create({
    container: {
    },
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


    cargo_title: {
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'normal',
        color: '#000'
    },
    cargo_subtitle: {
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
