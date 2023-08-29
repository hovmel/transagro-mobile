import React from 'react';
import {View,  StyleSheet} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import AppButton from "src/components/button/app-button";
import TitleSubtitleBlock from "src/components/title-subtitle-block/title-subtitle-block";
import TestLogo from "src/assets/icons/test-logo";
import {useNavigation} from "@react-navigation/native";
import IconTitleBox from "src/components/iconTitleBox/icon-title-box";
import LocationIcon from "src/screens/SignInScreens/WelcomeScreen/icons/locationIcon";
import MainLogo from "src/assets/icons/MainLogo.svg"
import MainScreenFirst from "src/assets/icons/MainScreenFirst.svg"
import MainScreenSecond from "src/assets/icons/MainScreenSecond.svg"
import MainScreenThird from "src/assets/icons/MainScreenThird.svg"

const WelcomeScreen = () => {
    const navigation = useNavigation()
    return (
        <AppWrapper
            center
            button={<AppButton
                onPress={()=>{navigation.navigate("AddAccountTypeScreen")}}
                buttonTitle={"Продолжить"}/>}
        >
                <View style={{marginBottom: 24, alignItems: 'center'}}>
                    <MainLogo />
                </View>
                    <TitleSubtitleBlock
                        title={`Управляйте своими \nперевозками легко и удобно`}
                    />
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <IconTitleBox icon={<MainScreenFirst/>} title={'Отслеживайте грузы,'}/>
                <IconTitleBox icon={<MainScreenSecond/>} title={'Контролируйте затраты,'}/>
                <IconTitleBox icon={<MainScreenThird/>} title={'Сокращайте время доставки'}/>
            </View>
        </AppWrapper>
    );
};

export default WelcomeScreen;
