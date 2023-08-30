import React, {useEffect, useState} from 'react';
import AppWrapper from "src/components/wrapper/app-wrapper";
import {FlatList, Text, StyleSheet, TouchableOpacity, View, ActivityIndicator} from 'react-native'
import {globalStyles} from "src/themes/global_styles/global_styles";
import {useIsFocused} from "@react-navigation/native";
import {
    addCompanyToFavorites,
    addGoodToFavorites,
    deleteFromFavorites,
    getFavorites
} from "src/services/API/favorites_api";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "src/themes/constants/colors";
import Modal from "react-native-modal";
import AppButton from "src/components/button/app-button";
import {FONTS} from "../../../themes/constants/fonts";
import RubleGreenIcon from "../../../assets/icons/ruble_green.svg";
import LocationShortIcon from "../../../assets/icons/location_short.svg";
import LongArrowRightIcon from "../../../assets/icons/long_arrow_right.svg";
import moment from "moment";
import RubleGrayIcon from "../../../assets/icons/ruble_gray.svg";
import LocationShortGrayIcon from "../../../assets/icons/location_short_gray.svg";
import LongArrowRightGrayIcon from "../../../assets/icons/arrow_right_gray.svg";
import FavoritesButton from "../../../components/favoritesButton";
import {setFavorites} from "../../../store/actions/favorites";
import LocationIcon from "../../../assets/icons/location.svg";
import SmsIcon from "../../../assets/icons/SmsIcon.svg";
import FirmsItem from "../../../components/firms-item/firms-item";
import MyModal from "../../../components/my-modal/my-modal";

const FavoritesScreen = ({navigation}) => {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const userData = useSelector((store) => store.user_data.user_data)

    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const favorites = useSelector((store) => store.favorites.favorites)
    const isPaymentWorking = useSelector((store) => store.user_data.user_data)?.isPaymentWorking === '1';
    const isSubscribed = useSelector((store) => store.user_data.isSubscribed);


    const [activeScreen, setActiveScreen] = useState('goods')
    const [movingLoading, setMovingLoading] = useState(false)
    const [favoritesLoading, setFavoritesLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)



    const changeActiveScreen = val => () => {
        if (activeScreen === val) {
            return
        }

        setActiveScreen(val);
    }

    useEffect(() => {
        getFavorites(tokenFromReducer).then();
    }, [isFocused])

    const onFavoritesGoodsPress = async (item) => {
        try {
            setFavoritesLoading(true);

            const res = await deleteFromFavorites(tokenFromReducer, {order_id: item.id, order_type: 'goods'});

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

    const onFavoritesRidesPress = async (item) => {
        try {
            setFavoritesLoading(true);

            const res = await deleteFromFavorites(tokenFromReducer, {order_id: item.id, order_type: 'ride'});

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

    const onFavoritesCompanyPress = async (item) => {
        try {
            setFavoritesLoading(true);

            const res = await deleteFromFavorites(tokenFromReducer, {order_id: item.id, order_type: 'company'});

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

    const onFirmPress = item => {
        if (isSubscribed || !isPaymentWorking) {
            navigation.navigate('FavoriteSingleFirmScreen', {firmData: item})
        } else {
            setModalVisible(true)
        }
    }

    const goToSubscriptions = () => {
        setModalVisible(false)
        navigation.navigate('Подписка')
    }

    const renderGoodItem = ({item}) => (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
                navigation.navigate('FavoriteSingleGoodScreen', { singleGood: item })
            }}
            style={styles.item}>
            <FavoritesButton
                onPress={() => onFavoritesGoodsPress(item)}
                isActive
                isDisabled={favoritesLoading}
            />
            <View style={styles.upperRow}>
                <View style={styles.upperRowLeft}>
                    <RubleGreenIcon />
                    <Text style={styles.rublePerTonnText}>{item.ruble_per_tonn} руб/т</Text>
                </View>
            </View>
            <View style={styles.line} />
            <View style={[styles.row, styles.withMarginBottom]}>
                <View style={styles.iconView}><LocationShortIcon /></View>
                <View style={styles.citiesBlock}>
                    <View style={[styles.row, styles.withMarginBottom]}>
                        <Text style={[styles.cityName, styles.short]} numberOfLines={1}>{item.upload_city_name}</Text>
                        <View style={styles.arrowView}>
                            <LongArrowRightIcon />
                        </View>
                        <Text style={styles.distance}>{item.distance}км</Text>
                    </View>
                    <Text style={styles.cityName} numberOfLines={1}>{item.onload_city_name}</Text>
                </View>
            </View>

            <Text style={[styles.itemText, styles.withMarginBottom]}>
                Объём {item.max_volume}т
            </Text>

            <Text style={[styles.itemText, styles.withMarginBottom]}>{item.order_title}</Text>

            <Text style={[styles.itemText]}>
                {moment(item.start_date).format('DD MMM')}
                {item.end_date && ' – ' + moment(item.end_date).format('DD MMM')}
            </Text>

            <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                {moment(item.created_at).format('HH:mm | DD MMM')}
            </Text>
        </TouchableOpacity>
    )

    const renderCarItem = ({item}) => (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
                navigation.navigate('FavoriteSingleCarScreen', {singleCar: item})
            }}
            style={styles.cargo_item}>
            <FavoritesButton
                onPress={() => onFavoritesRidesPress(item)}
                isActive
                isDisabled={favoritesLoading}
            />

            <View style={[styles.row, styles.withMarginBottom]}>
                <View style={styles.iconView}><LocationShortIcon /></View>
                <View style={styles.citiesBlock}>
                    <View style={[styles.row, styles.withMarginBottom]}>
                        <Text style={styles.cityName}>{item.upload_city_name}</Text>
                        <View style={styles.arrowView}>
                            <LongArrowRightIcon />
                        </View>
                    </View>
                    <Text style={styles.cityName}>{item.onload_city_name}</Text>
                </View>
            </View>

            <View style={[styles.row, styles.withMarginBottom]}>
                {item?.kuzov_type && (
                    <Text style={[styles.itemText]}>{JSON.parse(item.kuzov_type)?.join(',  ')}</Text>
                )}
            </View>

            {item.manager_name && (
                <>
                    <Text style={[styles.itemText, styles.withMarginBottom]}>{item.manager_name}</Text>
                    <Text style={[styles.itemText]}>{item.manager_phone_number}</Text>
                </>
            )}

            <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                {moment(item.created_at).format('HH:mm | DD MMM')}
            </Text>
        </TouchableOpacity>
    )

    const renderCompanyItem = ({item}) => (
        <FirmsItem
            onPressItem={() => onFirmPress(item)}
            onFavoritesPress={onFavoritesCompanyPress}
            favoritesLoading={favoritesLoading}
            item={item}
            isInFavorites
        />
    )

    return (
        <AppWrapper>
            <View style={{flex: 1}}>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity disabled={activeScreen === 'goods'} activeOpacity={0.5} style={[styles.button, activeScreen === 'goods' && styles.active]} onPress={changeActiveScreen('goods')}>
                        <Text style={[styles.buttonText, activeScreen === 'goods' && styles.activeText]}>Грузы</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={activeScreen === 'rides'} activeOpacity={0.5} style={[styles.button, activeScreen === 'rides' && styles.active]} onPress={changeActiveScreen('rides')}>
                        <Text style={[styles.buttonText, activeScreen === 'rides' && styles.activeText]}>Машины</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={activeScreen === 'companies'} activeOpacity={0.5} style={[styles.button, activeScreen === 'companies' && styles.active]} onPress={changeActiveScreen('companies')}>
                        <Text style={[styles.buttonText, activeScreen === 'companies' && styles.activeText]}>Фирмы</Text>
                    </TouchableOpacity>
                </View>
                {movingLoading && <ActivityIndicator color={COLORS.green} style={{marginVertical: 16}} size={'large'} />}
                <FlatList
                    renderItem={activeScreen === 'goods' ? renderGoodItem : activeScreen === 'rides' ? renderCarItem : renderCompanyItem}
                    data={activeScreen === 'goods' ? favorites?.goods : activeScreen === 'rides' ? favorites?.ride : favorites?.companies}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <MyModal
                isVisible={modalVisible}
                closeFunction={() => setModalVisible(false)}
                label={`Для просмотра полной информации о фирме ${isPaymentWorking ? 'оплатите подписку на нашем сайте' : 'получите подписку в нашем приложении'}`}
                leftButtonText={'Отмена'}
                rightButtonText={`${isPaymentWorking ? 'Оплатить' : 'Получить'}`}
                onLeftButtonPress={() => setModalVisible(false)}
                onRightButtonPress={goToSubscriptions}
            />
        </AppWrapper>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    button: {
        width: '33%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
        paddingVertical: 8,
    },
    buttonText: {
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        fontSize: 16,
        textAlign: 'center'
    },
    active: {
        borderBottomColor: COLORS.text1,
    },
    activeText: {
        color: COLORS.text1,
    },
    addButtonStyle: {
        height: 30,
        width: 160
    },

    cargo_item: {
        width: '100%',
        backgroundColor: '#FFFEF5',
        marginBottom: 12,
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: COLORS.yellow,
    },

    item: {
        width: '100%',
        backgroundColor: '#F5FAFF',
        marginBottom: 12,
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: COLORS.blue,
    },
    disabledItem: {
        width: '100%',
        backgroundColor: '#FAFAFA',
        marginBottom: 12,
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: '#878787',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    citiesBlock: {
        marginLeft: 8,
    },
    cityName: {
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        fontSize: 16,
        maxWidth: '95%'
    },
    short: {
        maxWidth: '60%'
    },
    distance: {
        color: COLORS.text1,
        fontFamily: FONTS.bold,
        fontSize: 16,
        marginLeft: 10
    },
    withMarginBottom: {
        marginBottom: 10
    },
    arrowView: {
        marginLeft: 8
    },
    itemText: {
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        fontSize: 15,
    },

    upperRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    upperRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rublePerTonnText: {
        fontFamily: FONTS.medium,
        color: COLORS.green,
        marginLeft: 10,
        fontSize: 16
    },
    disableButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        borderColor: COLORS.blue,
        borderWidth: 1
    },
    disabledDisableButton: {
        opacity: 0.6
    },
    disableButtonText: {
        fontFamily: FONTS.medium,
        color: COLORS.blue,
    },

    line: {
        borderBottomColor: COLORS.inputBorder,
        borderBottomWidth: 1,
        marginVertical: 8
    },
    grayText: {
        color: '#4B4B4B'
    },
})
