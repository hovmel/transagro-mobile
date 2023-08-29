import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {COLORS} from "../../../themes/constants/colors";
import AppWrapper from "../../../components/wrapper/app-wrapper";
import PackIcon from "../../../assets/icons/no_goods.svg";
import AppButton from "../../../components/button/app-button";
import AddIcon from "../../../assets/icons/add.svg";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {getCargoList, setMakeDisabled} from "../../../services/API/getAndCreateCargo";
import {setCargoArray} from "../../../store/actions/cargo_list";
import {useDispatch, useSelector} from "react-redux";
import {FONTS} from "../../../themes/constants/fonts";
import LocationShortIcon from "../../../assets/icons/location_short.svg";
import LocationShortGrayIcon from "../../../assets/icons/location_short_gray.svg";
import LongArrowRightIcon from "../../../assets/icons/long_arrow_right.svg";
import LongArrowRightGrayIcon from "../../../assets/icons/arrow_right_gray.svg";
import RubleGreenIcon from "../../../assets/icons/ruble_green.svg";
import RubleGrayIcon from "../../../assets/icons/ruble_gray.svg";
import moment from "moment/moment";

const YourGoodsListScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const cargoList = useSelector((store) => store.cargo_list.cargo_list)

    const [gettingLoading, setGettingLoading] = useState(false)
    const [activeScreen, setActiveScreen] = useState('active')
    const [filteredCargoList, setFilteredCargoList] = useState([])
    const [movingLoading, setMovingLoading] = useState(false)


    const goToCreating = () => {
        navigation.navigate('YourGoodsScreen');
    }

    const getAndSetCargoList = async (withLoading = true) => {
        if (withLoading) {
            setGettingLoading(true);
        }
        const res = await getCargoList(tokenFromReducer);
        dispatch(setCargoArray(res?.data))
        setGettingLoading(false)
    }

    const changeActiveScreen = val => () => {
        if (activeScreen === val) {
            return
        }

        setActiveScreen(val);
    }

    const moveToArchive = async (item) => {
        setMovingLoading(true);
        const res = await setMakeDisabled(item.id, tokenFromReducer);
        if (res.success) {
            await getAndSetCargoList(false);
        }

        setMovingLoading(false);
    }

    useEffect(() => {
        if (isFocused) {
            getAndSetCargoList().then();
        }
    }, [isFocused])

    useEffect(() => {
        if (cargoList?.length) {
            if (activeScreen === 'active') {
                setFilteredCargoList(cargoList.filter(item => item.is_disabled === '0'))
            } else {
                setFilteredCargoList(cargoList.filter(item => item.is_disabled === '1'))
            }
        }
    }, [cargoList, activeScreen])

    const renderActiveItem = ({item}) => (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
                navigation.navigate('YourSingleGoodScreen', {singleGood: item})
            }}
            style={styles.item}>
            <View style={styles.upperRow}>
                <View style={styles.upperRowLeft}>
                    <RubleGreenIcon />
                    <Text style={styles.rublePerTonnText}>{item.ruble_per_tonn} руб/т</Text>
                </View>
                <TouchableOpacity disabled={movingLoading} style={[styles.disableButton, movingLoading && styles.disabledDisableButton]} activeOpacity={0.6} onPress={() => moveToArchive(item)}>
                    <Text style={styles.disableButtonText}>В архив</Text>
                </TouchableOpacity>
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

    const renderDisabledItem = ({item}) => (
        <View style={styles.disabledItem}>
            <View style={styles.upperRow}>
                <View style={styles.upperRowLeft}>
                    <RubleGrayIcon />
                    <Text style={[styles.rublePerTonnText, styles.grayText]}>{item.ruble_per_tonn} руб/т</Text>
                </View>
                <TouchableOpacity disabled={movingLoading} style={[styles.disableButton, movingLoading && styles.disabledDisableButton]} activeOpacity={0.6} onPress={() => moveToArchive(item)}>
                    <Text style={styles.disableButtonText}>Активировать</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={[styles.row, styles.withMarginBottom]}>
                <View style={styles.iconView}><LocationShortGrayIcon /></View>
                <View style={styles.citiesBlock}>
                    <View style={[styles.row, styles.withMarginBottom]}>
                        <Text style={[styles.cityName, styles.short]} numberOfLines={1}>{item.upload_city_name}</Text>
                        <View style={styles.arrowView}>
                            <LongArrowRightGrayIcon />
                        </View>
                        <Text style={[styles.distance, styles.grayText]}>{item.distance}км</Text>
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
        </View>
    )

    return (
        gettingLoading ? <ActivityIndicator style={{marginTop: 60}} color={COLORS.green} size={'large'} />
            : <AppWrapper center>
                {!cargoList?.length ?
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <View style={{marginBottom: 46}}>
                            <PackIcon/>
                        </View>
                        <View style={{width: '100%', paddingHorizontal: 24, marginTop: 12}}>
                            <AppButton onPress={goToCreating} icon={<AddIcon />} buttonTitle={'Добавить груз'}/>
                        </View>
                    </View>
                    :
                    <View style={{flex: 1}}>
                        <AppButton onPress={goToCreating} buttonTitle={'Добавить груз'} style={styles.addButtonStyle} />
                        <View style={styles.buttonsRow}>
                            <TouchableOpacity disabled={activeScreen === 'active'} activeOpacity={0.5} style={[styles.button, activeScreen === 'active' && styles.active]} onPress={changeActiveScreen('active')}>
                                <Text style={[styles.buttonText, activeScreen === 'active' && styles.activeText]}>Активные</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={activeScreen === 'disabled'} activeOpacity={0.5} style={[styles.button, activeScreen === 'disabled' && styles.active]} onPress={changeActiveScreen('disabled')}>
                                <Text style={[styles.buttonText, activeScreen === 'disabled' && styles.activeText]}>Архив</Text>
                            </TouchableOpacity>
                        </View>
                        {movingLoading && <ActivityIndicator color={COLORS.green} style={{marginVertical: 16}} size={'large'} />}
                        <FlatList
                            renderItem={activeScreen === 'active' ? renderActiveItem : renderDisabledItem}
                            data={filteredCargoList}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                }
            </AppWrapper>
    );
};


const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    button: {
        width: '50%',
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
    button123112: {},
})


export default YourGoodsListScreen;
