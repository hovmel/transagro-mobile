import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import FavoritesScreen from "../../screens/AuthorizedScreens/FavoritesScreen/FavoritesScreen";
import FavoriteSingleGoodScreen from "../../screens/AuthorizedScreens/FavoritesScreen/favorite-single-good-screen";
import FavoriteSingleCarScreen from "../../screens/AuthorizedScreens/FavoritesScreen/favorite-single-car-screen";
import FavoriteSingleFirmScreen from "../../screens/AuthorizedScreens/FavoritesScreen/favorite-single-firm-screen";

const Stack = createStackNavigator();

export const FavoritesNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="FavoritesScreen" component={FavoritesScreen} />
            <Stack.Screen options={{ headerShown: false }} name="FavoriteSingleGoodScreen" component={FavoriteSingleGoodScreen} />
            <Stack.Screen options={{ headerShown: false }} name="FavoriteSingleCarScreen" component={FavoriteSingleCarScreen} />
            <Stack.Screen options={{ headerShown: false }} name="FavoriteSingleFirmScreen" component={FavoriteSingleFirmScreen} />
        </Stack.Navigator>
    );
};
