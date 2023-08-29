import React from "react";
import YourGoodsScreen from "../../screens/AuthorizedScreens/HomeScreens/your-goods-screen";
import {createStackNavigator} from "@react-navigation/stack";
import CargoSearchScreen from "../../screens/AuthorizedScreens/HomeScreens/cargo-search-screen";
import SearchCarsScreen from "src/screens/AuthorizedScreens/HomeScreens/search-cars-screen";
import MyCarsScreen from "src/screens/AuthorizedScreens/HomeScreens/my-cars-screen";
import MySingleCarScreen from "../../screens/AuthorizedScreens/HomeScreens/my-single-car-screen";

const Stack = createStackNavigator();

export const MyCarsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="MyCarsScreen" component={MyCarsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="MySingleCarScreen" component={MySingleCarScreen} />
        </Stack.Navigator>
    );
};
