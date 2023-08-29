import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import AppButton from "src/components/button/app-button";
import {globalStyles} from "src/themes/global_styles/global_styles";
import {COLORS} from "src/themes/constants/colors";
import {FONTS} from "src/themes/constants/fonts";
import {useSelector} from "react-redux";
import {ROLES} from "src/themes/constants/roles";
import { Link } from '@react-navigation/native';
import moment from "moment/moment";

const SubscribeScreen = () => {
    const userData = useSelector((store) => store.user_data.user_data)
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const isPaymentWorking = useSelector((store) => store.user_data.user_data)?.isPaymentWorking === '1';
    const isSubscribed = useSelector((store) => store.user_data.isSubscribed)

    const onPress = () => {
        Linking.openURL(`https://transagro.pro/subscribe-redirect?token=${tokenFromReducer}`)
    }

    return (
        <AppWrapper button={isPaymentWorking && <AppButton onPress={onPress} buttonTitle={isSubscribed ? 'Продлить подписку' : 'Оформить подписку'}/>}>
            <View style={{flex: 1}}>
                <View style={styles.subscribeBox}>
                    <View style={styles.subscriptionRow}>
                        <View style={styles.subscriptionInfoBlock}>
                            <Text style={styles.statusTitle}>Статус подписки:</Text>
                            <Text style={[styles.status, isSubscribed && styles.active]}>
                                {isSubscribed ? 'Активна' : 'Не активна'}
                            </Text>
                        </View>
                        <View>
                            {isSubscribed && (
                                <>
                                    <Text style={styles.statusTitle}>Истекает:</Text>
                                    <Text style={styles.subtitle}>
                                        {userData?.valid_until && moment(userData.valid_until, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YY')}
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View>
                        <Text style={styles.statusTitle}>Ваша роль:</Text>
                        <Text style={[styles.subtitle, {marginBottom: 8}]}>{ROLES[userData?.role_id]}</Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={{marginTop: 14}}>
                        <Text style={[styles.statusTitle, {marginBottom: 12}]}>Преимущества подписки:</Text>
                        <Text style={styles.subtitle}>1. Размещать ваши машины на платформе</Text>
                        <Text style={styles.subtitle}>2. Размещать ваши грузы на платформе</Text>
                        <Text style={styles.subtitle}>3. Просматривать контакты компаний</Text>
                        <Text style={styles.subtitle}>4. Договариваться о сделках</Text>
                        <Text style={styles.subtitle}>5. Оставлять отзывы о компаниях </Text>
                    </View>
                </View>
            </View>
            {isSubscribed && userData.subscribe_message_status === '0' ? (
                    <Text style={[styles.subtitle, {textAlign: 'center', paddingHorizontal: 24}]}>
                        У вас действует подписка, которую вы бесплатно получили при регистрации
                    </Text>
            ) :
                isPaymentWorking ? (
                    <Text style={[styles.subtitle, {textAlign: 'center', paddingHorizontal: 24}]}>
                        Перейдите на наш сайт, чтобы {isSubscribed ? 'продлить': 'оформить'} подписку
                    </Text>
                ) : (
                    <Text style={[styles.subtitle, {textAlign: 'center', paddingHorizontal: 24}]}>
                        Для получения подписки вам нужно активно заходить в приложение в течение 7 дней
                    </Text>
                )
            }

        </AppWrapper>
    );
};

export default SubscribeScreen;

const styles = StyleSheet.create({
    subscribeBox: {
        width: '100%',
        backgroundColor: '#F6FFF5',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'green',
        paddingHorizontal: 26,
        paddingVertical: 28
    },
    statusTitle: {
        fontSize: 12,
        color: COLORS.text1,
        fontFamily: FONTS.medium,
        marginBottom: 4
    },
    subscriptionRow: {
        flexDirection: 'row'
    },
    subscriptionInfoBlock: {
        width: '50%'
    },
    status: {
        fontSize: 18,
        color: COLORS.red,
        fontFamily: FONTS.regular
    },
    active: {
        color: COLORS.green,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        marginBottom: 16,
        color: COLORS.gray,
        fontFamily: FONTS.regular
    },
    line:{
        width: '100%',
        height: 1,
        backgroundColor: '#C2D0E1',
        marginTop: 8,
        marginBottom: 18
    }
})
