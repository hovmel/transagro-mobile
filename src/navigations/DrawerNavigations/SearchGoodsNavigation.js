import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import cargoSearchScreen from "src/screens/AuthorizedScreens/HomeScreens/cargo-search-screen";
import SingleGoodScreen from "../../screens/AuthorizedScreens/HomeScreens/single-good-screen";

const Stack = createStackNavigator();

export const SearchGoodsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="cargoSearchScreen" component={cargoSearchScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SingleGoodScreen" component={SingleGoodScreen} />
        </Stack.Navigator>
    );
};
