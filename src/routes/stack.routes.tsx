import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingConfirmation } from '../screens/SchedulingConfirmation';
import { MyCars } from '../screens/MyCars';
import { SplashScreen } from '../screens/SplashScreen';

const { Screen, Navigator } = createStackNavigator();

export function StackRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen 
                name="SplashScreen"
                component={SplashScreen}
            />

            <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false
                }}
            />

            <Screen
                name="CarDetails"
                component={CarDetails}
            />

            <Screen
                name="Scheduling"
                component={Scheduling}
            />

            <Screen
                name="SchedulingDetails"
                component={SchedulingDetails}
            />

            <Screen
                name="SchedulingConfirmation"
                component={SchedulingConfirmation}
            />

            <Screen
                name="MyCars"
                component={MyCars}
            />

        </Navigator>
    )
}