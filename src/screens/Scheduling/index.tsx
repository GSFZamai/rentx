import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
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
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling() {
    const theme = useTheme();
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
                <Calendar />
            </Content>

            <Footer>
                <Button 
                    title="Confirmar"
                />
            </Footer>

        </Container>
    )
}