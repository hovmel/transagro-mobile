import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {globalStyles} from "src/themes/global_styles/global_styles";

const YourCarsElem = (props) => {
    const {startPlace, endPlace, carStates, carProps} = props
    return (
        <View style={styles.item_box}>
            <Text style={styles.title}>{startPlace}</Text>
            <Text style={styles.title}>{endPlace}</Text>
            <Text style={globalStyles.description}>{carStates}</Text>
            <Text style={globalStyles.description}>{carProps}</Text>
            <Text style={{marginTop: 8}}>Ваша машина</Text>
        </View>
    );
};

export default YourCarsElem;
const styles = StyleSheet.create({
    item_box:{
        width: '100%',
        height: 135,
        backgroundColor: '#F6F8FA',
        borderRadius: 6,
        marginBottom: 12,
        padding: 12
    },
    title:{
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 26,
    }

})
