import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';


import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
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
import { NavigationProps } from '../../dtos/navigation';

type UnavaibledateProps = string[];

interface RouteProps {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriodProps {
    start: string;
    end: string;
}

export function SchedulingDetails() {
    const navigation = useNavigation<NavigationProps>();
    const [awaitingRequest, setAwaitingRequest] = useState(false)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
    const theme = useTheme();
    const route = useRoute();
    const { car, dates } = route.params as RouteProps;

    const rentTotal = Number(car.rent.price * dates.length);

    async function handleButtonClick() {
        setAwaitingRequest(true);
        const response = await api.get(`/schedules_bycars/${car.id}`);
        let unavaibleDates = [] as UnavaibledateProps;

        dates.forEach(date => {
            if (response.data.unavailable_dates.includes(date)) {
                unavaibleDates.push(
                    format(getPlatformDates(new Date(date)), 'dd/MM/yyyy')
                );
            }
        })

        if (unavaibleDates.length > 0) {
            Alert.alert('Datas indisponíveis:', `${unavaibleDates}`);
            setAwaitingRequest(false)
        }else {
            const oldUnavailableDates = response.data.unavailable_dates;
            const newUnavaibleDates = [
                ...oldUnavailableDates,
                ...dates
            ];

            api.put(`/schedules_bycars/${car.id}`, {
                unavailable_dates: newUnavaibleDates
            })
            .then()
            .catch(() =>{
                Alert.alert('Não foi possível realizar o agendamento!');
                setAwaitingRequest(false);
            })
            
            api.post(`/schedules_byuser`, {
                user_id: '2',
                car,
                startDate: rentalPeriod.start,
                endDate: rentalPeriod.end
            })
            .then(() => navigation.navigate('SchedulingConfirmation'))
            .catch(() => {
                Alert.alert('Não foi possível realizar o agendamento!');
                setAwaitingRequest(false);
            })

        };

        console.log(unavaibleDates);        
    }

    function handleBackButtonClick() {
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDates(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDates(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, [])

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleBackButtonClick}
                />
            </Header>
            <CarSliderContainer>
                <CarSlider
                    imagesUrl={car.photos}
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

                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }



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
                                {rentalPeriod.start}
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
                                {rentalPeriod.end}
                            </RentDate>
                        </RentDateControl>
                    </RentDateDetails>

                    <RentValueDetails>
                        <RentTax>
                            <RentTaxTitle>TOTAL</RentTaxTitle>
                            <RentTaxValue>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentTaxValue>
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