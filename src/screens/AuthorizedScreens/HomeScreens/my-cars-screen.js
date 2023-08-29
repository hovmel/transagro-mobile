import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import AppInput from "src/components/input/app-input";
import AppButton from "src/components/button/app-button";
import DropDownPicker from "react-native-dropdown-picker";
import {COLORS} from "src/themes/constants/colors";
import {createRide, deleteRide, getRide} from "src/services/API/create-ride";
import {useSelector} from "react-redux";
import Modal from "react-native-modal";
import OtkudaKuda from "src/components/otkuda-kuda/otkuda-kuda";
import MySelect from "../../../components/my-select/my-select";
import MySelectCheckbox from "../../../components/my-select-checkbox/my-select-checkbox";
import CarIcon from "../../../assets/icons/car.svg";
import BagIcon from "../../../assets/icons/bag.svg";
import UserIcon from "../../../assets/icons/user.svg";
import MessageIcon from "../../../assets/icons/message.svg";
import Clean from "../../../components/clean/clean";
import {FONTS} from "../../../themes/constants/fonts";
import LocationShortIcon from "src/assets/icons/location_short.svg"
import LongArrowRightIcon from "src/assets/icons/long_arrow_right.svg"
import {useIsFocused, useNavigation} from "@react-navigation/native";
import PackIcon from "../../../assets/icons/big_car.svg";
import AddIcon from "../../../assets/icons/add.svg";
import {kuzovTypes} from "../../../themes/constants/types";
import {duplicateArray} from "../../../services/helpers/duplicateArray";
import MyModal from "../../../components/my-modal/my-modal";
import moment from "moment/moment";

const MyCarsScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const userData = useSelector((store) => store.user_data.user_data)
    const managers = useSelector((store) => store.managers.managers)
    const companyName = userData?.company_name


    const [fromCityId, setFromCityId] = useState('');
    const [toCityId, setToCityId] = useState('');
    const [kuzovType, setKuzovType] = useState(duplicateArray(kuzovTypes))
    const [maxVolume, setMaxVolume] = useState('');
    const [description, setDescription] = useState('')
    const [activeManager, setActiveManager] = useState();

    const [myRides, setMyRides] = useState([])
    const [showRides, setShowRides] = useState(true)
    const [error, setError] = useState(false)

    const [creatingLoading, setCreatingLoading] = useState(false)
    const [gettingLoading, setGettingLoading] = useState(false)

    const [fromCityName, setFromCityName] = useState('');
    const [toCityName, setToCityName] = useState('');

    const [isModalVisible, setModalVisible] = useState(false);

    const clearInputs = () => {
        setFromCityId();
        setToCityId();
        setKuzovType(duplicateArray(kuzovTypes));
        setMaxVolume();
        setActiveManager();
        setDescription();
    };

    const handleCreateRide = async () => {
        let data = {
            upload_loc_id: fromCityId,
            onload_loc_id: toCityId,
            kuzov_type: kuzovType?.filter(i => i.isSelected).map(i => i.title),
            max_volume: maxVolume,
            manager_id: activeManager?.id,
            description,

            company_name: companyName,
        }
        console.log(data)

        if (data.upload_loc_id &&
            data.onload_loc_id &&
            data.kuzov_type?.length &&
            data.max_volume &&
            data.company_name &&
            data.manager_id
        ) {
            data.kuzov_type = JSON.stringify(data.kuzov_type);

            setCreatingLoading(true);
            const res = await createRide(data, tokenFromReducer);
            if (res.success) {
                setShowRides(true)
                handeGetRides()
                clearInputs()
            }
            setCreatingLoading(false);

        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    const handeGetRides = () => {
        setGettingLoading(true);
        getRide(tokenFromReducer).then((r) => {
            if (r.success) {
                setMyRides(r.data)
            }
            setGettingLoading(false);
        })
    }

    useEffect(() => {
        if (isFocused) {
            handeGetRides();
        }
    }, [isFocused])

    useEffect(() => {
        if (!showRides) {
            if (!managers?.length) {
                setModalVisible(true);
            }
        }
    }, [showRides])

    const closeModal = () => {
        setModalVisible(false);
        setShowRides(true);
    }

    const admitModal = () => {
        setModalVisible(false);
        navigation.navigate('Личный кабинет')
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                navigation.navigate('MySingleCarScreen', {singleCar: item})
                }}
                style={styles.cargo_item}>
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

                <Text style={[styles.itemText, styles.withMarginBottom]}>{item.manager_name}</Text>
                <Text style={[styles.itemText]}>{item.manager_phone_number}</Text>
                <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                    {moment(item.created_at).format('HH:mm | DD MMM')}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <AppWrapper>
            {!showRides ?
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View>
                        <OtkudaKuda
                            from={fromCityId}
                            setFrom={setFromCityId}
                            to={toCityId}
                            setTo={setToCityId}
                            placeholderFrom={'Выезд из'}
                            placeholderTo={'Прибытие в'}

                            fromCityName={fromCityName}
                            setFromCityName={setFromCityName}
                            toCityName={toCityName}
                            setToCityName={setToCityName}
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
                        <AppInput
                            numeric
                            placeholder={'Грузоподъёмность (тонн)'}
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

                    <Clean onPress={clearInputs} />
                    <Text style={styles.error}>{error && 'Заполните все поля'}</Text>
                    <AppButton
                        disabled={creatingLoading}
                        isSecondStyle
                        onPress={() => setShowRides(true)}
                        buttonTitle={'Список'}
                    />
                    <AppButton
                        loading={creatingLoading}
                        onPress={handleCreateRide}
                        buttonTitle={'Добавить машину'}
                    />
                </ScrollView>
                :
                <View style={{flex: 1}}>
                    {gettingLoading ? <ActivityIndicator style={{marginTop: 60}} color={COLORS.green} size={'large'} />
                        : myRides?.length ? (
                            <FlatList
                                ListHeaderComponent={<AppButton
                                    onPress={() => {
                                        setShowRides(false)
                                    }}
                                    buttonTitle={'Добавить машину'}/>
                                }
                                renderItem={renderItem}
                                data={myRides}/>
                        ) : (
                            <View style={{width: '100%', alignItems: 'center', marginTop: 200}}>
                                <View style={{marginBottom: 46}}>
                                    <PackIcon/>
                                </View>
                                <View style={{width: '100%', paddingHorizontal: 24, marginTop: 12}}>
                                    <AppButton onPress={() => {
                                        setShowRides(false)
                                    }} icon={<AddIcon />} buttonTitle={'Добавить машину'}/>
                                </View>
                            </View>
                        )}
                </View>
            }

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
        </AppWrapper>
    );
};

export default MyCarsScreen;

const styles = StyleSheet.create({
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
    }
})
