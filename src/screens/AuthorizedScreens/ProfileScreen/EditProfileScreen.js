import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import AppWrapper from "src/components/wrapper/app-wrapper";
import {globalStyles} from "src/themes/global_styles/global_styles";
import AppInput from "src/components/input/app-input";
import AppButton from "src/components/button/app-button";
import {useNavigation} from "@react-navigation/native";
import {handleGetUserData, updateUserData} from "src/services/API/get-user-data";
import {setUserData} from "src/store/actions/user_data";
import {COLORS} from "../../../themes/constants/colors";
import {FONTS} from "../../../themes/constants/fonts";
import GoBack from "../../../components/go-back";

const EditProfileScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userData = useSelector((store) => store.user_data.user_data)
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)

    const [error, setError] = useState(false)

    const [inn, setInn] = useState()
    const [ogrn, setOgrn] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [legalAddress, setLegalAddress] = useState()
    const [postalAddress, setPostalAddress] = useState()

    console.log(userData, 'userData')

    const handleUpdateUser = async () => {
        const data = {
            email: userData.email,
            company_name: userData.company_name,
            phone_number: phoneNumber,
            inn: inn,
            ogrn: ogrn,
            legal_address: legalAddress,
            postal_address: postalAddress
        }

        if (
            !data.phone_number ||
            !data.inn ||
            !data.ogrn ||
            !data.legal_address ||
            !data.postal_address
        ) {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 2000);
            return
        }

        const res = await updateUserData(tokenFromReducer, data);
        if (res.success) {
            const userDataRes = await handleGetUserData(tokenFromReducer);
            dispatch(setUserData(userDataRes.user))
            navigation.navigate('ProfileScreen')
        }
    }

    useEffect(() => {
        if (userData?.id) {
            setInn(userData.inn);
            setOgrn(userData.ogrn);
            setPhoneNumber(userData.phone_number);
            setLegalAddress(userData.legal_address);
            setPostalAddress(userData.postal_address);
        }
    }, [userData])

    return (
        <AppWrapper>
            <GoBack navigation={navigation} />
            <Text style={styles.title}>Редактирование данных</Text>
            <View style={styles.container}>
                <Text style={styles.description}>ИНН:</Text>
                <AppInput
                    value={inn}
                    onChangeText={setInn}
                    numeric
                />
                <Text style={styles.description}>ОГРН:</Text>
                <AppInput
                    value={ogrn}
                    onChangeText={setOgrn}
                    numeric
                />
                <Text style={styles.description}>Номер телефона:</Text>
                <AppInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType={'phone-pad'}
                />
                <Text style={styles.description}>Юр. адрес:</Text>
                <AppInput
                    value={legalAddress}
                    onChangeText={setLegalAddress}
                />
                <Text style={styles.description}>Почтовый индекс:</Text>
                <AppInput
                    value={postalAddress}
                    onChangeText={setPostalAddress}
                    numeric
                />
            </View>

            <Text style={styles.error}>{error && 'Заполните все поля'}</Text>

            <View style={styles.btn_container}>
                <View style={styles.buttonBox}>
                    <AppButton
                        isDeleteStyle
                        buttonTitle={'Отменить'}
                        onPress={() => navigation.navigate("ProfileScreen")}
                    />
                </View>
                <View style={styles.buttonBox}>
                    <AppButton
                        buttonTitle={'Сохранить'}
                        onPress={handleUpdateUser}
                    />
                </View>
            </View>
        </AppWrapper>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24
    },
    title: {
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        marginBottom: 14,
        fontSize: 18
    },
    btn_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonBox: {
        width: '49%'
    },
    description:{
        fontSize: 14,
        marginBottom: 6,
        fontFamily: FONTS.medium,
        color: COLORS.text1
    },
    descriptionBox:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    error:{
        color: COLORS.error,
        textAlign: 'center',
        fontFamily: FONTS.medium,
        marginVertical: 12
    }
})
