import React, {useEffect, useState} from 'react';
import AppWrapper from "src/components/wrapper/app-wrapper";
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import AppTitle from "src/components/title/app-title";
import AppInput from "src/components/input/app-input";
import AppButton from "src/components/button/app-button";
import {COLORS} from "src/themes/constants/colors";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setUserToken} from "src/store/actions/user_token";
import {handleLoginApi} from "src/services/API/registration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FONTS} from "../../../themes/constants/fonts";
import {handleGetUserData} from "../../../services/API/get-user-data";
import {setUserData} from "../../../store/actions/user_data";


const SignInScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)

    const handleLogin = async () => {
        const data = {
            email: email,
            password: password,
        }
       handleLoginApi(data).then((r) => {
           console.log(r)
            if (!r.success){
                setError(true)
            }else {
                setError(false)
                AsyncStorage.setItem('token', r.company.api_token);
                dispatch(setUserToken(r.company.api_token))
                handleGetUserData(r.company.api_token).then(r2 => {
                    dispatch(setUserData(r2.user))
                })
               // console.log(r.company.api_token, 'success')
            }
       })
    }

    useEffect(() => {
        if (error) {
            setError(false)
        }
    }, [email, password])

    return (
        <AppWrapper center keyboardView arrowLeft button={
            <AppButton
                onPress={()=>{handleLogin().then(r => console.log(r))}} buttonTitle={'Войти'}
            />
        }>
            <View style={{alignItems: 'center', paddingHorizontal: 40}}>
                <AppTitle title={'Войти в аккаунт'}/>
                <View style={{marginVertical: 20}}>
                    <AppInput
                        placeholder={'Логин'}
                        onChangeText={(email)=>{setEmail(email)}}
                        value={email}
                        autoCapitalize={'none'}
                        keyboard
                        keyboardType={'email-address'}
                    />
                    <AppInput
                        placeholder={'Пароль'}
                        onChangeText={(password)=>{setPassword(password)}}
                        value={password}
                        autoCapitalize={'none'}
                        secureTextEntry
                    />
                </View>
                <View>

                    {error && <Text style={styles.error_message}>Неверные данные</Text>}
                    {/*<TouchableOpacity onPress={()=>{navigation.navigate('ForgotPasswordScreen')}}>*/}
                    {/*    <Text style={styles.forgot_password}>Забыли пароль?</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        </AppWrapper>
    );
};

export default SignInScreen;
const styles = StyleSheet.create({
    forgot_password:{
        color: COLORS.globalBlue
    },
    error_message:{
        color: COLORS.red,
        fontSize: 14,
        alignSelf: 'flex-end',
        fontFamily: FONTS.regular
    }
})
