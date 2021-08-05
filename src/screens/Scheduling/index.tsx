import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';

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
import { generateInterval } from '../../components/Calendar/generateInterval';

export function Scheduling({ navigation }) {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const theme = useTheme();

    function handleButtonClick() {
        navigation.navigate('SchedulingDetails')
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
    }

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
                        <DateSelectInput selected={true}>
                            03/08/2021
                        </DateSelectInput>
                    </DateSelectController>

                    <ForwardArrowSVG />

                    <DateSelectController>
                        <DateSelectText>
                            ATÉ
                        </DateSelectText>
                        <DateSelectInput selected={false}>
                        </DateSelectInput>
                    </DateSelectController>


                </DateSelectContainer>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={(date: DayProps) => handleChangeDate(date)}
                />
            </Content>

            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleButtonClick}
                />
            </Footer>

        </Container>
    )
}