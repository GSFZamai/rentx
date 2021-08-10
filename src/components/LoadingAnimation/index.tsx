import React from 'react';
import LootieView from 'lottie-react-native';

import loadingCar from '../../assets/carAnimation2.json';


import {
    Container
} from './styles'

export function LoadingAnimation() {
    return(
        <Container>
            <LootieView 
                source={loadingCar}
                autoPlay
                style={{
                    height: 200
                }}
                resizeMode='contain'
            />
        </Container>
    )
}