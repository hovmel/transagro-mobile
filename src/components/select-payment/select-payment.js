import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import AppInput from "../input/app-input";
import MySelect from "../my-select/my-select";
import Checkbox from 'expo-checkbox'
import RubleIcon from 'src/assets/icons/ruble.svg'
import MyCheckbox from "../my-checkbox/my-checkbox";

const nalBeznalData = [{title: 'Нал'}, {title: 'Безнал'}]
const ndsBezndsData = [{title: 'НДС'}, {title: 'Без НДС'}]

const SelectPayment = ({nalBeznal, setNalBeznal, ndsBezNds, setNdsBeznds, isPredoplata, setIsPredoplata}) => {
    return (
        <View>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.leftIcon}><RubleIcon /></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{width: '48%'}}>
                        <MySelect
                            data={nalBeznalData}
                            value={nalBeznal}
                            onChange={setNalBeznal}
                            placeholder={'нал/безнал'}
                        />
                    </View>
                    <View style={{width: '47%'}}>
                        <MySelect
                            data={ndsBezndsData}
                            value={ndsBezNds}
                            onChange={setNdsBeznds}
                            placeholder={'НДС/без НДС'}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.checkbox}>
                <MyCheckbox label={'С предоплатой'} value={isPredoplata} setValue={setIsPredoplata} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginVertical: 20
    },
    checkboxRow: {
        marginBottom: 20,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    checkbox: {
        marginVertical: 12,
        paddingLeft: 6
    },
    checkboxText: {
        fontSize: 16,
    },
    leftIcon: {
        marginRight: '2%',
        width: '6%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default SelectPayment;
