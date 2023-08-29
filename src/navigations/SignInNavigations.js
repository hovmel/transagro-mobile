import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "../screens/SignInScreens/WelcomeScreen/WelcomeScreen";
import AddAccountTypeScreen from "src/screens/SignInScreens/AddAccountType/AddAccountTypeScreen";
import SignInScreen from "src/screens/SignInScreens/SignInScreen/SignInScreen";
import CreateAccountScreen from "src/screens/SignInScreens/CreateAccountScreen/CreateAccountScreen";
import ForgotPasswordScreen from "src/screens/SignInScreens/ForgotPasswordScreen/ForgotPasswordScreen";
const Stack = createStackNavigator();

export default function SignInNavigations() {

    function CreateAccount({ route }) {
        return (
            <CreateAccountScreen role_id={route?.params?.role_id}/>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={'WelcomeScreen'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="AddAccountTypeScreen" component={AddAccountTypeScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="CreateAccountScreen" component={CreateAccount}/>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        </Stack.Navigator>
    );
}
