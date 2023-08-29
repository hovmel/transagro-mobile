import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import {COLORS} from "src/themes/constants/colors";
import {useDispatch, useSelector} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import AppButton from "src/components/button/app-button";
import {searchRides} from "src/services/API/search-cargo";
import OtkudaKuda from "src/components/otkuda-kuda/otkuda-kuda";
import MySelectCheckbox from "../../../components/my-select-checkbox/my-select-checkbox";
import CarIcon from "../../../assets/icons/car.svg";
import {kuzovTypes} from "../../../themes/constants/types";
import Clean from "../../../components/clean/clean";
import {duplicateArray} from "../../../services/helpers/duplicateArray";
import LocationShortIcon from "../../../assets/icons/location_short.svg";
import LongArrowRightIcon from "../../../assets/icons/long_arrow_right.svg";
import {useNavigation} from "@react-navigation/native";
import {FONTS} from "../../../themes/constants/fonts";
import FavoritesButton from "../../../components/favoritesButton";
import {addRideToFavorites, deleteFromFavorites, getFavorites} from "../../../services/API/favorites_api";
import {setFavorites} from "../../../store/actions/favorites";
import moment from "moment/moment";

const SearchCarsScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const favoritesIds = useSelector((store) => store.favorites.favoritesIds)
    const [cargoList, setCargoList] = useState([])
    const [searchedData, setSearchedData] = useState(false)

    const [kuzovType, setKuzovType] = useState(duplicateArray(kuzovTypes))

    const [fromCityId, setFromCityId] = useState('')
    const [toCityId, setToCityId] = useState('')
    const [onloadLocationRadius, setOnloadLocationRadius] = useState('')
    const [uploadLocationRadius, setUploadLocationRadius] = useState('')

    const [fromCityName, setFromCityName] = useState('');
    const [toCityName, setToCityName] = useState('');

    const [searchingLoading, setSearchingLoading] = useState(false);
    const [favoritesLoading, setFavoritesLoading] = useState(false);

    const onSearch = async () => {
        try {
            setSearchingLoading(true);
            const activeKuzovTypes = kuzovType?.filter(i => i.isSelected).map(i => i.title);

            const data = {
                upload_loc_id: fromCityId,
                onload_loc_id: toCityId,
                upload_loc_radius: uploadLocationRadius?.title,
                onload_loc_radius: onloadLocationRadius?.title,
                kuzovType: activeKuzovTypes?.length ? JSON.stringify(activeKuzovTypes) : undefined
            }

            const res = await searchRides(tokenFromReducer, data);

            if (res.success) {
                setCargoList(res.rides)
                setSearchedData(true)
            }
        } catch (e) {
            console.log(e, 'while searching ride')
        } finally {
            setSearchingLoading(false);
        }
    }

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

    const clearInputs = () => {
        setFromCityId();
        setToCityId();
        setKuzovType(duplicateArray(kuzovTypes));
        setOnloadLocationRadius();
        setUploadLocationRadius();
    };

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    navigation.navigate('SingleCarScreen', {singleCar: item})
                }}
                style={styles.cargo_item}>
                <FavoritesButton
                    onPress={() => onFavoritesPress(item)}
                    isActive={favoritesIds?.rides?.includes(item.id)}
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
    }

    return (
        <AppWrapper
            button={!searchedData &&
                <AppButton
                    buttonTitle={'Поиск машины'}
                    onPress={onSearch}
                    loading={searchingLoading}
                />
            }>
            {!searchedData ?
                <KeyboardAwareScrollView>
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={styles.inputBlock}>
                            <OtkudaKuda
                                from={fromCityId}
                                to={toCityId}
                                setFrom={setFromCityId}
                                setTo={setToCityId}
                                fromCityName={fromCityName}
                                setFromCityName={setFromCityName}
                                toCityName={toCityName}
                                setToCityName={setToCityName}
                                placeholderFrom={'Пункт погрузки'}
                                placeholderTo={'Пункт выгрузки'}
                                fromRadius={uploadLocationRadius}
                                setFromRadius={setUploadLocationRadius}
                                toRadius={onloadLocationRadius}
                                setToRadius={setOnloadLocationRadius}
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
        </AppWrapper>
    );
};

export default SearchCarsScreen;

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
        height: 380,
        borderRadius: 16,
        backgroundColor: '#fff',
        padding: 16,

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
})
