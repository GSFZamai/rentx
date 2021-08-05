import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

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
import GasLogo from '../../assets/gasoline.svg';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface CarDetailsProps {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
    fuel_type: string;
}

interface CarCardProps extends RectButtonProps{
    carDetails: CarDetailsProps;
}

export function CarCard({carDetails, ...rest}: CarCardProps) {
    const FuelType = getAccessoryIcon(carDetails.fuel_type);

    return (
        <Container {...rest}>
            <Details>
                <Brand>{carDetails.brand}</Brand>
                <Model>{carDetails.name}</Model>
                <About>
                    <Rent>
                        <Period>{carDetails.rent.period}</Period>
                        <Value>R$ {carDetails.rent.price}</Value>
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