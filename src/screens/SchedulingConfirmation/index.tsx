import React from 'react';
import { StatusBar } from 'react-native';

import LogoSVG from '../../assets/logo_background_gray.svg'
import DoneSVG from '../../assets/done.svg'

import {
    Container,
    Header,
    Content,
    DoneContainer,
    Title,
    Message,
    Footer
} from './styles';
import { ConfirmationButton } from '../../components/ConfimationButton';

export function SchedulingConfirmation() {
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor='transparent'
                translucent
            />

            <Header>
                <LogoSVG />
            </Header>

            <Content>
                <DoneContainer>
                    <DoneSVG 
                        width={80}
                        height={80}    
                    />
                </DoneContainer>
                <Title>Carro alugado!</Title>
                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel
                </Message>
            </Content>

            <Footer>
                <ConfirmationButton title="Ok"/>
            </Footer>

        </Container>
    )
}