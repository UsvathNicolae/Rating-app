import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ROUTES} from "../../constants";
import Login from "../../pages/loginPage";
import Register from "../../pages/registerPage";
import Home from "../../pages/homePage";
import Profile from "../../pages/ProfilePage";
import AddRating from "../../pages/addRatingPage";

const Stack = createNativeStackNavigator();

const Router = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={Login} name={ROUTES.LOGIN}/>
                <Stack.Screen component={Register} name={ROUTES.REGISTER}/>
                <Stack.Screen component={Home} name={ROUTES.HOME}/>
                <Stack.Screen component={Profile} name={ROUTES.PROFILE}/>
                <Stack.Screen component={AddRating} name={ROUTES.ADD_RATING}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router