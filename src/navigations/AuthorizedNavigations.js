import React from 'react';
import {StyleSheet, View} from 'react-native';

const Drawer = createDrawerNavigator();
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SearchGoodsNavigation} from "./DrawerNavigations/SearchGoodsNavigation";
import {MyCarsNavigation} from "./DrawerNavigations/MyCarsNavigation";
import {MyGoodsNavigation} from "./DrawerNavigations/MyGoodsNavigation";
import {SearchFirmNavigation} from "./DrawerNavigations/SearchFirmNavigation";
import {FavoritesNavigation} from "./DrawerNavigations/FavoritesNavigation";
import {ProfileNavigation} from "./DrawerNavigations/ProfileNavigation";
import {SearchCarNavigation} from "./DrawerNavigations/SearchCarNavigation";
import {Text} from "react-native";
import {useSelector} from "react-redux";
import {SubscribeScreen} from "./DrawerNavigations/SubscribeNavigation";
import {COLORS} from "src/themes/constants/colors";
import {FONTS} from "src/themes/constants/fonts";
import Drawer1 from "src/assets/icons/drawer_1.svg"
import Drawer2 from "src/assets/icons/drawer_2.svg"
import Drawer3 from "src/assets/icons/drawer_3.svg"
import Drawer4 from "src/assets/icons/drawer_4.svg"
import Drawer5 from "src/assets/icons/drawer_5.svg"
import Drawer6 from "src/assets/icons/drawer_6.svg"
import Drawer7 from "src/assets/icons/drawer_7.svg"
import Drawer8 from "src/assets/icons/drawer_8.svg"

export const AuthorizedNavigations = () => {
    const userData = useSelector((store) => store.user_data.user_data)
    const isPaymentWorking = useSelector((store) => store.user_data.user_data)?.isPaymentWorking === '1';

    return (
        <Drawer.Navigator
            initialRouteName="SearchFirmsScreen"
            screenOptions={{
                headerTitleStyle: styles.headerTitle,
                drawerItemStyle: styles.drawerItem,
                drawerActiveBackgroundColor: COLORS.white,
                drawerLabelStyle: styles.drawerItemTitle,
                drawerStyle: styles.container,
            }}>
            {userData?.role_id !== '1' && (
                    <Drawer.Screen name="Поиск груза" component={SearchGoodsNavigation} options={{
                        drawerIcon: () => <Drawer1 />,
                        drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, focused && styles.drawerItemTitleActive]}>Поиск груза</Text>
                    }} />
            )}
            {userData?.role_id !== '2' && (
                <Drawer.Screen name="Поиск машины" component={SearchCarNavigation} options={{
                    drawerIcon: () => <Drawer3 />,
                    drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, focused && styles.drawerItemTitleActive]}>Поиск машины</Text>
                }} />
            )}
            <Drawer.Screen name="Поиск фирмы" component={SearchFirmNavigation} options={{
                drawerIcon: () => <Drawer2 />,
                drawerItemStyle: styles.drawerItemWithLine,
                drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, focused && styles.drawerItemTitleActive]}>Поиск фирмы</Text>
            }} />
            {userData?.role_id !== '2' && (
                <Drawer.Screen name="Мои грузы" component={MyGoodsNavigation} options={{
                    drawerIcon: () => <Drawer4 />,
                    drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, focused && styles.drawerItemTitleActive]}>Мои грузы</Text>
                }} />
            )}
            {userData?.role_id !== '1' && (
                    <Drawer.Screen name="Мои машины" component={MyCarsNavigation} options={{
                        drawerIcon: () => <Drawer5 />,
                        drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, focused && styles.drawerItemTitleActive]}>Мои машины</Text>
                    }} />
            )}
            <Drawer.Screen name="Избранное" component={FavoritesNavigation} options={{
                drawerIcon: () => <Drawer6 />,
                drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, focused && styles.drawerItemTitleActive]}>Избранное</Text>
            }} />
            <Drawer.Screen name="Личный кабинет" component={ProfileNavigation} options={{
                drawerIcon: () => <Drawer7 />,
                drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, focused && styles.drawerItemTitleActive]}>Личный кабинет</Text>
            }} />

            {isPaymentWorking && (
                <Drawer.Screen name="Подписка" component={SubscribeScreen} options={{
                    headerTitleStyle: styles.headerTitleGreen,
                    drawerIcon: () => <Drawer8 />,
                    drawerLabel: ({focused}) => <Text style={[styles.drawerItemTitle, styles.drawerItemTitleGreen, focused && styles.drawerItemTitleActive]}>Подписка</Text>
                }} />
            )}


        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        color: COLORS.text1,
        fontFamily: FONTS.medium
    },
    headerTitleGreen: {
        color: COLORS.green,
        fontFamily: FONTS.medium
    },
    drawerItem: {
        marginLeft: 18,
        paddingLeft: 0,
    },
    drawerItemWithLine: {
        marginLeft: 18,
        paddingLeft: 0,
        paddingBottom: 18,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder
    },
    drawerItemTitle: {
        color: COLORS.text1,
        fontFamily: FONTS.regular,
        fontSize: 17,
        marginLeft: -20
    },
    drawerItemTitleGreen: {
        color: COLORS.green,
    },
    drawerItemTitleActive: {
        fontFamily: FONTS.bold,
    },
    line: {
        marginVertical: 20,
        width: '100%',
        height: 1,
        backgroundColor: COLORS.gray
    },
    container: {
        paddingTop: 30
    }
})
