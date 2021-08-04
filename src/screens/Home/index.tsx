import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';

import {
    Container,
    Header,
    HeaderContent,
    Title,
    CarList
} from './styles';

export function Home({navigation}) {
    const car = {
        brand: 'Audi',
        model: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            value: 120,
        },
        thumbnail: 'https://platform.cstatic-images.com/large/in/v2/stock_photos/ff5a98a2-fd1e-4585-84a9-d91a5947d7d0/61f4cdfb-46ba-4ae9-8c08-3414e91094af.png',
    }

    function handleCardClick() {
        navigation.navigate('CarDetails');
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        heigth={RFValue(12)}
                    />
                    <Title>Total de 12 carros</Title>
                </HeaderContent>
            </Header>
            <CarList
                data={[1, 2, 3, 4, 5, 6, 7]}
                keyExtractor={item => String(item)}
                renderItem={item =>
                    <CarCard carDetails={car} onPress={handleCardClick}/>
                }
                
            />
        </Container>
    )
}