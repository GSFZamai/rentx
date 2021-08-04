import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

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
    Footer,
    RentDetails,
    RentDateDetails,
    CalendarIconContainer,
    RentDateControl,
    RentDateText,
    RentDate,
    RentValueDetails,
    RentTax,
    RentTaxTitle,
    RentTaxValue,
    RentTaxTotal,
} from './styles'
import { Button } from '../../components/Button';

export function SchedulingDetails({navigation}) {
    const theme = useTheme();

    function handleButtonClick() {
        navigation.navigate('SchedulingConfirmation')
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

                <RentDetails>
                    <RentDateDetails>
                    <CalendarIconContainer>
                        <Feather 
                            name='calendar'
                            color={theme.colors.background_secondary}
                            size={24}
                        />
                    </CalendarIconContainer>
                        <RentDateControl>
                            <RentDateText>
                                DE
                            </RentDateText>
                            <RentDate>
                                18/09/2021
                            </RentDate>
                        </RentDateControl>
                        <Feather 
                            name='chevron-right' 
                            color={theme.colors.text_detail}
                            size={24}
                        />
                        <RentDateControl>
                            <RentDateText>
                                ATÉ
                            </RentDateText>
                            <RentDate>
                                20/09/2021
                            </RentDate>
                        </RentDateControl>
                    </RentDateDetails>

                    <RentValueDetails>
                        <RentTax>
                            <RentTaxTitle>TOTAL</RentTaxTitle>
                            <RentTaxValue>R$ 580 x3 diárias</RentTaxValue>
                        </RentTax>

                        <RentTaxTotal>R$ 2.900</RentTaxTotal>
                    </RentValueDetails>
                </RentDetails>

            </Content>

            <Footer>
                <Button 
                    title='Alugar agora'  
                    color={theme.colors.success}
                    onPress={handleButtonClick}
                />
            </Footer>
        </Container>
    )
}