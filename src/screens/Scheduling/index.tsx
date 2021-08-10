import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { CarDTO } from '../../dtos/CarDTO';
import { NavigationProps } from '../../dtos/navigation';
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
import { useEffect } from 'react';
import { api } from '../../services/api';
import { LoadingAnimation } from '../../components/LoadingAnimation';

interface CarProps {
    car: CarDTO;
}

interface PeriodDatesProps {
    start: string;
    end: string;
}

export function Scheduling() {
    const [loadingDates, setloadingDates] = useState(true);
    const navigation = useNavigation<NavigationProps>()
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [unavaibleDates, setUnavaibleDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [periodDates, setPeriodDates] = useState<PeriodDatesProps>({} as PeriodDatesProps);
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as CarProps;

    function handleButtonClick() {

        if(!periodDates.end || !periodDates.start) {
            Alert.alert('Escolha um período para avançar');
        }else {
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

            try {
                const response = await api.get(`/schedules_bycars/${car.id}`);
                const unavaibleMarkedDates = {} as MarkedDateProps;
                const data = response.data.unavailable_dates;
    
                if (data.length > 0) {
                    data.forEach((date: string) => {
                        unavaibleMarkedDates[date] = {
                            marked: true,
                            dotColor: 'red',
                            disableTouchEvent: true,
                            textColor: theme.colors.main
                        };    
                    });
        
                    setUnavaibleDates(unavaibleMarkedDates);
                }
            }catch (error){
                console.log(error);
            }finally {
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
                <LoadingAnimation />
                :
                <>
                    <Content>
                        <Calendar
                            markedDates={{...unavaibleDates, ...markedDates}}
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