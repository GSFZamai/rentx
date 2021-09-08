import React, { useEffect, useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, eachDayOfInterval } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as CarModel } from '../../database/model/Car';
import { getPlatformDates } from '../../utils/getPlatformDates';

import ForwardArrowSVG from '../../assets/arrow.svg'

import {
    Container,
    Header,
    Title,
    DateSelectContainer,
    DateSelectController,
    DateSelectText,
    DateSelectInput,
    Content,
    Footer,
} from './styles';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { api } from '../../services/api';

interface CarProps {
    car: CarModel;
}

interface PeriodDatesProps {
    start: string;
    end: string;
}

export function Scheduling() {
    const [loadingDates, setloadingDates] = useState(false);
    const navigation = useNavigation()
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [unavaibleDates, setUnavaibleDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [periodDates, setPeriodDates] = useState<PeriodDatesProps>({} as PeriodDatesProps);
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as CarProps;

    function handleButtonClick() {

        if (!periodDates.end || !periodDates.start) {
            Alert.alert('Escolha um período para avançar');
        } else {
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            })
        }


    }

    function handleBackButtonClick() {
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;
        console.log(lastSelectedDate);
        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);
        const firstDate = Object.keys(interval)[0];
        const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setPeriodDates({
            start: format(getPlatformDates(new Date(firstDate)), 'dd/MM/yyyy'),
            end: format(getPlatformDates(new Date(lastDate)), 'dd/MM/yyyy')
        });
    }

    useEffect(() => {
        async function getScheduleBycar() {
            let reservedInterval: MarkedDateProps = {}
            try {
                interface CarDates {
                    id: string;
                    car_id: string;
                    start_date: string;
                    end_date: string;
                }
                const response = await api.get(`/rentals/`);
                const rentalInfo: CarDates[] = response.data;

                const currentCarRentals: CarDates[] = rentalInfo.filter(rental => {
                    return rental.car_id === car.id;
                });

                currentCarRentals.forEach(rental => {
                    const interval = eachDayOfInterval({ start: new Date(rental.start_date).getTime(), end: new Date(rental.end_date).getTime() })

                    interval.forEach(rentalDate => {
                        const date = format(getPlatformDates(rentalDate), 'yyyy-MM-dd');
                        reservedInterval = {
                            ...reservedInterval,
                            [date]: {
                                marked: true,
                                dotColor: theme.colors.main,
                                color: theme.colors.shape,
                                textColor: theme.colors.main,
                                startingDay: format(getPlatformDates(interval[0]), 'yyyy-MM-dd') === date,
                                endingDay: format(getPlatformDates(interval[interval.length - 1]), 'yyyy-MM-dd') === date,
                                disableTouchEvent: true
                            }
                        }
                    })

                    setUnavaibleDates(reservedInterval);
                })

            } catch (error) {
                console.log(error);
            } finally {
                setloadingDates(false);
            }
        }

        getScheduleBycar();
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor='transparent'
            />
            <Header>
                <BackButton
                    color={theme.colors.shape}
                    onPress={handleBackButtonClick}
                />
                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <DateSelectContainer>
                    <DateSelectController>
                        <DateSelectText>
                            DE
                        </DateSelectText>
                        <DateSelectInput selected={!!periodDates.start}>
                            {periodDates.start}
                        </DateSelectInput>
                    </DateSelectController>

                    <ForwardArrowSVG />

                    <DateSelectController>
                        <DateSelectText>
                            ATÉ
                        </DateSelectText>
                        <DateSelectInput selected={!!periodDates.end}>
                            {periodDates.end}
                        </DateSelectInput>
                    </DateSelectController>


                </DateSelectContainer>
            </Header>

            {
                loadingDates ?
                    <LoadingAnimation animation='loadingCalendar' />
                    :
                    <>
                        <Content>
                            <Calendar
                                markedDates={{ ...unavaibleDates, ...markedDates }}
                                onDayPress={(date: DayProps) => handleChangeDate(date)}
                            />
                        </Content>

                        <Footer>
                            <Button
                                enabled={!!periodDates.end}
                                title="Confirmar"
                                onPress={handleButtonClick}
                            />
                        </Footer>
                    </>

            }

        </Container>
    )
}