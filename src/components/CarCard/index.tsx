import React from 'react';

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

interface CarDetailsProps {
    brand: string;
    model: string;
    rent: {
        period: string;
        value: number;
    },
    thumbnail: string;
}

interface CarCardProps {
    carDetails: CarDetailsProps;
}

export function CarCard({carDetails}: CarCardProps) {
    return (
        <Container>
            <Details>
                <Brand>{carDetails.brand}</Brand>
                <Model>{carDetails.model}</Model>
                <About>
                    <Rent>
                        <Period>{carDetails.rent.period}</Period>
                        <Value>R$ {carDetails.rent.value}</Value>
                    </Rent>
                    <Type>
                        <GasLogo />
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