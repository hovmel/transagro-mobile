import React, {useState} from 'react';
import AppWrapper from "src/components/wrapper/app-wrapper";
import {View, Text} from "react-native";
import AppTitle from "src/components/title/app-title";
import AppInput from "src/components/input/app-input";
import AppButton from "src/components/button/app-button";
import {useDispatch} from "react-redux";
import {setUserToken} from "src/store/actions/user_token";
import {handleRegistration} from "src/services/API/registration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MySelect from "../../../components/my-select/my-select";
import CreateAccountIcon from "../../../assets/icons/create-account-icon";
import {COLORS} from "../../../themes/constants/colors";
import {FONTS} from "../../../themes/constants/fonts";
import {setInfoModalText, setUserData} from "../../../store/actions/user_data";
import {welcomeText} from "../../../services/helpers/constants";
import {handleGetUserData} from "../../../services/API/get-user-data";

const ipOOO = [{title: 'ООО'}, {title: 'ИП'}, {title: 'Самозанятый'}];

const CreateAccountScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [company_name, setCompanyName] = useState('')
    const [ipOrOOO, setIpOrOOO] = useState('');
    const [legal_address, setLegalAddress] = useState('')
    const [postal_address, setPostalAddress] = useState('')
    const [inn, setIin] = useState('')
    const [ogrn, setOgrn] = useState('')

    const [logo_url, setLogoUrl] = useState('')
    const [favorites, setFavorites] = useState('')
    const [showError, setShowError] = useState('')

    const [loading, setLoading] = useState(false);

    const handleRegistrationCargoOwner = async () => {
        try {
            setLoading(true)
            if (!email || !phone_number || !password || !company_name || !ipOrOOO || !legal_address || !postal_address || !inn || !ogrn) {
                setShowError('Необходимо заполнить все поля')
                setTimeout(()=>{
                    setShowError('')
                }, 2000)
                return false;
            }

            const data = {
                email: email,
                phone_number: phone_number,
                password: password,
                company_name: ipOrOOO.title + ' ' + company_name,
                legal_address: legal_address,
                postal_address: postal_address,
                role_id: props?.role_id,
                inn: inn,
                ogrn: ogrn,/*
            favorites: favorites,
            logo_url: logo_url,*/

            }

            const res = await handleRegistration(data)
            console.log('Result:', res);

            if (res.success){
                await AsyncStorage.setItem('token', res.data.api_token);
                dispatch(setUserToken(res.data.api_token));
                dispatch(setInfoModalText(welcomeText));
                handleGetUserData(res.data.api_token).then(r => {
                    dispatch(setUserData(r.user))
                })
            } else {
                if (res.message === 'Validation errors') {
                    let error = 'Заполните поля правильно'
                    if (res?.data?.email && res?.data?.email[0] === 'The email has already been taken.') {
                        error = 'Этот email уже используется'
                    }
                    setShowError(error)
                    setTimeout(()=>{
                        setShowError('')
                    }, 2000)
                }
            }
        } catch (e) {
            setShowError(true)
            setTimeout(()=>{
                setShowError(false)
            }, 2000)
        } finally {
            setLoading(false)
        }

    }

    return (
        <AppWrapper
            keyboardView={true}
            arrowLeft
            center
            button={
                <AppButton disabled={password?.length < 8} loading={loading} buttonTitle={'Зарегистрироваться'}
                           onPress={handleRegistrationCargoOwner}
                />
            }
           >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{marginRight: 10}}>
                        <CreateAccountIcon width={36} height={36} />
                    </View>
                    <AppTitle title={"Создать учётную запись"}/>
                </View>
                <View style={{marginTop: 24, paddingHorizontal: 20}}>
                    <AppInput
                        placeholder={"Email"}
                        onChangeText={(email)=>{setEmail(email)}}
                        value={email}
                        autoCapitalize={'none'}
                    />
                    <AppInput
                        placeholder={"Номер телефона"}
                        onChangeText={(phoneNumber)=>{setPhoneNumber(phoneNumber)}}
                        value={phone_number}
                        autoCapitalize={'none'}
                        keyboardType={'phone-pad'}
                    />
                    <AppInput
                        placeholder={"Пароль (минимум 8 символов)"}
                        onChangeText={(password)=>{setPassword(password)}}
                        value={password}
                        autoCapitalize={'none'}
                        secureTextEntry
                    />
                    <MySelect
                        data={ipOOO}
                        keyName={'title'}
                        value={ipOrOOO}
                        placeholder={'ИП / ООО / Самозанятый'}
                        onChange={setIpOrOOO}
                    />
                    <AppInput
                        placeholder={"Название организации"}
                        onChangeText={(companyName)=>{setCompanyName(companyName)}}
                        value={company_name}
                        autoCapitalize={'none'}
                    />
                    <AppInput
                        placeholder={"Почтовый индекс"}
                        onChangeText={(postalAddress)=>{setPostalAddress(postalAddress)}}
                        value={postal_address}
                        autoCapitalize={'none'}
                        numeric
                    />
                    <AppInput
                        placeholder={"Юридический адрес"}
                        onChangeText={(legalAddress)=>{setLegalAddress(legalAddress)}}
                        value={legal_address}
                        autoCapitalize={'none'}
                    />
                    <AppInput
                        placeholder={"ИНН организации"}
                        value={inn}
                        onChangeText={(ogrn)=>{setIin(ogrn)}}
                        autoCapitalize={'none'}
                        numeric
                    />
                    <AppInput
                        placeholder={"ОГРН организации"}
                        value={ogrn}
                        onChangeText={(ogrn)=>{setOgrn(ogrn)}}
                        autoCapitalize={'none'}
                        numeric
                    />
                    {showError && <Text style={{color: COLORS.red, fontFamily: FONTS.regular, fontSize: 14, marginBottom: 6, position: 'absolute', bottom: -26, left: 20}}>
                        {showError}
                    </Text>}
                </View>
        </AppWrapper>
    );
};

export default CreateAccountScreen;
