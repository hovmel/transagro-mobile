import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import subscribeScreen from "src/screens/AuthorizedScreens/HomeScreens/subscribe-screen";
const Stack = createStackNavigator();

export const SubscribeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen  options={{ headerShown: false }} name="subscribeScreen" component={subscribeScreen} />
        </Stack.Navigator>
    );
};
