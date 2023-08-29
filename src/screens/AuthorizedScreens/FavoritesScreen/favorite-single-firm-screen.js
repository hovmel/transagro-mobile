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
import TitleBlock from "../../../components/title-block/title-block";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {sendReview} from "../../../services/API/send-review";


const FavoriteSingleFirmScreen = ({route}) => {
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const {firmData} = route.params
    const navigation = useNavigation()
    const [reviewText, setReviewText] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSendReview = async () => {
        if (!reviewText) {
            return
        }

        setLoading(true);
        const data = {
            review_text: reviewText,
            company_id: firmData.id
        }
        const res = await sendReview(data, tokenFromReducer)
        if (res.success) {
            setReviewText('')
        }
        setLoading(false)
    }

    return (
        <AppWrapper>
            <GoBack navigation={navigation} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.firmBox}>
                    <TitleBlock title={'Название компании'} subtitle={firmData.company_name}/>
                    <TitleBlock title={'Email'} subtitle={firmData.email}/>
                    <TitleBlock title={'Телефон'} subtitle={firmData.phone_number}/>
                    <TitleBlock title={'Почтовый индекс'} subtitle={firmData.postal_address}/>
                    <TitleBlock title={'Юридический адрес'} subtitle={firmData.legal_address}/>
                    <TitleBlock title={'ИНН'} subtitle={firmData.inn}/>
                    <TitleBlock title={'ОГРН'} subtitle={firmData.ogrn}/>
                    {firmData.managers?.length && (
                        <View>
                            <Text style={styles.title}>Менеджеры</Text>
                            {firmData.managers?.map(item => (
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.subTitle}>{item.name}</Text>
                                    <Text style={styles.subTitle}>{item.phone_number}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.reviewBlock}>
                    <Text style={styles.placeholder}>Оставить жалобу:</Text>
                    <View style={{marginTop: 6}}>
                        <AppInput placeholder={"Текст..."} onChangeText={setReviewText} value={reviewText}/>
                        <View>
                            <AppButton loading={loading} disabled={!reviewText} style={styles.button} onPress={handleSendReview} buttonTitle={'Отправить'}/>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </AppWrapper>
    );
};

export default FavoriteSingleFirmScreen;

const styles = StyleSheet.create({
    firmBox:{
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#F5FAFF',
        borderColor: COLORS.blue,
        padding: 12
    },
    reviewBlock: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.yellow,
        padding: 12,
        marginTop: 10,
        backgroundColor: '#FFFEF5',
        marginBottom: 30
    },
    title: {
        marginBottom: 4,
        maxWidth: '90%',
        color: COLORS.text1,
        fontFamily: FONTS.bold,
        fontSize: 14,
    },
    subTitle: {
        color: COLORS.text1,
        fontSize: 16,
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    placeholder: {
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        fontSize: 16,
        marginBottom: 14
    },
    button: {
        height: 32,
        marginTop: 20,
        marginLeft: 'auto',
        width: '50%'
    }
})
