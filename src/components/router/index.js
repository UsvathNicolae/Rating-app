import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ROUTES} from "../../constants";
import Login from "../../pages/loginPage";
import Register from "../../pages/registerPage";
import Home from "../../pages/homePage";

const Stack = createNativeStackNavigator();

const Router = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={Login} name={ROUTES.LOGIN}/>
                <Stack.Screen component={Register} name={ROUTES.REGISTER}/>
                <Stack.Screen component={Home} name={ROUTES.HOME}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router