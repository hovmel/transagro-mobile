import React, {useState} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from "react-native-modal";
import {getCityApi} from "../../services/API/getCityApi";
import {FONTS} from "../../themes/constants/fonts";
import {COLORS} from "../../themes/constants/colors";
import ArrowDown from "src/assets/icons/ArrowDown.svg"

const MySelect = ({data, value, onChange, style, buttonStyle, keyName = 'title', placeholder, leftIcon, iconStyle, disabled}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const openModal = () => {
        setIsModalVisible(true)
    }

    const onSelect = (val) => {
        onChange(val);
        closeModal();
    }

    const renderItem = ({item, index}) => (
        <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={() => onSelect(item)}>
            <Text style={styles.itemText}>{item[keyName]}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={[styles.wrapper, style]}>
            {leftIcon && <View style={[styles.leftIcon, iconStyle]}>{leftIcon}</View>}

            <TouchableOpacity disabled={disabled} activeOpacity={0.5} style={[styles.button, disabled && styles.disabled, buttonStyle]} onPress={openModal}>
                <Text style={[styles.placeholderText, value?.[keyName] && styles.text]}>{value?.[keyName] || placeholder}</Text>
                <ArrowDown />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                useNativeDriver={Platform.OS === 'android'}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
            >
                <View style={[styles.modalWrapper, {height: data?.length * 56}]}>
                    {data?.length ? (
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <View style={styles.item}>
                            <Text style={styles.itemText}>Пусто</Text>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row'
    },
    button: {
        justifyContent: 'space-between',
        width: '92%',
        height: 42,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeholderText: {
        color: '#313131',
        fontFamily: FONTS.light
    },
    text: {
        color: 'black'
    },
    modalWrapper: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 14,
        maxHeight: Dimensions.get('window').height * 0.6,
        alignItems: 'center',
        alignSelf: 'center',
        minHeight: 70
    },
    inputWrapper: {
        marginHorizontal: '5%',
        marginTop: '5%',
        width: '90%'
    },
    item: {
        marginBottom: 10,
        marginHorizontal: '5%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: COLORS.inputBorder,
    },
    itemText: {
        textAlign: 'center'
    },
    leftIcon: {
        marginRight: '2%',
        width: '6%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabled: {
        opacity: 0.4
    },
})

export default MySelect;
