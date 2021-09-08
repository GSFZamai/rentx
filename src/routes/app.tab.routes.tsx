import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { AppStackRoutes } from './app.stack.routes'
import { Profile } from '../screens/Profile';
import { MyCars } from '../screens/MyCars';

import CarSvg from '../assets/car.svg';
import HomeSvg from '../assets/home.svg';
import PeopleSvg from '../assets/people.svg';
import { Platform } from 'react-native';


const { Screen, Navigator } = createBottomTabNavigator();

export function AppTabRoutes() {
    const theme = useTheme();
    return (
        <Navigator tabBarOptions={{
            activeTintColor: theme.colors.main,
            inactiveTintColor: theme.colors.text_detail,
            showLabel: false,
            style:{
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height: 78,
                backgroundColor: theme.colors.background_primary
            }
        }} >
            <Screen 
                name="Home"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({color}) => <HomeSvg fill={color} width={24} height={24}/>
                }}
            />

            <Screen 
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: ({color}) => <CarSvg fill={color} width={24} height={24}/>
                }}
            />
            
            <Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color}) => <PeopleSvg fill={color} width={24} height={24}/>
                }}
            />


        </Navigator>
    )
}