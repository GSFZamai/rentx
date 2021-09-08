import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as CarModel } from '../../database/model/Car';

import {
    Container,
    Details,
    Brand,
    Model,
    About,
    Rent,
    Period,
    Value,
    Type,
    CarImage
} from './styles';

interface CarCardProps extends RectButtonProps{
    carDetails: CarModel;
}

export function CarCard({carDetails, ...rest}: CarCardProps) {
    const FuelType = getAccessoryIcon(carDetails.fuel_type);
    const netInfo = useNetInfo();

    return (
        <Container {...rest}>
            <Details>
                <Brand>{carDetails.brand}</Brand>
                <Model>{carDetails.name}</Model>
                <About>
                    <Rent>
                        <Period>{carDetails.period}</Period>
                        <Value>R$ {
                            netInfo.isConnected === true
                            ? carDetails.price
                            : '...'
                        }</Value>
                    </Rent>
                    <Type>
                        <FuelType />
                    </Type>
                </About>
            </Details>
  
                <CarImage 
                    source={
                        { 
                            uri: carDetails.thumbnail 
                        }
                    } 

                    resizeMode='contain'
                />
        </Container>
    )
}