import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import {useSelector} from "react-redux";
import {getFirmData} from "src/services/API/get-firms";
import {useNavigation} from "@react-navigation/native";
import TitleBlock from "src/components/title-block/title-block";
import {sendReview} from "src/services/API/send-review";
import AddToFavorites from "src/assets/icons/AddToFavorites.svg";
import {COLORS} from "src/themes/constants/colors";
import AppInput from "src/components/input/app-input";
import AppButton from "src/components/button/app-button";
import GoBack from "../../../components/go-back";
import {FONTS} from "../../../themes/constants/fonts";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";

const FirmSingleScreen = ({route}) => {
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

export default FirmSingleScreen;
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

// SIK EN OTZIV XRKELU MOMENTNE CHEM JNJE TOX MNA KRNA PETK GA
//
// <Text style={[globalStyles.title, {textAlign: 'center', marginVertical: 12}]}>
//     Отправить отзыв
// </Text>
// <AppInput
//     multiline={true}
//     placeholder={'Отзыв...'}
//     value={reviewText}
//     onChangeText={setReviewText}
// />
// <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 6}}>
//     <View style={{width: '48%'}}>
//         <AppButton
//             onPress={() => {
//                 handleSendReview()
//             }}
//             buttonTitle={'Отправить'}
//         />
//     </View>
//     <View style={{width: '48%'}}>
//         <AppButton
//             onPress={() => {
//                 navigation.goBack()
//             }}
//             buttonTitle={'Назад'}
//         />
//     </View>
// </View>
