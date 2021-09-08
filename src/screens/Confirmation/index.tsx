import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmationButton } from '../../components/ConfimationButton';
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

interface ParamsProps {
    title: string;
    message: string;
    returnTo: string;
}

export function Confirmation() {
    const navigation = useNavigation()
    const route = useRoute();
    const { title, message, returnTo } = route.params as ParamsProps;
    function handleButtonClick() {
        navigation.navigate(returnTo);
    }

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
                <Title>{title}</Title>
                <Message>
                    {message}
                </Message>
            </Content>

            <Footer>
                <ConfirmationButton 
                    title="Ok"
                    onPress={handleButtonClick}
                />
            </Footer>

        </Container>
    )
}