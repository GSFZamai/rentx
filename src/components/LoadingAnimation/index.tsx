import React from 'react';
import LootieView from 'lottie-react-native';

import loadingCar from '../../assets/carAnimation.json';
import loadingCalendar from '../../assets/calendarAnimation.json';
import loadingCar2 from '../../assets/carAnimation2.json';


import {
    Container
} from './styles'

interface AnimationProps {
    animation: 'loadingCar' | 'loadingCalendar' | 'loadingCar2';
}

export function LoadingAnimation({animation}: AnimationProps) {
    const sourceAux = {
        loadingCar,
        loadingCalendar,
        loadingCar2
    }

    return(
        <Container>
            <LootieView 
                source={sourceAux[animation]}
                autoPlay
                style={{
                    height: 200
                }}
                resizeMode='contain'
            />
        </Container>
    )
}