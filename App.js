import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from "react-redux";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Navigations} from "./src/navigations/index";
import {store} from "./src/store";
import {loadAsync, useFonts } from 'expo-font';
import {FONTS_TO_IMPORT} from "./src/themes/constants/fonts";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";

SplashScreen.preventAutoHideAsync();


const  App = ()=> {
    const [isLoaded] = useFonts(FONTS_TO_IMPORT);



    if (!isLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <StatusBar backgroundColor="#F9F8F6" style="dark"/>
                <Navigations/>
                <StatusBar style="auto"/>
            </SafeAreaProvider>
        </Provider>
    );
}
export default App;
