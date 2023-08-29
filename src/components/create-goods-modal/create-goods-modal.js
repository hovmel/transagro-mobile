import React, {useState} from 'react';
import Modal from "react-native-modal";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform} from "react-native";
import XMark from "src/assets/icons/xMark";
import AppInput from "src/components/input/app-input";
import AppButton from "src/components/button/app-button";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

const CreateGoodsModal = (props) => {
    const {modalVisible, onPressX, onPressAddCargo} = props;

    return (
        <Modal useNativeDriver={Platform.OS === 'android'} isVisible={modalVisible}>
            <View style={styles.modal_box}>
                <ScrollView style={{flex: 1}}>
                    <TouchableOpacity onPress={onPressX} style={styles.xMarkBox}>
                        <XMark/>
                    </TouchableOpacity>
                    <View style={styles.inputBox}>
                        <View style={styles.inputView}>
                            <AppInput label={'Откуда'}/>
                        </View>
                        <View style={styles.inputView}>
                            <AppInput label={'Куда'}/>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.inputView}>
                            <AppInput label={'Тип кузова'}/>
                        </View>
                        <View style={styles.inputView}>
                            <AppInput label={'Тип загрузки'}/>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.inputView}>
                            <AppInput label={'Тип оплаты'}/>
                        </View>
                        <View style={styles.inputView}>
                            <AppInput label={'Руб/кг'}/>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.inputView}>
                            <AppInput label={'Название компании'}/>
                        </View>
                        <View style={styles.inputView}>
                            <AppInput label={'Тел. номер'}/>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.inputView}>
                            <AppInput label={'Макс. вес/кг'}/>
                        </View>
                        <View style={styles.inputView}>
                            <AppInput label={'Макс. масса'}/>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.inputView}>
                            <AppInput label={'Дата загузки'}/>
                        </View>

                    </View>
                </ScrollView>
                <AppButton onPress={onPressAddCargo} buttonTitle={'Добавить груз'}/>
            </View>
        </Modal>
    );
};

export default CreateGoodsModal;

const styles = StyleSheet.create({
    modal_box: {
        width: '100%',
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16
    },
    xMarkBox: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        marginTop: 16,
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    inputView: {
        width: '48%'
    }
})
