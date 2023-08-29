import React from "react";
import YourGoodsScreen from "../../screens/AuthorizedScreens/HomeScreens/your-goods-screen";
import {createStackNavigator} from "@react-navigation/stack";
import CargoSearchScreen from "../../screens/AuthorizedScreens/HomeScreens/cargo-search-screen";
import SearchCarsScreen from "src/screens/AuthorizedScreens/HomeScreens/search-cars-screen";
import SingleCarScreen from "../../screens/AuthorizedScreens/HomeScreens/single-car-screen";

const Stack = createStackNavigator();

export const SearchCarNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="YourCarsScreen" component={SearchCarsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SingleCarScreen" component={SingleCarScreen} />
        </Stack.Navigator>
    );
};
