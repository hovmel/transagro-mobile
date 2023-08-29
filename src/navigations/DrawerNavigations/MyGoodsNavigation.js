import React from "react";
import YourGoodsScreen from "../../screens/AuthorizedScreens/HomeScreens/your-goods-screen";
import {createStackNavigator} from "@react-navigation/stack";
import YourGoodsListScreen from "../../screens/AuthorizedScreens/HomeScreens/your-goods-list-screen";
import YourSingleGoodScreen from "../../screens/AuthorizedScreens/HomeScreens/your-single-good-screen";

const Stack = createStackNavigator();

export const MyGoodsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="YourGoodsListScreen" component={YourGoodsListScreen} />
            <Stack.Screen options={{ headerShown: false }} name="YourGoodsScreen" component={YourGoodsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="YourSingleGoodScreen" component={YourSingleGoodScreen} />
        </Stack.Navigator>
    );
};
