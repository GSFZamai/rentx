import React from 'react';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { CarSlider } from '../../components/CarSlider';

import speedSVG from '../../assets/speed.svg';
import accSVG from '../../assets/acceleration.svg';
import horsePowerSVG from '../../assets/force.svg';
import gasolineSVG from '../../assets/gasoline.svg';
import exchangeSVG from '../../assets/exchange.svg';
import peopleSVG from '../../assets/people.svg';

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
import { Button } from '../../components/Button';

export function CarDetails({navigation}) {

    function handleButtonClick() {
        navigation.navigate('Scheduling')
    }

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={() => { }}
                />
            </Header>
            <CarSliderContainer>
                <CarSlider
                    imagesUrl={['https://platform.cstatic-images.com/large/in/v2/stock_photos/ff5a98a2-fd1e-4585-84a9-d91a5947d7d0/61f4cdfb-46ba-4ae9-8c08-3414e91094af.png']}
                />
            </CarSliderContainer>

            <Content>
                <Description>
                    <Details>
                        <Brand>Lamborghini</Brand>
                        <Model>Huracan</Model>
                    </Details>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Value>R$ 580</Value>
                    </Rent>

                </Description>
                <Accessories>

                    <Accessory
                        name='380km/h'
                        icon={speedSVG}
                    />

                    <Accessory
                        name='3.2s'
                        icon={accSVG}
                    />

                    <Accessory
                        name='800 HP'
                        icon={horsePowerSVG}
                    />
                    <Accessory
                        name='Gasolina'
                        icon={gasolineSVG}
                    />
                    <Accessory
                        name='Auto'
                        icon={exchangeSVG}
                    />
                    <Accessory
                        name='2 pessoas'
                        icon={peopleSVG}
                    />

                </Accessories>

                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>

            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleButtonClick} />
            </Footer>
        </Container>
    )
}