import React from 'react';
import {Text, StyleSheet, View} from "react-native";
import AppTitle from "src/components/title/app-title";
import {globalStyles} from "src/themes/global_styles/global_styles";
import {COLORS} from "src/themes/constants/colors";
import AppButton from "src/components/button/app-button";
import {FONTS} from "../../themes/constants/fonts";
import {useSelector} from "react-redux";
import moment from "moment";

const Banner = ({subscribe_status, onPress}) => {
    const userData = useSelector((store) => store.user_data.user_data);

    return (
        <View style={styles.banner}>
            <View>
                <Text style={styles.statusTitle}>Статус подписки:</Text>
                <Text style={[styles.status, subscribe_status && styles.active]}>{subscribe_status ? 'Активна' : 'Не активна'}</Text>
                {subscribe_status && <Text style={styles.validUntil}>до {userData?.valid_until && moment(userData.valid_until, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YY')}</Text>}
            </View>
            <View style={{width: '50%'}}>
                <AppButton onPress={onPress} buttonTitle={subscribe_status ? 'Продлить' : 'Подписаться'}/>
            </View>
        </View>
    );
};

export default Banner;
const styles = StyleSheet.create({
    banner: {
        width: '100%',
        backgroundColor: '#F6FFF5',
        borderRadius: 8,
        marginBottom: 8,
        padding: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: COLORS.green,
        borderWidth: 1,
    },
    statusTitle: {
        fontSize: 14,
        color: COLORS.text1,
        fontFamily: FONTS.regular
    },
    status: {
        fontSize: 20,
        color: COLORS.red,
        fontFamily: FONTS.regular
    },
    validUntil: {
        fontSize: 16,
        color: COLORS.gray,
        fontFamily: FONTS.regular,
        marginTop: 4
    },
    active: {
        color: COLORS.green,
    },
})
