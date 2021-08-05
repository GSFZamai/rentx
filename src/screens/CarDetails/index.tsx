import React from 'react';
import { useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { CarSlider } from '../../components/CarSlider';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Header,
    CarSliderContainer,
    Content,
    Description,
    Details,
    Brand,
    Model,
    Rent,
    Period,
    Value,
    Accessories,
    About,
    Footer
} from './styles'

interface CarProps {
    car: CarDTO
}

export function CarDetails({ navigation }) {
    const route = useRoute();
    const { car } = route.params as CarProps;

    function handleButtonClick() {
        navigation.navigate('Scheduling')
    }

    function handleBackButtonClick() {
        navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBackButtonClick}
                />
            </Header>
            <CarSliderContainer>
                <CarSlider
                    imagesUrl={[car.thumbnail]}
                />
            </CarSliderContainer>

            <Content>
                <Description>
                    <Details>
                        <Brand>{car.brand}</Brand>
                        <Model>{car.name}</Model>
                    </Details>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Value>R$ {car.rent.price}</Value>
                    </Rent>

                </Description>
                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <About>
                    {car.about}
                </About>
            </Content>

            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleButtonClick} />
            </Footer>
        </Container>
    )
}