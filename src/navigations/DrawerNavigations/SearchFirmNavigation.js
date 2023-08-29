import React from "react";
import YourGoodsScreen from "../../screens/AuthorizedScreens/HomeScreens/your-goods-screen";
import {createStackNavigator} from "@react-navigation/stack";
import CargoSearchScreen from "../../screens/AuthorizedScreens/HomeScreens/cargo-search-screen";
import SearchCarsScreen from "src/screens/AuthorizedScreens/HomeScreens/search-cars-screen";
import SearchFirmsScreen from "../../screens/AuthorizedScreens/HomeScreens/search-firms-screen";
import FirmSingleScreen from "src/screens/AuthorizedScreens/HomeScreens/firm-single-screen";
const Stack = createStackNavigator();

export const SearchFirmNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="SearchFirmsScreen" component={SearchFirmsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="FirmSingleScreen" component={FirmSingleScreen} />
        </Stack.Navigator>
    );
};
