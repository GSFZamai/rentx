import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Confirmation } from '../screens/Confirmation';
import { SplashScreen } from '../screens/SplashScreen';
import { SignIn } from '../screens/SignIn';
import { StepOne } from '../screens/NewAccount/StepOne';
import { StepTwo } from '../screens/NewAccount/StepTwo';

const { Screen, Navigator } = createStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}} initialRouteName='SplashScreen'>
            <Screen 
                name="SplashScreen"
                component={SplashScreen}
            />
            
            <Screen 
                name="SignIn"
                component={SignIn}
            />

            <Screen 
                name="StepOne"
                component={StepOne}
            />

            <Screen 
                name="StepTwo"
                component={StepTwo}
            />

            <Screen
                name="Confirmation"
                component={Confirmation}
            />

        </Navigator>
    )
}