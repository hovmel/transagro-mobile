import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppInput from "../input/app-input";
import {COLORS} from "../../themes/constants/colors";
import Modal from "react-native-modal";
import {getCityApi} from "../../services/API/getCityApi";
import MySelect from "../my-select/my-select";
import LocationLong from "src/assets/icons/location_long.svg"
import RadiusLong from "src/assets/icons/radius.svg"
import {FONTS} from "../../themes/constants/fonts";

const radiusData = [{title: '50'}, {title: '100'}, {title: '150'}, {title: '200'}, {title: '250'}, {title: '300'}]

const OtkudaKuda = ({
        from,
        setFrom,
        to,
        setTo,
        placeholderFrom = 'Откуда',
        placeholderTo = 'Куда',
        fromRadius,
        setFromRadius,
        toRadius,
        setToRadius,
        withRadius,
        fromCityName,
        setFromCityName,
        toCityName,
        setToCityName
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeMode, setActiveMode] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [citiesList, setCitiesList] = useState([]);

    const closeModal = () => {
        setIsModalVisible(false)
        setSearchVal('');
        setCitiesList([]);
    }

    const openModal = () => {
        setIsModalVisible(true)
    }

    const onFromPress = () => {
        setActiveMode('from');
        setSearchVal(fromCityName);
        openModal()
    }

    const onToPress = () => {
        setActiveMode('to');
        setSearchVal(toCityName);
        openModal()
    }

    const onCityPress = city => {
        if (activeMode === 'from') {
            setFrom(city.CityId);
            setFromCityName(city.CityName);
        } else if (activeMode === 'to') {
            setTo(city.CityId);
            setToCityName(city.CityName);
        }
        closeModal();
    }

    useEffect(() => {
        if (!from) {
            setFromCityName('');
        }
    }, [from])

    useEffect(() => {
        if (!to) {
            setToCityName('');
        }
    }, [to])

    useEffect(() => {
        if (searchVal.length >= 2) {
            const timeOutId = setTimeout(() => {
                 getCityApi(searchVal).then(r => {
                     if (r.success) {
                         console.log(r.cities)
                         setCitiesList(r.cities)
                     }
                 })
            }, 450)

            return () => clearTimeout(timeOutId);
        } else {
            setCitiesList([])
        }
    }, [searchVal])

    const renderItem = ({item, index}) => (
        <TouchableOpacity style={styles.cityItem} activeOpacity={0.5} onPress={() => onCityPress(item)}>
            <Text style={styles.cityName}>{item.FullName}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <View style={styles.leftIcon}>
                    <LocationLong />
                </View>
                <View style={{width: '92%'}}>
                    <View style={styles.mainItem}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.button, withRadius && styles.smallButton]} onPress={onFromPress}>
                            <Text style={[styles.placeholder, !!fromCityName && styles.text]}>{fromCityName || placeholderFrom}</Text>
                        </TouchableOpacity>
                        {withRadius && (
                            <MySelect
                                placeholder={'Радиус'}
                                leftIcon={<RadiusLong />}
                                data={radiusData}
                                value={fromRadius}
                                onChange={setFromRadius}
                                style={styles.radius}
                                buttonStyle={styles.radiusButton}
                                iconStyle={styles.radiusIcon}
                                disabled={!fromCityName}
                            />
                        )}
                    </View>
                    <View style={styles.mainItem}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.button, withRadius && styles.smallButton]} onPress={onToPress}>
                            <Text style={[styles.placeholder, !!toCityName && styles.text]}>{toCityName || placeholderTo}</Text>
                        </TouchableOpacity>
                        {withRadius && (
                            <MySelect
                                placeholder={'Радиус'}
                                leftIcon={<RadiusLong />}
                                data={radiusData}
                                value={toRadius}
                                onChange={setToRadius}
                                style={styles.radius}
                                buttonStyle={styles.radiusButton}
                                iconStyle={styles.radiusIcon}
                                disabled={!toCityName}
                            />
                        )}
                    </View>


                </View>

            </View>
            {/*{(needInfo && (fromCityName === 'Новороссийск' || toCityName === 'Новороссийск')) && (
                <View style={styles.row}>
                    {fromCityName === 'Новороссийск' ? (
                        <MySelect
                            style={styles.select}
                            data={selectData}
                            value={fromInfo}
                            onChange={setFromInfo}
                            keyName={'title'}
                            placeholder={'...'}
                        />
                    ) : <View />}
                    {toCityName === 'Новороссийск' ? (
                        <MySelect
                            style={styles.select}
                            data={selectData}
                            value={toInfo}
                            onChange={setToInfo}
                            keyName={'title'}
                            placeholder={'...'}
                        />
                    ) : <View />}
                </View>
            )}*/}


            <Modal isVisible={isModalVisible} onBackdropPress={closeModal} onBackButtonPress={closeModal}>
                <View style={styles.modalWrapper}>
                    <AppInput
                        color={COLORS.subTextLight}
                        placeholder={'Название местности'}
                        value={searchVal}
                        onChangeText={setSearchVal}
                        inputStyles={styles.inputWrapper}
                        autoCapitalize={"none"}
                    />
                    {searchVal.length > 3 && !citiesList?.length && (
                        <Text style={styles.notFound}>Не найдено</Text>
                    )}
                    <FlatList
                        data={citiesList}
                        renderItem={renderItem}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10
    },
    leftIcon: {
        marginRight: '2%',
        width: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    button: {
        justifyContent: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
        paddingBottom: 14,
        marginBottom: 14
    },
    smallButton: {
        width: '50%',
    },
    radiusIcon: {
        width: '12%',
        marginRight: '4%'
    },
    radius: {
        paddingTop: 0,
        paddingBottom: 14,
        width: '45%'
    },
    radiusButton: {},
    mainItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeholder: {
        color: COLORS.gray,
        fontFamily: FONTS.regular
    },
    text: {
        color: COLORS.text1
    },
    modalWrapper: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        height: '60%'
    },
    inputWrapper: {
        marginHorizontal: '5%',
        marginTop: '5%',
        width: '90%'
    },
    cityItem: {
        marginBottom: 10,
        marginHorizontal: '5%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: COLORS.inputBorder
    },
    cityName: {

    },
    notFound: {
        color: COLORS.subTextLight,
        alignSelf: 'center',
        marginTop: '49%',
        fontFamily: FONTS.regular
    },
    select: {
        width: '48%',
    }
})

export default OtkudaKuda;
