import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
    Container,
    Title
} from './styles';

interface ConfimationButtonProps extends RectButtonProps{
    title: string;
}

export function ConfirmationButton({title, ...rest}: ConfimationButtonProps) {
    return(
        <Container {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}