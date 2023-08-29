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


const MySingleGoodScreen = ({route}) => {
    const navigation = useNavigation();
    const {singleGood} = route.params;

    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const userData = useSelector((store) => store.user_data.user_data)
    const managers = useSelector((store) => store.managers.managers)
    const companyName = userData?.company_name

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [fromCityPlaceholder, setFromCityPlaceholder] = useState('');
    const [toCityPlaceholder, setToCityPlaceholder] = useState('');

    const [fromCityId, setFromCityId] = useState('');
    const [toCityId, setToCityId] = useState('');
    const [uploadAddress, setUploadAddress] = useState('');
    const [distance, setDistance] = useState();
    const [goodName, setGoodName] = useState();
    const [loadingType, setLoadingType] = useState(duplicateArray(kuzovTypes));

    const [showDateToPicker, setShowDateToPicker] = useState(false)
    const [showDateFromPicker, setShowDateFromPicker] = useState(false)

    const [rublePerTonn, setRublePerTonn] = useState('')
    const [selectedDateFrom, setSelectedDateFrom] = useState(null)
    const [selectedDateTo, setSelectedDateTo] = useState(null)
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())

    const [kuzovType, setKuzovType] = useState(duplicateArray(kuzovTypes))
    const [maxVolume, setMaxVolume] = useState('');
    const [description, setDescription] = useState('')
    const [activeManager, setActiveManager] = useState()

    const [nalBeznal, setNalBeznal] = useState();
    const [ndsBeznds, setNdsBeznds] = useState();
    const [isPredoplata, setIsPredoplata] = useState(false);

    const [savingLoading, setSavingLoading] = useState(false);
    const [error, setError] = useState(false);

    const onSave = async () => {
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
            prepaid: isPredoplata,
            max_volume: maxVolume,
            manager_id: activeManager?.id,
            description: description,

            company_name: userData?.company_name,
        }
        console.log(data)

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
                const res = await editCargo(tokenFromReducer, data, singleGood?.id);
                if (res.success) {
                    navigation.goBack();
                }
            } catch (e) {
                console.log(e)
            } finally {
                setSavingLoading(false);
            }
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    const onEdit = () => {
        const manager = managers?.find(item => item.id === singleGood?.manager_id);
        const order = materialTypes?.find(item => item.title === singleGood?.order_title);

        const currentKuzovTypes = JSON.parse(singleGood?.kuzov_type || '');
        const currentLoadingTypes = JSON.parse(singleGood?.loading_type || '');
        const activeKuzovTypes = kuzovTypes.map(item => currentKuzovTypes.includes(item.title) ? {...item, isSelected: true} : item)
        const activeLoadingTypes = loadingTypes.map(item => currentLoadingTypes.includes(item.title) ? {...item, isSelected: true} : item)

        setFromCityId(singleGood?.upload_loc_id);
        setFromCityPlaceholder(singleGood?.upload_city_name);
        setToCityId(singleGood?.onload_loc_id);
        setToCityPlaceholder(singleGood?.onload_city_name);
        setUploadAddress(singleGood?.onload_loc_address);
        setDistance(singleGood?.distance?.toString());
        setGoodName(order);
        setKuzovType(activeKuzovTypes);
        setLoadingType(activeLoadingTypes);
        setSelectedDateFrom(new Date(singleGood?.start_date));
        if (singleGood?.end_date) {
            setSelectedDateTo(new Date(singleGood?.end_date));
        }
        setNalBeznal({title: singleGood?.payment_type});
        setNdsBeznds({title: singleGood?.payment_nds});
        setIsPredoplata(singleGood?.prepaid === '1');
        setRublePerTonn(singleGood?.ruble_per_tonn);

        setMaxVolume(singleGood?.max_volume?.toString());
        setDescription(singleGood?.description);
        setActiveManager(manager);
        setIsEditing(true);
    }

    const deletingGood = async () => {
        const res = await deleteCargo(singleGood?.id, tokenFromReducer);
        setIsDeleting(false);
        if (res.success) {
            navigation.goBack();
        }
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
        console.log(currentDate)

        setSelectedDateFrom(currentDate)
    };

    const handleShowDatePickerTo = () => {
        setShowDateToPicker(true)
    }
    const handleShowDatePickerFrom = () => {
        setShowDateFromPicker(true)
    }

    const onDelete = () => {
        setIsDeleting(true)
    }

    const closeDeleteModal = () => {
        setIsDeleting(false);
    }

    const clearInputs = () => {
        setFromCityId();
        setToCityId();
        setKuzovType(duplicateArray(kuzovTypes));
        setMaxVolume();
        setActiveManager();
        setDescription();
    };

    return (
        <AppWrapper>
            <GoBack navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {isEditing ? (
                        <View>
                            <View>
                                <OtkudaKuda
                                    from={fromCityId}
                                    setFrom={setFromCityId}
                                    to={toCityId}
                                    setTo={setToCityId}
                                    placeholderFrom={fromCityPlaceholder}
                                    placeholderTo={toCityPlaceholder}
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

                            <Text style={styles.error}>{error && 'Заполните все поля'}</Text>
                        </View>
                    ) : (
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
                            <View style={[styles.item, styles.lastItem]}>
                                <View style={styles.itemIcon}><UserIcon /></View>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle}>Менеджер</Text>
                                    <Text style={styles.itemText}>{singleGood?.manager_name}</Text>
                                    <Text style={styles.itemText}>{singleGood?.manager_phone_number}</Text>
                                </View>
                            </View>

                            <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                                {moment(singleGood?.created_at).format('HH:mm | DD MMM')}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.buttons}>
                    {isEditing ? (
                        <AppButton
                            isSecondStyle
                            onPress={onSave}
                            buttonTitle={'Сохранить'}
                            loading={savingLoading}
                            loadingColor={COLORS.text1}
                        />
                    ) : (
                        <AppButton
                            isSecondStyle
                            onPress={onEdit}
                            buttonTitle={'Редактировать'}
                        />
                    )}
                    <AppButton
                        isDeleteStyle
                        onPress={onDelete}
                        buttonTitle={'Удалить'}
                        disabled={savingLoading}
                    />
                </View>
            </ScrollView>

            <MyModal
                isVisible={isDeleting}
                closeFunction={closeDeleteModal}
                leftButtonText={'Удалить'}
                rightButtonText={'Нет'}
                onLeftButtonPress={deletingGood}
                onRightButtonPress={closeDeleteModal}
                label={'Вы действительно хотите удалить эту машину?'}
            />
        </AppWrapper>
    );
};

export default MySingleGoodScreen;

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
