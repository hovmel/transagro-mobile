import React, {useState} from 'react';
import AppWrapper from "src/components/wrapper/app-wrapper";
import AppButton from "src/components/button/app-button";
import AppTitle from "src/components/title/app-title";
import AppInput from "src/components/input/app-input";
import {View,Text, StyleSheet} from "react-native";
import Modal from 'react-native-modal'
import {useNavigation} from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <AppWrapper
            arrowLeft
            center
            keyboardView
            button={<AppButton onPress={()=>{setModalVisible(true)}} buttonTitle={"Продолжить"}/>}
        >
            <AppTitle title={"Введите почту!"}/>
            <View style={{marginTop: 24}}>
                <AppInput placeholder={"Введите почту"}/>
            </View>
            <Modal isVisible={modalVisible}>
                <View style={styles.modal}>
                    <Text style={styles.modal_title}>
                        Мы отправили код подтверждения на почту
                    </Text>

                    <View style={styles.modal_input}>
                            <AppInput/>
                    </View>
                    <View style={{paddingHorizontal: 16}}>
                        <AppButton onPress={()=>{setModalVisible(false)}} buttonTitle={'Введите код'}/>
                    </View>
                </View>
            </Modal>
        </AppWrapper>
    );
};
export default ForgotPasswordScreen;
const styles = StyleSheet.create({
    modal: {
        width: '100%',
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 12
    },
    modal_title:{
        textAlign: 'center',
        marginTop: 12,
        fontSize: 14
    },
    modal_input:{
        flex: 1,
        paddingHorizontal: 110,
        marginTop: 22
    }
})
