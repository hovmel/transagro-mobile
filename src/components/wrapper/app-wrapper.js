import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import ArrowLeft from "../../assets/icons/arrow-left";
import {useNavigation} from "@react-navigation/native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {COLORS} from "src/themes/constants/colors";
import AppTitle from "src/components/title/app-title";
import {Platform} from "expo-modules-core/src";

const AppWrapper = (props) => {
    const navigation = useNavigation()
    const {
        ignorePaddingHorizontal,
        children,
        arrowLeft,
        button,
        keyboardView,
        center,
        input,
        title,
        ignorePadding
    } = props
    return (
        <SafeAreaView style={[styles.container, {paddingTop: 0}]}>
            <View style={[styles.header]}>
                {arrowLeft &&
                    <TouchableOpacity style={{width: '20%', zIndex: 100}} onPress={navigation.goBack}>
                        <ArrowLeft height={18} width={18} />
                    </TouchableOpacity>
                }
                {title && <AppTitle title={title}/>}
                {input && <TextInput style={styles.input} placeholder={props.placeholder}/>}
            </View>

            {!keyboardView ?
                <View style={[styles.childrenView, center && {justifyContent: 'center'}, ignorePadding ? {paddingHorizontal: 0} : {paddingHorizontal: 16}]}>
                    {children}
                </View>
                :
                <KeyboardAwareScrollView
                    behavior="padding"
                    contentContainerStyle={[styles.keyboardView,  center && {justifyContent: 'center'},
                        ignorePadding ? {paddingHorizontal: 0} : {paddingHorizontal: 16}]}>
                    {children}
                </KeyboardAwareScrollView>
            }

            {button ? (
                <View style={{marginBottom: Platform.OS !== 'ios' ? 40 : 0, marginHorizontal: 16}}>
                    {button}
                </View>
            ) : null}
        </SafeAreaView>
    );
};

export default AppWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    header: {
        marginVertical: 16,
        justifyContent: 'center',
        paddingHorizontal: 12,
        zIndex: 100,
    },
    childrenView: {
        flex: 1,
        width: '100%',
        marginTop: Platform.OS === 'android' ? -24 : -45,
    },
    keyboardView:{
        width: '100%',

  },
    input:{
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: COLORS.inputColor,
        borderRadius: 12
    }
});
