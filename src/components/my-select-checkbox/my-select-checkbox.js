import React, {useMemo, useState} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from "react-native-modal";
import {FONTS} from "../../themes/constants/fonts";
import {COLORS} from "../../themes/constants/colors";
import ArrowDown from "src/assets/icons/ArrowDown.svg"
import MyCheckbox from "../my-checkbox/my-checkbox";

const MySelectCheckbox = ({data, onChange, style, keyName = 'title', placeholder, leftIcon}) => {
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

    const onPressItem = index => () => {
        data[index].isSelected = !data[index].isSelected;
        onChange([...data])
    }

    const renderItem = ({item, index}) => (
        <View style={styles.item}>
            <MyCheckbox style={styles.checkbox} value={item.isSelected} onChangeFunction={onPressItem(index)} label={item[keyName]} />
        </View>
    )

    const value = useMemo(() => {
        if (data?.length) {
            return data.filter(item => item.isSelected).map(item => item[keyName]).join(', ');
        }
        return ''
    }, [data])

    return (
        <View style={[styles.wrapper, style]}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={openModal}>
                <Text numberOfLines={1} style={[styles.placeholderText, !!value && styles.text]}>{value || placeholder}</Text>
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
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
        fontFamily: FONTS.light,
        maxWidth: '90%',
    },
    leftIcon: {
        marginRight: '2%',
        width: '6%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black'
    },
    modalWrapper: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 34,
        maxHeight: Dimensions.get('window').height * 0.6,
        alignItems: 'center',
        alignSelf: 'center'
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
    checkbox: {
    }
})

export default MySelectCheckbox;
