import React from 'react';
import AppWrapper from "src/components/wrapper/app-wrapper";
import TitleSubtitleBlock from "src/components/title-subtitle-block/title-subtitle-block";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import AppButton from "src/components/button/app-button";
import {COLORS} from "src/themes/constants/colors";
import {useNavigation} from "@react-navigation/native";
import CreateAccountIcon from "src/assets/icons/create-account-icon";
import {FONTS} from "../../../themes/constants/fonts";

const AddAccountTypeScreen = ({navigation}) => {
    return (
        <AppWrapper arrowLeft center>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <CreateAccountIcon/>
                    </View>
                    <TitleSubtitleBlock title={"Давайте создадим \nучётную запись"}/>
                    <AppButton
                        selectButton
                        selectTitle={'Грузовладелец'}
                        onPressSelect={()=>{navigation.navigate('CreateAccountScreen',{
                            role_id: 1
                        })}}
                    />
                    <AppButton
                        selectButton
                        onPressSelect={()=>{navigation.navigate('CreateAccountScreen',{
                            role_id: 2
                        })}}
                        selectTitle={"Перевозчик"}/>
                    <AppButton
                        selectButton
                        noBorder
                        onPressSelect={()=>{navigation.navigate('CreateAccountScreen',{
                            role_id: 3
                        })}}
                        selectTitle={"Грузовладелец-перевозчик"}/>
                </View>
                <View style={styles.text_block}>
                    <Text style={styles.text_block_text}>Есть аккаунт?</Text>
                </View>
            <AppButton
                onPress={()=>{navigation.navigate("SignInScreen")}}
                buttonTitle={'Войти'}/>
        </AppWrapper>
    );
};

export default AddAccountTypeScreen;
const styles = StyleSheet.create({
    text_block:{
        marginBottom: 16,
        flexDirection: 'row',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.text1,
    },
    text_block_text:{
        fontFamily: FONTS.light,
        color: COLORS.text1,
        fontSize: 16
    }
})
