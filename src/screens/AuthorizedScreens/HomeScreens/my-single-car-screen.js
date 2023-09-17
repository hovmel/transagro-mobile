import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import {COLORS} from "src/themes/constants/colors";
import CarIcon from "src/assets/icons/car.svg"
import BagIcon from "src/assets/icons/bag.svg"
import ChatIcon from "src/assets/icons/message.svg"
import UserIcon from "src/assets/icons/user.svg"
import LocationIcon from "src/assets/icons/location_long.svg"
import {FONTS} from "../../../themes/constants/fonts";
import {useNavigation} from "@react-navigation/native";
import AppButton from "../../../components/button/app-button";
import GoBack from "../../../components/go-back";
import {kuzovTypes} from "../../../themes/constants/types";
import {useSelector} from "react-redux";
import OtkudaKuda from "../../../components/otkuda-kuda/otkuda-kuda";
import MySelectCheckbox from "../../../components/my-select-checkbox/my-select-checkbox";
import AppInput from "../../../components/input/app-input";
import MySelect from "../../../components/my-select/my-select";
import MessageIcon from "../../../assets/icons/message.svg";
import Clean from "../../../components/clean/clean";
import {createRide, deleteRide, editRide} from "../../../services/API/create-ride";
import MyModal from "../../../components/my-modal/my-modal";
import {duplicateArray} from "../../../services/helpers/duplicateArray";
import moment from "moment/moment";


const MySingleCarScreen = ({route}) => {
    const navigation = useNavigation();
    const {singleCar} = route.params;
    console.log(singleCar)

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
    const [kuzovType, setKuzovType] = useState(duplicateArray(kuzovTypes))
    const [maxVolume, setMaxVolume] = useState('');
    const [description, setDescription] = useState('')
    const [activeManager, setActiveManager] = useState()

    const [savingLoading, setSavingLoading] = useState(false);
    const [error, setError] = useState(false);

    const onSave = async () => {
        const data = {
            id: singleCar.id,

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

            setSavingLoading(true);
            const res = await editRide(data, tokenFromReducer);
            if (res.success) {
                navigation.goBack();
            }
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    const onEdit = () => {
        const manager = managers?.find(item => item.id === singleCar?.manager_id);
        const currentKuzovTypes = JSON.parse(singleCar?.kuzov_type || '');
        const activeKuzovTypes = kuzovTypes.map(item => currentKuzovTypes.includes(item.title) ? {...item, isSelected: true} : item)

        setFromCityId(singleCar?.upload_loc_id);
        setFromCityPlaceholder(singleCar?.upload_city_name);
        setToCityId(singleCar?.onload_loc_id);
        setToCityPlaceholder(singleCar?.onload_city_name);
        setKuzovType(activeKuzovTypes);
        setMaxVolume(singleCar?.max_volume?.toString());
        setDescription(singleCar?.description);
        setActiveManager(manager);
        setIsEditing(true);
    }

    const deletingRide = async () => {
        const res = await deleteRide(singleCar?.id, tokenFromReducer);
        setIsDeleting(false);
        if (res.success) {
            navigation.goBack();
        }
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

                            <Text style={styles.error}>{error && 'Заполните все поля'}</Text>
                        </View>
                    ) : (
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
                                    <Text style={styles.itemTitle}>Грузоподъёмность</Text>
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
                            <View style={[styles.item, styles.lastItem]}>
                                <View style={styles.itemIcon}><UserIcon /></View>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle}>Менеджер</Text>
                                    <Text style={styles.itemText}>{singleCar?.manager_name}</Text>
                                    <Text style={[styles.itemText, {marginTop: 6}]}>{singleCar?.manager_phone_number}</Text>
                                </View>
                            </View>

                            <Text style={{fontFamily: FONTS.light, color: COLORS.text1, textAlign: 'right', fontSize: 12, marginTop: -12}}>
                                {moment(singleCar.created_at).format('HH:mm | DD MMM')}
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
                onLeftButtonPress={deletingRide}
                onRightButtonPress={closeDeleteModal}
                label={'Вы действительно хотите удалить эту машину?'}
            />
        </AppWrapper>
    );
};

export default MySingleCarScreen;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 350
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
