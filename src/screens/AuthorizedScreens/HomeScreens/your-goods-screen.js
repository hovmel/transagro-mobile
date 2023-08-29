import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions,
    ActivityIndicator
} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import PackIcon from "src/assets/icons/no_goods.svg";
import AddIcon from "src/assets/icons/add.svg";
import {globalStyles} from "src/themes/global_styles/global_styles";
import {useDispatch, useSelector} from "react-redux";
import {createCargo, getCargoList, setMakeDisabled} from "src/services/API/getAndCreateCargo";
import {COLORS} from "src/themes/constants/colors";
import AppButton from "src/components/button/app-button";
import XMark from "src/assets/icons/xMark";
import AppInput from "src/components/input/app-input";
import Modal from "react-native-modal";
import OtkudaKuda from "../../../components/otkuda-kuda/otkuda-kuda";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {setCargoArray} from "src/store/actions/cargo_list";
import DropDownPicker from "react-native-dropdown-picker";
import MySelect from "../../../components/my-select/my-select";
import SelectPayment from "../../../components/select-payment/select-payment";
import LocationIcon from "../../../assets/icons/location.svg";
import GoodIcon from "../../../assets/icons/good.svg";
import CarIcon from "../../../assets/icons/car.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";
import RubleIcon from "../../../assets/icons/ruble.svg";
import BagIcon from "../../../assets/icons/bag.svg";
import UserIcon from "../../../assets/icons/user.svg";
import MessageIcon from "../../../assets/icons/message.svg";
import moment from "moment/moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import MySelectCheckbox from "../../../components/my-select-checkbox/my-select-checkbox";
import Clean from "../../../components/clean/clean";
import {FONTS} from "../../../themes/constants/fonts";
import {kuzovTypes, loadingTypes, materialTypes} from "../../../themes/constants/types";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {duplicateArray} from "../../../services/helpers/duplicateArray";
import MyModal from "../../../components/my-modal/my-modal";

const YourGoodsScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const userData = useSelector((store) => store.user_data.user_data)
    const managers = useSelector((store) => store.managers.managers)

    const tokenFromReducer = useSelector((store) => store.user_token.user_token)

    const isFocused = useIsFocused();


    const [fromInfo, setFromInfo] = useState();
    const [toInfo, setToInfo] = useState();

    const [rublePerTonn, setRublePerTonn] = useState('')
    const [maxVolume, setMaxVolume] = useState('')

    const [errorMessage, setErrorMessage] = useState(false)

    const [nalBeznal, setNalBeznal] = useState();
    const [ndsBeznds, setNdsBeznds] = useState();
    const [isPredoplata, setIsPredoplata] = useState(false);

    const [activeManager, setActiveManager] = useState();
    const [description, setDescription] = useState('');

    const [showDateToPicker, setShowDateToPicker] = useState(false)
    const [showDateFromPicker, setShowDateFromPicker] = useState(false)

    const [selectedDateFrom, setSelectedDateFrom] = useState(null)
    const [selectedDateTo, setSelectedDateTo] = useState(null)
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())

    const [fromCityId, setFromCityId] = useState();
    const [toCityId, setToCityId] = useState();
    const [uploadAddress, setUploadAddress] = useState('');
    const [distance, setDistance] = useState();
    const [goodName, setGoodName] = useState()
    const [loadingType, setLoadingType] = useState(duplicateArray(loadingTypes))
    const [kuzovType, setKuzovType] = useState(duplicateArray(kuzovTypes))

    const [creatingLoading, setCreatingLoading] = useState(false)

    const [fromCityName, setFromCityName] = useState('');
    const [toCityName, setToCityName] = useState('');

    const [isModalVisible, setModalVisible] = useState(false);

    const handleOnPressCreateCargo = async () => {
        const data = {
            upload_loc_id: fromCityId,
            onload_loc_id: toCityId,
            onload_loc_address: uploadAddress,
            distance,

            order_title: goodName?.title,
            kuzov_type: kuzovType?.filter(i => i.isSelected).map(i => i.title),
            loading_type: loadingType?.filter(i => i.isSelected).map(i => i.title),
            start_date: selectedDateFrom && moment(selectedDateFrom).format('YYYY-MM-DD HH:mm:ss'),
            end_date: selectedDateTo && moment(selectedDateTo).format('YYYY-MM-DD HH:mm:ss'),
            ruble_per_tonn: rublePerTonn,
            payment_type: nalBeznal?.title,
            payment_nds: ndsBeznds?.title,
            prepaid: isPredoplata ? '1' : '0',
            max_volume: maxVolume,
            manager_id: activeManager?.id,
            description: description,

            company_name: userData?.company_name,
        }

        if (data.upload_loc_id &&
            data.onload_loc_id &&
            data.onload_loc_address &&
            data.distance &&

            data.order_title &&
            data.kuzov_type?.length &&
            data.loading_type?.length &&

            data.start_date &&
            data.ruble_per_tonn &&
            data.payment_type &&
            data.payment_nds &&

            data.max_volume &&
            data.manager_id &&
            data.company_name
        ) {
            data.kuzov_type = JSON.stringify(data.kuzov_type);
            data.loading_type = JSON.stringify(data.loading_type);
            try {
                setCreatingLoading(true);
                const res = await createCargo(tokenFromReducer, data);
                console.log(res)
                if (res.success) {
                    clearInputs();
                    navigation.navigate('YourGoodsListScreen');
                }
            } catch (e) {
                console.log(e)
            } finally {
                setCreatingLoading(false);
            }
        } else {
            setErrorMessage(true)
            setTimeout(() => {
                setErrorMessage(false)
            }, 3000)
        }
    }

    const clearInputs = () => {
        setFromCityId();
        setToCityId();

        setUploadAddress();
        setDistance();
        setGoodName();
        setLoadingType(duplicateArray(loadingTypes));
        setKuzovType(duplicateArray(kuzovTypes));

        setSelectedDateFrom(null);
        setSelectedDateTo(null);
        setRublePerTonn();
        setNalBeznal();
        setNdsBeznds();
        setIsPredoplata(false);
        setMaxVolume();
        setActiveManager();
        setDescription();

        setDateFrom(new Date());
        setDateTo(new Date());
    }

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

    useEffect(() => {
        if (isFocused) {
            if (!managers?.length) {
                setModalVisible(true);
            }
        }
    }, [isFocused])

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('YourGoodsListScreen')
    }

    const admitModal = () => {
        setModalVisible(false);
        navigation.navigate('Личный кабинет')
    }

    return (
        <View style={{flex: 1, margin: 0, padding: 0, width: '100%'}}>
            <View style={styles.modal_box}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    behavior={'padding'}
                    style={{flex: 1, width: '100%'}}>
                    <View>
                        <View style={[styles.inputBox]}>
                            <OtkudaKuda
                                from={fromCityId}
                                setFrom={setFromCityId}
                                to={toCityId}
                                setTo={setToCityId}
                                fromInfo={fromInfo}
                                setFromInfo={setFromInfo}
                                toInfo={toInfo}
                                setToInfo={setToInfo}

                                fromCityName={fromCityName}
                                setFromCityName={setFromCityName}
                                toCityName={toCityName}
                                setToCityName={setToCityName}

                                needInfo
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <AppInput
                                leftIcon={<LocationIcon />}
                                placeholder={'Адрес принимающей стороны'}
                                value={uploadAddress}
                                onChangeText={setUploadAddress}
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <AppInput
                                leftIcon={<LocationIcon />}
                                placeholder={'Примерное расстояние (км)'}
                                value={distance}
                                onChangeText={setDistance}
                                numeric
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <MySelect
                                placeholder='Наименование груза'
                                onChange={setGoodName}
                                data={materialTypes}
                                leftIcon={<GoodIcon />}
                                value={goodName}
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
                                placeholder='Тип загрузки'
                                onChange={setLoadingType}
                                data={loadingType}
                                leftIcon={<CarIcon />}
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
                                placeholder={'Ставка руб/т'}
                                value={rublePerTonn}
                                onChangeText={setRublePerTonn}
                                numeric
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <SelectPayment
                                nalBeznal={nalBeznal}
                                setNalBeznal={setNalBeznal}
                                ndsBezNds={ndsBeznds}
                                setNdsBeznds={setNdsBeznds}
                                isPredoplata={isPredoplata}
                                setIsPredoplata={setIsPredoplata}
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <AppInput
                                numeric
                                placeholder={'Объём (тонн)'}
                                value={maxVolume}
                                onChangeText={setMaxVolume}
                                leftIcon={<BagIcon />}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <MySelect
                                data={managers}
                                keyName={'FullName'}
                                value={activeManager}
                                onChange={setActiveManager}
                                placeholder={'Имя менеджера'}
                                leftIcon={<UserIcon />}
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <AppInput
                                placeholder={'Комментарий (не обязательно)'}
                                inputStyles={{maxHeight: 80}}
                                value={description}
                                onChangeText={setDescription}
                                leftIcon={<MessageIcon />}
                                multiline
                                numberOfLines={3}
                            />
                        </View>
                    </View>
                    <Clean onPress={clearInputs} />
                    <Text style={styles.error}>{errorMessage && 'Заполните все поля'}</Text>
                    <AppButton
                        disabled={creatingLoading}
                        isSecondStyle
                        onPress={() => navigation.navigate('YourGoodsListScreen')}
                        buttonTitle={'Список'}
                    />
                    <AppButton
                        loading={creatingLoading}
                        onPress={handleOnPressCreateCargo}
                        buttonTitle={'Добавить груз'}
                    />

                    <View>
                    </View>
                </KeyboardAwareScrollView>
            </View>

            <MyModal
                isVisible={isModalVisible}
                closeFunction={closeModal}
                label={'У вас еще нет менеджера'}
                selectedLabel={'Создать менеджера?'}
                leftButtonText={'Нет'}
                rightButtonText={'Да'}
                onLeftButtonPress={closeModal}
                onRightButtonPress={admitModal}
            />
        </View>
    );
};

export default YourGoodsScreen;
const styles = StyleSheet.create({
    cargo_item: {
        width: '100%',
        backgroundColor: COLORS.invertLight,
        marginBottom: 12,
        borderRadius: 8,
        padding: 6,
    },
    cargo_title: {
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'normal',
        color: '#000',
        marginBottom: 10
    },
    cargo_row: {
        marginBottom: 5
    },
    space_between: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cargo_subtitle: {
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        color: '#1f1f1f'
    },
    modal_box: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 26,
        paddingVertical: 15
    },
    xMarkBox: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        marginTop: 16,
        resizeMode: 'contain'
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    dateInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateInput: {
        width: '50%'
    },
    inputBlock: {
        marginBottom: 16
    },
    make_disabled_modal: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    error: {
        color: COLORS.error,
        fontFamily: FONTS.medium,
        fontSize: 15,
        textAlign: 'center',
        height: 30
    }
})
