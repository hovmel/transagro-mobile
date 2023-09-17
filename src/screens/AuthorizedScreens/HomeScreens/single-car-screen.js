import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import {COLORS} from "src/themes/constants/colors";
import CarIcon from "src/assets/icons/car.svg"
import BagIcon from "src/assets/icons/bag.svg"
import ChatIcon from "src/assets/icons/message.svg"
import UserIcon from "src/assets/icons/user.svg"
import LocationIcon from "src/assets/icons/location_long.svg"
import FirmIcon from "src/assets/icons/firm.svg"
import {FONTS} from "../../../themes/constants/fonts";
import GoBack from "../../../components/go-back";
import FavoritesButton from "../../../components/favoritesButton";
import {useDispatch, useSelector} from "react-redux";
import {
    addGoodToFavorites,
    addRideToFavorites,
    deleteFromFavorites,
    getFavorites
} from "../../../services/API/favorites_api";
import {setFavorites} from "../../../store/actions/favorites";
import AppButton from "../../../components/button/app-button";
import moment from "moment/moment";
import PhoneNumber from "../../../components/PhoneNumber";

const SingleCarScreen = ({route, navigation}) => {
    const {singleCar, isOtherCompaniesCar} = route.params;
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const favoritesIds = useSelector((store) => store.favorites.favoritesIds)

    const dispatch = useDispatch();
    const [favoritesLoading, setFavoritesLoading] = useState(false);


    const onFavoritesPress = async (item) => {
        try {
            setFavoritesLoading(true);

            let res;
            if (favoritesIds?.rides?.includes(item.id)) {
                res = await deleteFromFavorites(tokenFromReducer, {order_id: item.id, order_type: 'ride'});
            } else {
                res = await addRideToFavorites(tokenFromReducer, {ride_id: item.id});
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
                <View style={styles.container}>
                    <View style={styles.carItem}>
                        <FavoritesButton
                            onPress={() => onFavoritesPress(singleCar)}
                            isActive={favoritesIds?.rides?.includes(singleCar?.id)}
                            isDisabled={favoritesLoading}
                        />
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
                        <View style={[styles.item]}>
                            <View style={styles.itemIcon}><BagIcon /></View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>Грузоподъёмность</Text>
                                <Text style={styles.itemText}>{singleCar?.max_volume} тонн</Text>
                            </View>
                        </View>
                        <View style={[styles.item, !singleCar?.manager_name && !singleCar?.description && styles.lastItem]}>
                            <View style={styles.itemIcon}><FirmIcon /></View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>Фирма</Text>
                                {singleCar?.company_name ? (
                                    <Text style={styles.itemText}>{singleCar?.company_name}</Text>
                                ) : (
                                    <AppButton onPress={() => navigation.navigate('Подписка')} style={{marginTop: 20, width: '84%', height: 40}} buttonTitle={'Получить доступ'} />
                                )}
                            </View>
                        </View>
                        {singleCar?.description && (
                            <View style={[styles.item, !singleCar?.manager_name && styles.lastItem]}>
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
                                    <PhoneNumber>{singleCar?.manager_phone_number}</PhoneNumber>
                                </View>
                            </View>
                        )}
                    </View>

                    <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -24, marginRight: 12}}>
                        {moment(singleCar.created_at).format('HH:mm | DD MMM')}
                    </Text>
                </View>
        </AppWrapper>
    );
};

export default SingleCarScreen;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height
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
