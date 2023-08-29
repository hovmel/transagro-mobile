import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import AppInput from "src/components/input/app-input";
import {COLORS} from "src/themes/constants/colors";
import AppTitle from "src/components/title/app-title";
import {globalStyles} from "src/themes/global_styles/global_styles";
import AppButton from "src/components/button/app-button";
import {useDispatch, useSelector} from "react-redux";
import {searchCargo} from "src/services/API/search-cargo";
import Modal from "react-native-modal";
import XMark from "src/assets/icons/xMark";
import {
    addGoodToFavorites,
    addRideToFavorites,
    deleteFromFavorites,
    getFavorites
} from "src/services/API/favorites_api";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarIcon from "src/assets/icons/calendar.svg";
import moment from "moment";
import OtkudaKuda from "src/components/otkuda-kuda/otkuda-kuda";
import MySelect from "../../../components/my-select/my-select";
import MySelectCheckbox from "../../../components/my-select-checkbox/my-select-checkbox";
import CarIcon from "../../../assets/icons/car.svg";
import Clean from "../../../components/clean/clean";
import {duplicateArray} from "../../../services/helpers/duplicateArray";
import {kuzovTypes, materialTypes} from "../../../themes/constants/types";
import GoodIcon from "../../../assets/icons/good.svg";
import RubleIcon from "../../../assets/icons/ruble.svg";
import RubleGreenIcon from "../../../assets/icons/ruble_green.svg";
import LocationShortIcon from "../../../assets/icons/location_short.svg";
import LongArrowRightIcon from "../../../assets/icons/long_arrow_right.svg";
import {FONTS} from "../../../themes/constants/fonts";
import FavoritesButton from "../../../components/favoritesButton";
import {setFavorites} from "../../../store/actions/favorites";

require('moment/locale/ru');

const CargoSearchScreen = ({navigation}) => {
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const favoritesIds = useSelector((store) => store.favorites.favoritesIds)

    const dispatch = useDispatch();

    const [cargoList, setCargoList] = useState([])
    const [searchedData, setSearchedData] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    const [fromCityId, setFromCityId] = useState()
    const [toCityId, setToCityId] = useState()

    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())
    const [onloadLocationRadius, setOnloadLocationRadius] = useState('')
    const [uploadLocationRadius, setUploadLocationRadius] = useState('')
    const [minDeposit, setMinDeposit] = useState('')

    const [kuzovType, setKuzovType] = useState(duplicateArray(kuzovTypes))
    const [goodName, setGoodName] = useState(duplicateArray(materialTypes))
    const [rublePerTonn, setRublePerTonn] = useState('')

    const [showDateToPicker, setShowDateToPicker] = useState(false)
    const [showDateFromPicker, setShowDateFromPicker] = useState(false)

    const [selectedDateFrom, setSelectedDateFrom] = useState(null)
    const [selectedDateTo, setSelectedDateTo] = useState(null)

    const [favoritesLoading, setFavoritesLoading] = useState(false);
    const [loading, setLoading] = useState(null)

    const [fromCityName, setFromCityName] = useState('');
    const [toCityName, setToCityName] = useState('');

    const onChangeDateTo = (event, selectedDate) => {
        const currentDate = selectedDate || dateTo;
        setShowDateToPicker(false);
        setDateTo(currentDate);
        setSelectedDateTo(currentDate)
    };

    const onChangeDateFrom = (event, selectedDate) => {
        const currentDate = selectedDate || dateFrom;
        setShowDateFromPicker(false);
        setDateFrom(currentDate);
        setSelectedDateFrom(currentDate)
    };

    const handleShowDatePickerTo = () => {
        setShowDateToPicker(true)
    }
    const handleShowDatePickerFrom = () => {
        setShowDateFromPicker(true)
    }

    const clearInputs = () => {
        setFromCityId();
        setToCityId();
        setKuzovType(duplicateArray(kuzovTypes));
        setGoodName(duplicateArray(materialTypes));
        setOnloadLocationRadius();
        setUploadLocationRadius();

        setSelectedDateFrom();
        setSelectedDateTo();
        setDateFrom(new Date());
        setDateTo(new Date());
        setRublePerTonn();
    };

    const onSearch = async () => {
        try {
            setLoading(true);
            const activeKuzovTypes = kuzovType?.filter(i => i.isSelected).map(i => i.title);
            const activeOrderNames = goodName?.filter(i => i.isSelected).map(i => i.title);

            const filterData = {
                upload_loc_id: fromCityId,
                onload_loc_id: toCityId,
                upload_loc_radius: uploadLocationRadius,
                onload_loc_radius: onloadLocationRadius,
                kuzov_type: activeKuzovTypes?.length ? JSON.stringify(activeKuzovTypes) : undefined,
                order_title: activeOrderNames?.length ? JSON.stringify(activeOrderNames) : undefined,

                start_date: selectedDateFrom && moment(selectedDateFrom).format('YYYY-MM-DD 00:00:00'),
                end_date: selectedDateTo && moment(selectedDateTo).format('YYYY-MM-DD 23:59:59'),

                ruble_per_tonn: rublePerTonn,
            }
            const res = await searchCargo(tokenFromReducer, filterData);

            console.log(res)
            if (res.success) {
                setCargoList(res.orders)
                setSearchedData(true)
            }
        } catch (e) {
            console.log(e, 'while searching orders');
        } finally {
            setLoading(false)

        }
    }

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

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    navigation.navigate('SingleGoodScreen', {singleGood: item})
                }}
                style={styles.item}>
                <FavoritesButton
                    onPress={() => onFavoritesPress(item)}
                    isActive={favoritesIds?.goods?.includes(item.id)}
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
    }
    return (
        <AppWrapper
            button={!searchedData &&
                <AppButton
                    loading={loading}
                    buttonTitle={'Найти груз'}
                    onPress={onSearch}
                />
            }>
            {!searchedData ?
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={styles.inputBlock}>
                            <OtkudaKuda
                                from={fromCityId}
                                to={toCityId}
                                setFrom={setFromCityId}
                                setTo={setToCityId}
                                placeholderFrom={'Пункт погрузки'}
                                placeholderTo={'Пункт выгрузки'}
                                fromRadius={uploadLocationRadius}
                                setFromRadius={setUploadLocationRadius}
                                toRadius={onloadLocationRadius}
                                setToRadius={setOnloadLocationRadius}

                                fromCityName={fromCityName}
                                setFromCityName={setFromCityName}
                                toCityName={toCityName}
                                setToCityName={setToCityName}

                                withRadius
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <MySelectCheckbox
                                placeholder='Тип кузова'
                                onChange={setKuzovType}
                                data={kuzovType}
                                leftIcon={<CarIcon />}
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <MySelectCheckbox
                                placeholder='Наименование груза'
                                onChange={setGoodName}
                                data={goodName}
                                leftIcon={<GoodIcon />}
                            />
                        </View>
                        <View style={[styles.inputBlock, styles.dateInputRow]}>
                            <View style={styles.dateInput}>
                                <AppInput
                                    onPress={handleShowDatePickerFrom}
                                    editable={false}
                                    color={COLORS.subTextLight}
                                    placeholder={'Дата начала'}
                                    value={selectedDateFrom && moment(selectedDateFrom).format('MMM.DD.YY')}
                                    onChangeText={setDateFrom}
                                    leftIcon={<CalendarIcon />}
                                />
                                {showDateFromPicker && (
                                    <DateTimePicker
                                        testID='dateTimePicker'
                                        value={dateTo}
                                        mode='date'
                                        is24Hour={true}
                                        display='default'
                                        onChange={onChangeDateFrom}
                                    />
                                )}
                            </View>
                            <View style={[styles.dateInput, {width: '40%'}]}>
                                <AppInput
                                    onPress={handleShowDatePickerTo}
                                    editable={false}
                                    color={COLORS.subTextLight}
                                    placeholder={'Дата конца'}
                                    value={selectedDateTo && moment(selectedDateTo).format('MMM.DD.YY')}
                                    onChangeText={setDateTo}

                                />
                                {showDateToPicker && (
                                    <DateTimePicker
                                        testID='dateTimePicker'
                                        value={dateFrom}
                                        mode='date'
                                        is24Hour={true}
                                        display='default'
                                        onChange={onChangeDateTo}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={styles.inputBlock}>
                            <AppInput
                                leftIcon={<RubleIcon />}
                                placeholder={'Мин. ставка руб/т'}
                                value={rublePerTonn}
                                onChangeText={setRublePerTonn}
                                numeric
                            />
                        </View>
                        <Clean onPress={clearInputs} />
                    </View>
                </KeyboardAwareScrollView>

                :
                <FlatList
                    ListHeaderComponent={() => (<AppButton onPress={() => {
                        setSearchedData(false)
                    }} buttonTitle={'Перейти к фильтрам'}/>)}
                    data={cargoList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            }
            <Modal isVisible={modalVisible}>
                <View style={styles.modal_box}>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(false)
                        }} style={styles.xMarkBox}>
                            <XMark/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{marginBottom: 8}}>
                            <AppTitle title={selectedItem.company_name}/>
                        </View>
                        <Text style={styles.min_title}>тип кузова / <Text
                            style={globalStyles.title}>{selectedItem.kuzov_type}</Text></Text>
                        <Text style={styles.min_title}>тип загрузки / <Text
                            style={globalStyles.title}>{selectedItem.loading_type}</Text></Text>
                        <Text style={styles.min_title}>тип оплаты / <Text
                            style={globalStyles.title}>{selectedItem.payment_type}</Text></Text>
                        <Text style={styles.min_title}>руб. за кг / <Text
                            style={globalStyles.title}>{selectedItem.ruble_per_kg}</Text></Text>
                        <Text style={styles.min_title}>место загрузки / <Text
                            style={globalStyles.title}>{selectedItem.onload_city_name}</Text></Text>
                        <Text style={styles.min_title}>место выгрузки / <Text
                            style={globalStyles.title}>{selectedItem.upload_city_name}</Text></Text>
                    </View>
                    <View style={{marginTop: 12}}>
                        <AppButton
                            disabled
                            onPress={() => {
                                let data = {
                                    "order_id": selectedItem.id,
                                    "order_type": "good"
                                }
                                addGoodToFavorites(tokenFromReducer, data).then((r) => setModalVisible(false))
                            }}
                            buttonTitle={'Добавить в избранное'}/>
                    </View>
                </View>
            </Modal>
        </AppWrapper>
    );
};

export default CargoSearchScreen;
const styles = StyleSheet.create({
    input_box: {
        width: '48%',
    },
    input_block: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    btn_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18
    },
    cargo_item: {
        width: '100%',
        height: 120,
        backgroundColor: COLORS.invertLight,
        marginBottom: 12,
        borderRadius: 8,
        padding: 6
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
    modal_box: {
        width: '100%',
        height: 360,
        borderRadius: 16,
        backgroundColor: '#fff',
        padding: 16,

    },
    dateInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    dateInput: {
        width: '50%'
    },
    xMarkBox: {
        alignItems: 'flex-end',
        width: 33,
        height: 33,
    },
    min_title: {
        fontSize: 18,
        fontWeight: '600'
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
