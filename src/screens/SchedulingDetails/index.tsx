import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';


import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as CarModel } from '../../database/model/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { CarSlider } from '../../components/CarSlider';

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
import { getPlatformDates } from '../../utils/getPlatformDates';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface RouteProps {
    car: CarModel;
    dates: string[];
}

interface RentalPeriodProps {
    start: Date;
    end: Date;
}

export function SchedulingDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const [awaitingRequest, setAwaitingRequest] = useState(false)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
    const theme = useTheme();
    const route = useRoute();
    const { car, dates } = route.params as RouteProps;


    const rentTotal = Number(car.price * dates.length);

    async function handleButtonClick() {
        setAwaitingRequest(true);
        
        console.log(api.defaults.headers);

        api.post('/rentals', {
            user_id: 1,
            car_id: car.id,
            start_date: rentalPeriod.start,
            end_date: rentalPeriod.end,
            total: rentTotal
        }).then(() => 
            navigation.navigate('Confirmation', {
            title: 'Carro Alugado!',
            message: `Agora você só precisa ir\naté a concessionário da RENTX\npegar o seu automóvel.`,
            returnTo: 'Home'
        })).catch(() => {
                Alert.alert('Não foi possível realizar o agendamento!');
                setAwaitingRequest(false);
            })
    }

    function handleBackButtonClick() {
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: new Date(dates[0]),
            end: new Date(dates[dates.length - 1])
        });
    }, [])

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBackButtonClick}
                />
            </Header>
            <CarSliderContainer>
                <CarSlider
                    imagesUrl={
                        !!carUpdated.photos ?
                            carUpdated.photos :
                            [{ id: car.thumbnail, photo: car.thumbnail }]
                    }
                />
            </CarSliderContainer>

            <Content>
                <Description>
                    <Details>
                        <Brand>{car.brand}</Brand>
                        <Model>{car.name}</Model>
                    </Details>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Value>R$ {car.price}</Value>
                    </Rent>

                </Description>
                {
                    carUpdated.accessories &&
                    <Accessories>
                        {carUpdated.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))}
                    </Accessories>
                }

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
                                {format(getPlatformDates(new Date(dates[0])), 'dd/MM/yyyy')}
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
                                {format(getPlatformDates(new Date(dates[dates.length -1])), 'dd/MM/yyyy')}
                            </RentDate>
                        </RentDateControl>
                    </RentDateDetails>

                    <RentValueDetails>
                        <RentTax>
                            <RentTaxTitle>TOTAL</RentTaxTitle>
                            <RentTaxValue>{`R$ ${car.price} x${dates.length} diárias`}</RentTaxValue>
                        </RentTax>

                        <RentTaxTotal>{`R$ ${rentTotal}`}</RentTaxTotal>
                    </RentValueDetails>
                </RentDetails>

            </Content>

            <Footer>
                <Button
                    loading={awaitingRequest}
                    enabled={!awaitingRequest}
                    title='Alugar agora'
                    color={theme.colors.success}
                    onPress={handleButtonClick}
                />
            </Footer>
        </Container>
    )
}