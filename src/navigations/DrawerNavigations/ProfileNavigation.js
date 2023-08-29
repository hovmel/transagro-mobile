import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ProfileScreen from "../../screens/AuthorizedScreens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "src/screens/AuthorizedScreens/ProfileScreen/EditProfileScreen";
const Stack = createStackNavigator();

export const ProfileNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen options={{ headerShown: false }} name="EditProfileScreen" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};
